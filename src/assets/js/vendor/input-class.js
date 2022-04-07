class Input {
    constructor(selector) {
        this.$elements = document.querySelectorAll(selector);

        this.checkChangedInputs();
        this.setup();
    }

    setup = () => {
        this.$elements.forEach(input => {  
            input.addEventListener('change', this.onChangeHandler);  
        });
    }

    checkChangedInputs = () => {
        this.$elements.forEach(input => {  
            if (input.tagName === 'TEXTAREA' && input.getAttribute('placeholder') != null) {
                input.classList.add('changed');
            } else {
                if (input.value === '') {
                    input.classList.remove('changed');    
                } else {
                    input.classList.add('changed');    
                }  
            }
            
            
        });
    }

    onChangeHandler = (event) => {
        const $this = event.currentTarget;  
    
        if ($this.value === '') {
            $this.classList.remove('changed');    
        } else {
            $this.classList.add('changed');    
        }  
    }

    onFocusHandler = (event) => {
        const $this = event.currentTarget;
        const nameInput = $this.nextElementSibling;
        const alert = $this.parentNode.nextElementSibling;
   
        if (alert) {
            nameInput.classList.add('hide');            
        } else {
            nameInput.style.transition = 'all 0.3s ease';
            nameInput.classList.remove('hide');
        }
    }
}