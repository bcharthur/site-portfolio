window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        navbarCollapsible.classList.toggle('navbar-shrink', window.scrollY !== 0);
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
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.forEach(responsiveNavItem => {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Smooth scroll animation for nav links (with optimized duration)
    const navLinks = document.querySelectorAll('#navbarResponsive .nav-link, .navbar-brand[href="#page-top"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === "#page-top" ? document.body : document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal animation handling
    const modals = document.querySelectorAll('.portfolio-modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            modal.querySelector('.modal-dialog').style.animation = 'modalFadeIn 0.3s forwards';
        });

        modal.addEventListener('hide.bs.modal', () => {
            modal.querySelector('.modal-dialog').style.animation = 'modalFadeOut 0.3s forwards';
        });
    });
});
