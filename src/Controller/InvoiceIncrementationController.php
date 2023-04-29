<?php

     namespace App\Controller;

     use App\Entity\Invoice;
     use Doctrine\ORM\EntityManagerInterface;
     use Symfony\Component\HttpKernel\Attribute\AsController;
     use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

     #[AsController]
     class InvoiceIncrementationController extends AbstractController
     {
         /**
          * @var EntityManager
          */
         private $entityManager;
         public function __construct(EntityManagerInterface $entityManager)
         {
             $this->entityManager = $entityManager;
         }

         public function __invoke(Invoice $data): Invoice
         {
             $data->setChrono($data->getChrono() + 1);
             $this->entityManager->flush();
             return $data;
         }
     }