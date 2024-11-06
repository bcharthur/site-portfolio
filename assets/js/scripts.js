window.addEventListener('DOMContentLoaded', event => {
    // Fonction pour rétrécir la navbar au défilement
    var navbarShrink = function () {
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

    // Rétrécir la navbar lors du défilement
    document.addEventListener('scroll', navbarShrink);

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

    // Animation de défilement fluide pour les liens de navigation
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link, .navbar-brand[href="#page-top"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === "#page-top" ? document.body : document.querySelector(targetId);
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 70; // Ajuster pour la hauteur de la navbar
                const distance = targetPosition - startPosition;
                const duration = 1000; // Durée de l'animation en ms
                let startTime = null;

                const ease = (t, b, c, d) => {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                };

                const animation = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                };

                requestAnimationFrame(animation);
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

    // Ajouter un écouteur pour l'événement scroll
    window.addEventListener('scroll', handleActiveLink);
});
