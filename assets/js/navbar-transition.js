// Fonction debounce optimisée
function debounce(func, wait = 100, immediate = false) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

window.addEventListener('DOMContentLoaded', () => {
    // Fonction pour rétrécir la navbar au défilement
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Initialiser la navbar rétrécie
    navbarShrink();

    // Appliquer le défilement fluide avec debounce pour optimiser les performances
    window.addEventListener('scroll', debounce(navbarShrink, 100));

    // Fermer la navbar responsive lorsque un lien est cliqué
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');

    responsiveNavItems.forEach((navItem) => {
        navItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Animation de défilement fluide pour les liens de navigation (utilisation de scrollIntoView)
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link, .navbar-brand[href="#page-top"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === "#page-top" ? document.body : document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Si le lien cliqué est "AB" (navbar-brand), retirer la classe 'active' de tous les liens de navigation
            if (this.classList.contains('navbar-brand')) {
                responsiveNavItems.forEach(nav => {
                    nav.classList.remove('active');
                });
            }
        });
    });

    // Gestion des animations des modaux
    const modals = document.querySelectorAll('.portfolio-modal');
    modals.forEach((modal) => {
        const modalDialog = modal.querySelector('.modal-dialog');

        modal.addEventListener('show.bs.modal', () => {
            modalDialog.classList.remove('closing');
            modalDialog.style.animation = 'modalFadeIn 0.5s forwards';
        });

        modal.addEventListener('hide.bs.modal', () => {
            modalDialog.classList.add('closing');
            modalDialog.style.animation = 'modalFadeOut 0.5s forwards';
        });

        modal.addEventListener('hidden.bs.modal', () => {
            modalDialog.classList.remove('closing');
            modalDialog.style.animation = '';
        });
    });

    // Fonction pour gérer l'ajout de la classe 'active' aux liens de la navbar
    const handleActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 80; // Ajustement pour la hauteur de la navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Retirer 'active' de tous les liens
                responsiveNavItems.forEach(link => {
                    link.classList.remove('active');
                });

                // Ajouter 'active' au lien correspondant
                const activeLink = document.querySelector(`#navbarResponsive .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // Appeler la fonction au chargement de la page
    handleActiveLink();

    // Ajouter un écouteur pour l'événement scroll avec debounce
    window.addEventListener('scroll', debounce(handleActiveLink, 100));
});
