<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber{
    public function updateJwtData(JWTCreatedEvent $event)
    {

        $user = $event->getUser();
        $data = $event->getData();

        $data['firsName']= $user->getFirstName();
        $data['LastName']= $user->getLastName();

        $event->setData($data);

    }
}