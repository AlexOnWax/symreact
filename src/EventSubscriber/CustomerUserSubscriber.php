<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Customer;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CustomerUserSubscriber implements EventSubscriberInterface
{
    public function __construct(Security $security)
    {
        $this->security =$security;
    }
public static function getSubscribedEvents(): array
{
    return [
        KernelEvents::VIEW =>  [ 'setUserForCustomer',EventPriorities::PRE_VALIDATE]
    ];
}
public function setUserForCustomer(ViewEvent $event): void
{
    $customer = $event->getControllerResult();
    $method = $event->getRequest()->getMethod();

    if ($customer instanceof Customer &&  $method === 'POST') {
        //Je trouve l'user qui est connecté
        $user = $this->security->getUser();
        //Je l'assigne  au customer que l'on crée
        $customer->setUser($user);
    }
    }

}