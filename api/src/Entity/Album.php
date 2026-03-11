<?php

namespace App\Entity;

use App\Repository\AlbumRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Serializer\Attribute\SerializedName;

#[ORM\Entity(repositoryClass: AlbumRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['album:read']],
    denormalizationContext: ['groups' => ['album:write']]
)]

class Album
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['album:read','album:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $nomAlbum = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['album:read', 'album:write'])]
    private ?int $nombreDeTitres = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['album:read', 'album:write'])]
    private ?\DateTime $dateDeSortie = null;

    #[ORM\Column(length: 255)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $lienSpotify = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $lienDeezer = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $lienYoutubeMusic = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $lienAppleMusic = null;

    #[ORM\Column]
    #[Groups(['album:read', 'album:write'])]
    #[SerializedName('isSingle')]
    private ?bool $isSingle = null;

    #[ORM\ManyToOne(inversedBy: 'albums')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['album:read', 'album:write'])]
    private ?Compositeur $compositeur = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['album:read', 'album:write'])]
    private ?string $cover = '';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomAlbum(): ?string
    {
        return $this->nomAlbum;
    }

    public function setNomAlbum(string $nomAlbum): static
    {
        $this->nomAlbum = $nomAlbum;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getNombreDeTitres(): ?int
    {
        return $this->nombreDeTitres;
    }

    public function setNombreDeTitres(int $nombreDeTitres): static
    {
        $this->nombreDeTitres = $nombreDeTitres;

        return $this;
    }

    public function getDateDeSortie(): ?\DateTime
    {
        return $this->dateDeSortie;
    }

    public function setDateDeSortie(\DateTime $dateDeSortie): static
    {
        $this->dateDeSortie = $dateDeSortie;

        return $this;
    }

    public function getLienSpotify(): ?string
    {
        return $this->lienSpotify;
    }

    public function setLienSpotify(string $lienSpotify): static
    {
        $this->lienSpotify = $lienSpotify;

        return $this;
    }

    public function getLienDeezer(): ?string
    {
        return $this->lienDeezer;
    }

    public function setLienDeezer(?string $lienDeezer): static
    {
        $this->lienDeezer = $lienDeezer;

        return $this;
    }

    public function getLienYoutubeMusic(): ?string
    {
        return $this->lienYoutubeMusic;
    }

    public function setLienYoutubeMusic(?string $lienYoutubeMusic): static
    {
        $this->lienYoutubeMusic = $lienYoutubeMusic;

        return $this;
    }

    public function getLienAppleMusic(): ?string
    {
        return $this->lienAppleMusic;
    }

    public function setLienAppleMusic(?string $lienAppleMusic): static
    {
        $this->lienAppleMusic = $lienAppleMusic;

        return $this;
    }

    public function getIsSingle(): ?bool
    {
        return $this->isSingle;
    }

    public function setIsSingle(bool $isSingle): static
    {
        $this->isSingle = $isSingle;

        return $this;
    }

    public function getCompositeur(): ?Compositeur
    {
        return $this->compositeur;
    }

    public function setCompositeur(?Compositeur $compositeur): static
    {
        $this->compositeur = $compositeur;

        return $this;
    }

    public function getCover(): ?string { return $this->cover; }
    public function setCover(?string $cover): static { $this->cover = $cover; return $this; }

    #[Groups(['album:read'])]
    public function getLinkForIframe(): ?string {
        if (!$this->lienSpotify) {
            return null;
        }

        $link = '';
        // On extrait directement "album/ID" ou "track/ID"
        if (preg_match('/(album|track)\/[a-zA-Z0-9]+/', $this->lienSpotify, $matches)) {
            $typeEtId = $matches[0]; // ex: "album/1A2B3C4D5E"
            $link = "https://open.spotify.com/embed/{$typeEtId}?utm_source=generator&theme=0";
        }
        return $link;
    }

}
