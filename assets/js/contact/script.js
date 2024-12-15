document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');
    const submitButton = document.getElementById('submitButton');
    const csrfToken = document.getElementById('csrf_token').value;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Réinitialiser les messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        // Récupération des données du formulaire
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation rapide côté client
        if (!name || !email || !message) {
            errorMessage.innerText = 'Veuillez remplir tous les champs obligatoires.';
            errorMessage.classList.remove('d-none');
            return;
        }

        // Désactivation du bouton d'envoi
        submitButton.disabled = true;

        try {
            const response = await fetch('{{ path("contact_send") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message,
                    csrf_token: csrfToken
                }),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                // Afficher le message de succès
                successMessage.classList.remove('d-none');
                // Réinitialiser le formulaire
                form.reset();
            } else {
                // Afficher le message d'erreur
                errorMessage.innerText = result.message || 'Une erreur est survenue. Veuillez réessayer plus tard.';
                errorMessage.classList.remove('d-none');
            }
        } catch (error) {
            console.error(error);
            errorMessage.innerText = 'Erreur lors de la communication avec le serveur.';
            errorMessage.classList.remove('d-none');
        } finally {
            // Réactiver le bouton d'envoi
            submitButton.disabled = false;
        }
    });
});