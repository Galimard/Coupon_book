class Card {
    constructor() {
        this.$cards = document.querySelectorAll('.js-card');
        this.$dotsWrap;
        this.height;

        this.setup();
    }

    setup = () => {
        this.$cards.forEach(card => {
            this.height = card.offsetHeight;
            this.$dotsWrap = card.querySelectorAll('.js-dots');
            this.fillDots(this.$dotsWrap);
        });
    }

    fillDots = (dotsWrap) => {
        const count = Math.ceil(this.height / 16);

        dotsWrap.forEach(wrap => {
            wrap.insertAdjacentHTML("afterbegin", '<div class="card-dots__dot-big"></div>');

            for (let i = 0; i < count; i++) {
                wrap.insertAdjacentHTML("beforeend", `<div class="card-dots__dot"></div>`); 
            }

            wrap.insertAdjacentHTML("beforeend", '<div class="card-dots__dot-big"></div>'); 
        });
    }
}