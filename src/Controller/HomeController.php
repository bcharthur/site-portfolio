<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(CsrfTokenManagerInterface $csrfTokenManager): Response
    {
        // Générer un jeton CSRF
        $csrfToken = $csrfTokenManager->getToken('contact_form')->getValue();

        return $this->render('home/index.html.twig', [
            'csrf_token' => $csrfToken,
            'controller_name' => 'HomeController',
        ]);
    }
}
