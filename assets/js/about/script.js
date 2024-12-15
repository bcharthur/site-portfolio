document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000, // Délai de 3 secondes entre chaque slide
            disableOnInteraction: false,
        },
        centeredSlides: true, // Centre les slides
        slidesPerView: 3, // Ajusté de 4 à 3 pour assurer le loop
        spaceBetween: 30, // Espace entre les slides
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // Points de rupture responsives
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1440: {
                slidesPerView: 4, // Pour écrans très larges
                spaceBetween: 40
            }
        }
    });

    // Optionnel : Pause l'autoplay lorsque la souris survole le carrousel
    var swiperContainer = document.querySelector('.swiper');
    swiperContainer.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
    });
    swiperContainer.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
    });
});