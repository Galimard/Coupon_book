const phones = document.querySelectorAll('.js-input-phone');

Inputmask({
    'mask': '+7 (999) 999-99-99', 
    'showMaskOnHover': false,
}).mask(phones);