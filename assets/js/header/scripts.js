document.addEventListener('DOMContentLoaded', () => {
    const words = ["Full-Stack", "Passionné", "CTF Player"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 180; // Vitesse de saisie
    const deletingSpeed = 130; // Vitesse de suppression
    const pauseBetweenWords = 800; // Pause avant de commencer le mot suivant
    const dynamicTextElement = document.getElementById('dynamic-text');

    function typeWords() {
        const currentWord = words[wordIndex];

        if (!isDeleting && charIndex === 0) {
            dynamicTextElement.classList.add('with-background');
            // Toujours afficher un espace insécable au début
            dynamicTextElement.textContent = '\u00A0';
        }

        if (isDeleting) {
            // Supprimer les caractères tout en gardant les espaces
            dynamicTextElement.textContent = '\u00A0' + currentWord.substring(0, charIndex--) + '\u00A0';
            if (charIndex < 0) { // Arrêter la suppression lorsque seul l'espace reste
                dynamicTextElement.textContent = '\u00A0';
                dynamicTextElement.classList.remove('with-background');
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeWords, 500);
            } else {
                setTimeout(typeWords, deletingSpeed);
            }
        } else {
            // Ajouter les caractères tout en gardant les espaces
            dynamicTextElement.textContent = '\u00A0' + currentWord.substring(0, charIndex++) + '\u00A0';
            if (charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(typeWords, pauseBetweenWords);
            } else {
                setTimeout(typeWords, typingSpeed);
            }
        }
    }

    typeWords();
});