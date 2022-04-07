$(document).ready(function() {
    $(".js-tabs-slider").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: false,
        variableWidth: true,
        nextArrow: '<button type="button" class="slick-next"><span class="pseudo"></span></button>',
        prevArrow: '<button type="button" class="slick-prev"><span class="pseudo"></span></button>',
        responsive: [{
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: false
            }      
        }]
    });
});