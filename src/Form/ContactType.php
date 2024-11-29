<?php
// src/Form/ContactType.php
namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
// Importation des contraintes de validation
use Symfony\Component\Validator\Constraints as Assert;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // Champ Nom
            ->add('name', TextType::class, [
                'label' => 'Nom complet',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez entrer votre nom.',
                    ]),
                ],
            ])
            // Champ Email
            ->add('email', EmailType::class, [
                'label' => 'Adresse email',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez entrer votre adresse email.',
                    ]),
                    new Assert\Email([
                        'message' => 'Veuillez entrer une adresse email valide.',
                    ]),
                ],
            ])
            // Champ Téléphone
            ->add('phone', TelType::class, [
                'label' => 'Numéro de téléphone',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez entrer votre numéro de téléphone.',
                    ]),
                ],
            ])
            // Champ Message
            ->add('message', TextareaType::class, [
                'label' => 'Message',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez entrer votre message.',
                    ]),
                ],
            ]);
    }
}
