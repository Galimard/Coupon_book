class SelectUIChildren {
    constructor(selector, options){        
        this.$parent = options.parent;
        this.$el = this.$parent.nextElementSibling;
        this.options = options;
        this.ages = options.ages || [];
        this.selectedItems = [];

        this.render();

        // this.contentMobile = document.querySelector('.select-children-content-mobile');
        // this.inputNumberchildren = document.querySelector('#children-number'); 
        // this.minusBtn = document.querySelector('#minus');
        // this.plusBtn = document.querySelector('#plus');
        // this.resetBtn = document.querySelector('#btn-reset-children');
        // this.applyBtn = document.querySelector('#btn-apply-children');
        // this.childrenItems = document.querySelector('.select-children__items'); 
        // this.displayNumber = document.querySelector('#display-child');
        // this.content = document.querySelector('.select-children__content');
 
        this.setup();
    }
  
    render = () => {       
        this.$el.classList.add('select-children');
        // this.$el.innerHTML = this.getTemplateChildren();
        this.renderSelects();
    }

    setup = () => {
        this.$el.addEventListener('click', this.toggle);
        // this.plusBtn.addEventListener('click', this.plusBtnHandler);
        // this.minusBtn.addEventListener('click', this.minusBtnHandler);
        // this.resetBtn.addEventListener('click', this.resetBtnHandler);
        // this.applyBtn.addEventListener('click', this.applyBtnHandler);          
        // this.content.addEventListener('click', event => {
        //     event.stopPropagation();
        // });
        
        // this.renderSelects();
    }

    getTemplateChildren = () => {
        return `
            <div class="select-children__backdrop" id="children-backdrop"></div>
            <div class="select-children__input">
                <input id="children-number" type="number" value="${this.ages.length}" readonly>
            </div>
            <div class="select-children__dropdown">
                <div class="select-children-content-mobile">
                    <div class="mobile-btn-line mobile-btn-line--select-children">
                    </div>
                    <div class="select-children__content">
                        <div class="select-children__wrapper">
                            <div class="select-children__text">Дети</div>
                            <div class="form__guest-buttons">
                                <button class="form__guest-button form__guest-button--minus" type="button" id="minus"></button>
                                <span class="form__guest-display" id="display-child">${this.ages.length}</span>
                                <button class="form__guest-button form__guest-button--plus" type="button" id="plus"></button>
                            </div>
                        </div>
                        <div class="select-children__addition">
                            <div class="select-children__text select-children__text--age">Возраст детей на дату заезда <span>(обязательно)</span></div>
                            <div class="select-children__items">
                            </div>
                            <div class="select-children-btn__wrapper">
                                <div class="select-children-btn__item">
                                    <button class="btn btn--transparent-grey btn--col w-100 h-100" id="btn-reset-children" type="button">Сброс</button>
                                </div>
                                <div class="select-children-btn__item">
                                    <button class="btn btn--bronze btn--col w-100" id="btn-apply-children" type="button">Применить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    }

    get isOpen(){
        return this.$el.classList.contains('open-select');
    }

    select = (id) => {
        this.selectedId = id;
    }

    open = () => {
        this.$el.classList.add('open-select');
        // this.contentMobile.classList.add('open-select');
    }

    close = () => {        
        this.$el.classList.remove('open-select');
        // this.contentMobile.classList.remove('open-select');
    }

    toggle = () => {
        this.isOpen ? this.close() : this.open();
    }

    destroy = () => {
        this.$el.innerHTML = '';
    }

    renderSelects = () => {
        this.$el.innerHTML = '';
        console.log(this.ages);
        for (var i = 0; i < this.ages; i++) {            
            this.$el.insertAdjacentHTML("beforeend", 
            `<div class="select-children__item" data-type="num">
                <div class="select-ui"></div>
            </div>`);

            const selectNumberRooms = new SelectUI('.select-ui', {
                placeholder: `${i + 1} ребенок`,
                errorText: 'Выберите возраст ребёнка',
                nameSelect: `select-children-${i + 1}`,
                // selectedId: this.ages[i].toString(),
                // selectedDataProp: this.ages[i].toString(), 
                onSelect: (el) => {this.addToAges()},
                data: [
                    {id:"1",value:"до 1 года", dataProp:"0"},
                    {id:"2",value:"1 год", dataProp:"1"},
                    {id:"3",value:"2 года", dataProp:"2"},
                    {id:"4",value:"3 года", dataProp:"3"},
                    {id:"5",value:"4 года", dataProp:"4"},
                    {id:"6",value:"5 лет", dataProp:"5"},
                    {id:"7",value:"6 лет", dataProp:"6"},
                    {id:"8",value:"7 лет", dataProp:"7"},
                    {id:"9",value:"8 лет", dataProp:"8"},
                    {id:"10",value:"9 лет", dataProp:"9"},
                    {id:"11",value:"10 лет", dataProp:"10"},
                    {id:"12",value:"11 лет", dataProp:"11"},
                    {id:"13",value:"12 лет", dataProp:"12"},
                    {id:"14",value:"13 лет", dataProp:"13"},
                    {id:"15",value:"14 лет", dataProp:"14"},
                    {id:"16",value:"15 лет", dataProp:"15"},
                    {id:"17",value:"16 лет", dataProp:"16"},
                    {id:"18",value:"17 лет", dataProp:"17"}
                ]
            });
        }
        
        // this.addToSelectedItems();
    }

    addToSelectedItems = () => {
        this.currentChildren = this.$el.querySelectorAll('[data-type=num]');
        this.selectedItems = [];
        
        this.currentChildren.forEach(child => {            
            let ageId = child.getAttribute('id');            
            let selectValue = child.querySelector('[data-type=value]').innerHTML; 

            if(!this.selectedItems.includes(ageId)){                
                this.selectedItems.push({'ageId':ageId, 'value':selectValue, 'child':child});
            }         
        });
        // console.log('selectedItems', this.selectedItems);
    }

    // plusBtnHandler = () => {
    //     this.ages.push(0); //потому что по умолчанию всегда добавляется возраст до 1 года
        
    //     // this.inputNumberchildren.value = this.ages.length;
    //     this.displayNumber.innerHTML = this.ages.length;

    //     this.renderSelects();
    // }    

    // minusBtnHandler = () => {
    //     if(this.ages.length) {
    //         this.ages.pop();

    //         // this.inputNumberchildren.value = this.ages.length;
    //         this.displayNumber.innerHTML = this.ages.length;

    //         this.renderSelects();
    //     }     
    // }

    // resetBtnHandler = () => {
    //     // this.inputNumberchildren.value = 0;
    //     this.displayNumber.innerHTML = 0;
    //     this.childrenItems.innerHTML = "";
    //     this.ages = [];
    //     this.selectedItems = [];
    // }

    // applyBtnHandler = () => {        
    //     this.close();
    //     // console.log('ages', this.ages)
    //     // console.log('selectedItems', this.selectedItems);
    // }

    
    addToAges = () => {
        this.currentChildren = this.$el.querySelectorAll('[data-type=num]');
        this.ages = []; 
 
        this.currentChildren.forEach(child => {   
            let age = Number(child.querySelector('.select-ui__item.selected').getAttribute('data-prop'));
            let ageId = child.getAttribute('id');            

            if(!this.selectedItems.includes(ageId)){                
                this.ages.push(age);
            }         
        });    
        
        this.addToSelectedItems();
    }
}

// Иницилизиурем класс на странице where-to-stay
// const selectChild = new SelectUIChildren('#children-ui', {});

// Заносим для примера переменную, к который можем применять методы
// window.sr = selectChild;
