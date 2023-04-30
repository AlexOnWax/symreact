<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{
    #[Route('/customers', name: 'app_customers')]
    public function index(): Response
    {
        return $this->render('customer/index.html.twig', [

        ]);
    }
    #[Route('/customers/{id}', name: 'app_customer')]
    public function create(): Response
    {
        return $this->render('customer/index.html.twig', [

        ]);
    }
}
