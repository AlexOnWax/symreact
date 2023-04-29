<?php

namespace App\Doctrine;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(Security $security,AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->auth = $checker;

    }
    private function addWhere(QueryBuilder $queryBuilder,string $ressourceClass)
    {
        $user = $this->security->getUser();
        // si demande des invoice ou customer alors agir sur la requete
        if(($ressourceClass === Customer::class || $ressourceClass === Invoice::class) && !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User) {
            $routeAlias = $queryBuilder->getRootAliases()[0];
            if ($ressourceClass === Customer::class) {
                $queryBuilder->andWhere()("$routeAlias.user = : user");
            } else if ($ressourceClass === Invoice::class) {
                $queryBuilder->join("$routeAlias.customer", " c")
                    ->andWhere("c.user=:user");
            }
            $queryBuilder->setParameter("user", $user);
//            dd($queryBuilder);
        }
    }
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder,$resourceClass);


    }
public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder,$resourceClass);
    }

}