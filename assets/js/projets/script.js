$(document).ready(function(){
    $('.challenge-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '80px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '20px'
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px'
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '10px'
                }
            }
        ]
    });
});