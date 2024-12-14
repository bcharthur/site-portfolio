<?php
// src/Controller/ContactController.php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'contact_form')]
    public function contact(CsrfTokenManagerInterface $csrfTokenManager)
    {
        // Générer un jeton CSRF
        $csrfToken = $csrfTokenManager->getToken('contact_form')->getValue();

        return $this->render('contact.html.twig', [
            'csrf_token' => $csrfToken,
        ]);
    }

    #[Route('/contact/send', name: 'contact_send', methods: ['POST'])]
    public function send(
        Request $request,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        CsrfTokenManagerInterface $csrfTokenManager
    ): JsonResponse
    {
        // Décoder les données JSON reçues
        $data = json_decode($request->getContent(), true);

        // Récupérer le jeton CSRF
        $submittedToken = $data['csrf_token'] ?? '';

        // Valider le jeton CSRF
        if (!$csrfTokenManager->isTokenValid(new CsrfToken('contact_form', $submittedToken))) {
            return new JsonResponse([
                'status' => 'error',
                'message' => 'Jeton CSRF invalide.'
            ], 400);
        }

        // Récupérer les champs du formulaire
        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $phone = $data['phone'] ?? '';
        $message = $data['message'] ?? '';

        // Créer une nouvelle entité Contact
        $contact = new Contact();
        $contact->setName($name);
        $contact->setEmail($email);
        $contact->setPhone($phone);
        $contact->setMessage($message);
        // created_at est déjà initialisé dans le constructeur

        // Valider l'entité
        $errors = $validator->validate($contact);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            return new JsonResponse([
                'status' => 'error',
                'message' => implode(' ', $errorMessages)
            ], 400);
        }

        try {
            // Enregistrer l'entité en base de données
            $entityManager->persist($contact);
            $entityManager->flush();
        } catch (\Exception $e) {
            // Log l'erreur pour le débogage (optionnel)
            // $this->get('logger')->error($e->getMessage());

            return new JsonResponse([
                'status' => 'error',
                'message' => 'Échec de l\'enregistrement des données de contact.'
            ], 500);
        }

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Vos données de contact ont été enregistrées avec succès.'
        ]);
    }
}
