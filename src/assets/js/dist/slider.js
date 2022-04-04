$(document).ready(function() {
    $(".js-tabs-slider").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: false,
        variableWidth: true,
        responsive: [{
            breakpoint: 768,
            settings: {
              arrows: false,
              dots: false
            }      
        }]
    });
});