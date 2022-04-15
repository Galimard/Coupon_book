class InputGuest {
    constructor() {
        this.$elements = document.querySelectorAll('.js-input-guest');
        this.plusBtnClass = '.js-plus';
        this.minusBtnClass = '.js-minus';
        this.countClass = '.js-count-guest';
        this.inputClass = '[data-type=input]';
        this.childrenClass = 'js-select-children';

        this.setup();
    }

    setup = () => {
        this.$elements.forEach(el => {  
            this.$plusBtn = el.querySelector(this.plusBtnClass);
            this.$minusBtn = el.querySelector(this.minusBtnClass);
  
            this.$plusBtn.addEventListener('click', this.plusBtnHandler.bind(null, el));              
            this.$minusBtn.addEventListener('click', this.minusBtnHandler.bind(null, el)); 
        });
    }

    plusBtnHandler = (el) => {
        this.$minusBtn = el.querySelector(this.minusBtnClass);
        this.$count = el.querySelector(this.countClass);
        this.$input = el.querySelector(this.inputClass);
        this.$childrenList = el.nextElementSibling;
        
        this.count = 0;

        this.count = Number(this.$count.innerText);
        this.count += 1;
        
        this.$count.innerText = this.count;
        this.$input.value = this.count;

        this.checkDisabled(this.count, this.$minusBtn);

        if (this.$childrenList.classList.contains(this.childrenClass)) {
            const selectChild = new SelectUI('.' + this.childrenClass, {
                selectChildren: true,
                countSelectChildren: this.count,
                parent: el
            });
        }        
    }

    minusBtnHandler = (el) => {
        this.$minusBtn = el.querySelector(this.minusBtnClass);
        this.$count = el.querySelector(this.countClass);
        this.$input = el.querySelector(this.inputClass);
        this.count = 0;

        this.count = Number(this.$count.innerText);
        this.count -= 1;
        
        this.$count.innerText = this.count;
        this.$input.value = this.count;

        this.checkDisabled(this.count, this.$minusBtn);

        if (this.$childrenList.classList.contains(this.childrenClass)) {
            const selectChild = new SelectUI('.' + this.childrenClass, {
                selectChildren: true,
                countSelectChildren: this.count,
                parent: el
            });
        }
    }

    checkDisabled = (count, minusBtn) => {
        if (count === 0) {
            minusBtn.classList.add('disabled');
        } else {
            minusBtn.classList.remove('disabled');
        }
    }
}