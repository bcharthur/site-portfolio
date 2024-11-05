window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
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

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Smooth scroll animation for nav links
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link, .navbar-brand[href="#page-top"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === "#page-top" ? document.body : document.querySelector(targetId);
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.offsetTop - 70; // Adjust for navbar height
                const distance = targetPosition - startPosition;
                const duration = 1000; // 1 second
                let startTime = null;

                function animation(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Modal animation handling
    const modals = document.querySelectorAll('.portfolio-modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            modal.querySelector('.modal-dialog').classList.remove('closing');
            modal.querySelector('.modal-dialog').style.animation = 'modalFadeIn 0.5s forwards';
        });

        modal.addEventListener('hide.bs.modal', () => {
            const modalDialog = modal.querySelector('.modal-dialog');
            modalDialog.classList.add('closing');
            modalDialog.style.animation = 'modalFadeOut 0.5s forwards';
        });

        modal.addEventListener('hidden.bs.modal', () => {
            const modalDialog = modal.querySelector('.modal-dialog');
            modalDialog.classList.remove('closing');
        });
    });
});
