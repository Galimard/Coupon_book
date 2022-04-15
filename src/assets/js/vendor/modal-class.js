class Modal {
    constructor(options, handleAjax) {
        this.$modalBtns = document.querySelectorAll(options.modalBtns);
        this.$modalCloseBtns = document.querySelectorAll(options.modalCloseBtns);
        this.$modals = document.querySelectorAll(options.modals);
        this.$body = document.querySelector('body');
        this.options = options;
        this.handleAjax = handleAjax;

        this.$textModal = document.querySelector('.js-text');
        this.$titleModal = document.querySelector('.js-title');

        this.setup();
    }

    setup = () => {
        if (this.handleAjax) {
            this.$modalBtns.forEach(button => {
                button.addEventListener('click', this.openModalAjax);
            });
        } else {
            this.$modalBtns.forEach(button => {
                button.addEventListener('click', this.openModal);
            });
        }

        this.$modalCloseBtns.forEach(button => {
            button.addEventListener('click', this.closeBtnHandler);
        });

        this.$modals.forEach(modal => {
            modal.addEventListener('click', this.closeBtnHandler);
        });
    }

    closeBtnHandler = (event) => {
        if (event.target.classList.contains('js-modal-close')) {
            const currentModal = event.currentTarget.closest('.js-modal');
            this.closeModal(currentModal);
        } else {
            const currentModal = event.target;

            if (currentModal.classList.contains('js-modal')) {
                this.closeModal(currentModal);
            }
        }
    }

    openModal = (event) => {
        event.preventDefault();
        
        const $this = event.currentTarget;
        const modalId = $this.getAttribute(this.options.modalBtns.substr(1, this.options.modalBtns.length - 2));
        const modal = document.getElementById(modalId);

        modal.classList.add('open');
        this.$body.classList.add('no-scroll');
        this.defaultInitSelects();
    }

    closeModal = (currentModal) => {
        currentModal.classList.remove('open');
        this.$body.classList.remove('no-scroll');       
    }

    openModalAjax = (event) => {
        const modal = document.querySelector('.js-modal.open');
        const $this = event.currentTarget;
        const modalId = $this.getAttribute(this.options.modalBtns.substr(1, this.options.modalBtns.length - 2));
        const currentModal = document.getElementById(modalId);

        if (modal) {
            modal.classList.remove('open');
            this.$body.classList.remove('no-scroll');
        }

        currentModal.classList.add('open');
        this.$body.classList.add('no-scroll');

        const handleSubmitResult = this.handleAjax();
        this.fillCard(handleSubmitResult);
    }

    fillCard = (data) => {
        this.$titleModal.innerHTML = data.title;
        this.$textModal.innerHTML = data.fullText;
    }
}