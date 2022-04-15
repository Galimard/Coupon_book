class Form {
    constructor(selector, handleSubmit) {
        this.$elements = document.querySelectorAll(selector);
        this.handleSubmit = handleSubmit;
        this.selectTime = {};
        this.selectGuest = {};
        
        this.setup();     
    }

    setup = () => {
        this.$elements.forEach(el => {
            const validator = new FormValidator({
                    alerts: true,
                    events: false,
                    regex: {
                        email: {
                            illegalChars: /[\(\)\<\>\,\;\:\\\/\"\[\]]/,
                            filter: /^.+@.+\..{2,6}$/ 
                        },
                        tel: /_/
                    },
                    texts: {
                        invalid: 'Неверно заполнено поле',
                        checked: 'Заполните поле',
                        empty: 'Заполните поля',
                        select: 'Выберите значение',
                        email: 'Неверно заполнено поле',
                        phone: 'Поле заполнено не до конца'
                    },
                    commonError: true
                }, el);
            const that = this;
            
            el.onsubmit = function(e) {  
                e.preventDefault();  
                const validatorResult = validator.checkAll(this);  
               
                // console.log($(this).serialize());
                
                if (validatorResult.valid) {
                    that.hideErrorMessage(el);

                    if (typeof that.handleSubmit == 'function') {
                        const handleSubmitResult = that.handleSubmit();
                        
                        if (handleSubmitResult.result) {
                            that.showNextStep(el);
                        } else {
                            that.showErrorMessage(el, handleSubmitResult.error);
                        }                        
                    }
                } else {
                    that.showErrorMessage(el, 'Заполните все поля');
                }
            
                return !!validatorResult.valid;
            };
           
        });        
    }

    showErrorMessage = (el, error) => {
        const $error = el.querySelector('.js-message');
        $error.innerHTML = error;
    }

    hideErrorMessage = (el) => {
        const $error = el.querySelector('.js-message');
        $error.innerHTML = '';
    }

    showNextStep = (el) => {
        const $nextStep = el.nextElementSibling;

        el.classList.add('hide');

        if ($nextStep && $nextStep.classList.contains('reg-form')) $nextStep.classList.add('active');
    }
}