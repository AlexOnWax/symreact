<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;

use App\Controller\InvoiceIncrementationController;

use ApiPlatform\OpenApi\Model;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\InvoiceRepository;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(

    normalizationContext: ['groups' => ['invoices:read']],
    order: ['amount' => 'DESC'],

)]
#[ApiFilter(OrderFilter::class, properties: ['amout', 'sentAt'])]
#[ApiFilter(OrderFilter::class, properties: ['Customers.lastName'])]
#[ApiResource(
    uriTemplate: "/customers/{customerId}/invoices",
    operations: [
        new GetCollection()
    ],
    uriVariables: [
        'customerId' => new Link(
            fromProperty: 'invoices',
            fromClass: Customer::class
        )
    ],
    normalizationContext: ['groups' => ['invoices_subresource']]
)]
#[ApiResource(operations: [
    new Get(),
    new Post(
        uriTemplate: '/invoices/{id}/increment',
        controller: InvoiceIncrementationController::class,
        openapi: new Model\Operation(
            summary: 'Incrémente numéro facture',
            description: '![A great bear](https://picsum.photos/id/433/100/100)' . "\n"
            . '# Incrémente le chrono d\'une facture donnée de 1'
        ),

        name: 'increment'
    )
])]



#[ApiFilter(OrderFilter::class, properties: ['id'])]

class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['invoices_subresource','customers_read','invoices:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['invoices_subresource','customers_read','invoices:read'])]
    #[Assert\NotBlank(message: "le montant de la facture est requis")]
    #[Assert\Type(
        type: 'float'
    )]
    private ?float $amount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['invoices_subresource','customers_read','invoices:read'])]
    #[Assert\Type(type: "DateTimeInterface", message: "CustomMessage")]
    private ?\DateTimeInterface $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['customers_read','invoices:read'])]
    #[Assert\NotBlank(message: "le status de la facture est requis")]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invoices:read'])]
    private ?Customer $customer = null;

    #[ORM\Column]
    #[Groups(['customers_read','invoices:read'])]
    #[Assert\Type(
        type: 'integer'
    )]
    private ?int $chrono = null;


    /*Permet de récupèrer l'utilisateur a qui appartient la facture*/
    #[Groups(['invoices_subresource','customers_read'])]
    public function getUserPerCustomer(): User
    {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
