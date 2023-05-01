<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InvoicesController extends AbstractController
{
    #[Route('/invoices', name: 'app_invoices')]
    public function index(): Response
    {
        return $this->render('invoices/index.html.twig', [

        ]);
    }
    #[Route('/invoices/{id}', name: 'app_invoices')]
    public function create(): Response
    {
        return $this->render('invoices/index.html.twig', [

        ]);
    }
}
