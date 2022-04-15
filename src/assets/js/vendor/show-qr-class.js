class ShowQr {
    constructor() {
        this.buttons = document.querySelectorAll('.js-show-qr'); 
        this.qr;

        this.setup();
    }

    setup = () => {
        this.buttons.forEach(btn => {
            this.qr = btn.nextElementSibling;
            btn.addEventListener('click', this.showQr.bind(null, this.qr, btn));        
        });
    }

    showQr = (qr, btn) => {
        if (qr.classList.contains('show')) {
            qr.classList.remove('show');
            btn.querySelector('span').innerText = 'Показать';
        } else {
            qr.classList.add('show');
            btn.querySelector('span').innerText = 'Скрыть';
        }
    }
}