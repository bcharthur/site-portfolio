<?php
// src/Controller/ContactController.php
namespace App\Controller;

use App\Form\ContactType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
// Importation de MailerInterface
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
// Importation pour gérer les exceptions
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    /**
     * @Route("/contact", name="app_contact")
     */
    public function index(Request $request, MailerInterface $mailer): Response
    {
        // Création du formulaire
        $form = $this->createForm(ContactType::class);

        // Traitement de la requête
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Récupération des données du formulaire
            $contactFormData = $form->getData();

            // Création de l'email
            $email = (new Email())
                ->from('notifportfolio@gmail.com')
                ->to('art.bouchaud@gmail.com')
                ->subject('Nouveau message de contact')
                ->text(
                    'Vous avez reçu un nouveau message de ' . $contactFormData['name'] . "\n" .
                    'Email : ' . $contactFormData['email'] . "\n" .
                    'Numéro de téléphone : ' . $contactFormData['phone'] . "\n\n" .
                    'Message : ' . $contactFormData['message']
                );

            try {
                // Envoi de l'email
                $mailer->send($email);

                // Ajout d'un message flash
                $this->addFlash('success', 'Votre message a été envoyé avec succès.');

                // Redirection pour éviter la resoumission du formulaire
                return $this->redirectToRoute('app_contact');
            } catch (TransportExceptionInterface $e) {
                // Gestion de l'erreur
                $this->addFlash('error', 'Une erreur est survenue lors de l\'envoi de votre message.');

                // Vous pouvez éventuellement enregistrer l'erreur dans les logs
            }
        }

        // Affichage du formulaire
        return $this->render('contact.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}