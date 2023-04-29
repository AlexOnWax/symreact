<?php
// api/src/EventSubscriber/BookMailSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class Test implements EventSubscriberInterface
{
    public function __construct( private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }
    public static function getSubscribedEvents(): array
    {
        return [
//          KernelEvents::VIEW =>  [ 'check',EventPriorities::POST_WRITE]
            KernelEvents::VIEW =>  [ 'check',EventPriorities::PRE_WRITE]
        ];
    }
    public function check(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($user instanceof User && $method === 'POST') {
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $user->getPassword()
            );
            $user->setPassword($hashedPassword);
            $user->eraseCredentials();
        }
    }
}