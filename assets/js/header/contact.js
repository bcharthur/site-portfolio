// console.log("js/header/contact.js = chargé")
document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour détecter si l'utilisateur est sur un appareil mobile
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Actions pour le Modal Téléphone
    const sendMessageButton = document.getElementById('sendMessageButton');
    const callButton = document.getElementById('callButton');

    sendMessageButton.addEventListener('click', function () {
        const phoneNumber = '+33618719872'; // Remplacez par votre numéro de téléphone
        if (isMobileDevice()) {
            window.location.href = `sms:${phoneNumber}`;
        } else {
            alert('Cette fonctionnalité est disponible uniquement sur mobile.');
        }
    });

    callButton.addEventListener('click', function () {
        const phoneNumber = '+33618719872'; // Remplacez par votre numéro de téléphone
        window.location.href = `tel:${phoneNumber}`;
    });

    // Actions pour le Modal Enveloppe
    const sendEmailButton = document.getElementById('sendEmailButton');

    sendEmailButton.addEventListener('click', function () {
        const emailAddress = 'art.bouchaud@gmail.com'; // Remplacez par votre adresse email
        window.location.href = `mailto:${emailAddress}`;
    });
});