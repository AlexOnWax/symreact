<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;


class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    public function __construct(Security $security, InvoiceRepository $invoiceRepository)
    {
        $this->security = $security;
        $this->repository = $invoiceRepository;
    }
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW =>  [ 'setChronoForInvoice',EventPriorities::PRE_VALIDATE]
        ];
    }
    public function setChronoForInvoice(ViewEvent $event):void
    {

        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($invoice instanceof Invoice &&  $method === 'POST')
        {
            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            $invoice->setChrono($nextChrono);


            if(empty($invoice->getSentAt()))
            {
                $invoice->setSentAt(new \DateTime());
            }
        }
        }



}