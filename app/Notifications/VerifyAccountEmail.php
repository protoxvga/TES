<?php
namespace App\Notifications;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;

class VerifyAccountEmail extends VerifyEmailBase
{
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable);
        }
        return (new MailMessage)
            ->subject('Vérification de l\'adresse e-mail')
            ->greeting('Bonjour !')
            ->line('Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail.')
            ->action(
                'Vérifier l\'adresse e-mail',
                $this->verificationUrl($notifiable)
            )
            ->line('Si vous n\'avez pas créé de compte, merci d\'ignorer cet e-mail.');
    }
}