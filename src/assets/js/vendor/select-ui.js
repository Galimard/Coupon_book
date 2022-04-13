class SelectUI{
    constructor(selector, options){
        this.$elements = document.querySelectorAll(selector);
        this.options = options;
        this.selector = selector;
        this.selectedId = options.selectedId;
        this.selectedDataProp = options.selectedDataProp;
        this.data = options.data || [];
        this.placeholder = options.placeholder || 'Placeholder по умолч.';
        this.errorText = options.errorText || '';
        this.nameSelect = options.nameSelect || 'select';
        this.fakeSelect = document.querySelector('.select-ui-fake'); 
        this.onSelect = options.onSelect;  
        this.selectChildren = options.selectChildren;
        this.valueInput = '';   
        this.arrValues = [];    

        this.render();
        
    }

    render(){        
        this.$elements.forEach(el => {
            if (this.selectChildren) {
                this.parent = this.options.parent;
                this.countSelectChildren = this.options.countSelectChildren;                
            } else {
                el.innerHTML = this.getTemplate();
                this.hideFakeSelect();
                this.setup(el);
            }           
        });  
        
        if (this.selectChildren) this.renderChildrenSelects(); 
    }

    renderChildrenSelects = () => {
        let childrenList = this.parent.nextElementSibling;
        childrenList.innerHTML = '';
        
        for (let i = 0; i < this.countSelectChildren; i++) {
            childrenList.insertAdjacentHTML("beforeend", 
            `<div class="select-children__item" data-type="num">
                <div class="select-ui-children select-ui-children-${i + 1}"></div>
            </div>`);    
            
            const selectChildren = new SelectUI('.select-ui-children-' + (i + 1), {
                placeholder: `${i + 1} ребенок`,
                errorText: 'Выберите возраст ребёнка',
                nameSelect: `select-children-${i + 1}`,
                // onSelect: (el) => {this.addToAges()},
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

        
    }

    setup(el){
        this.clickHandler = this.clickHandler.bind(this);
        el.addEventListener('click', this.clickHandler.bind(null, el));
    }

    getTemplate = () => {
        let cls = '';
        this.valueInput = this.placeholder;

        if (this.selectedDataProp || this.selectedId) {
            if (this.selectedDataProp === undefined) {
                this.arrValues = this.data.filter(item => item.id === this.selectedId);
            } else {
                this.arrValues = this.data.filter(item => item.id === this.selectedDataProp);
            }
            cls = 'selected';
            if (this.arrValues[0]) {
                this.valueInput = this.arrValues[0].value;
            }
        }        

        return `
            <div class="select-ui__backdrop" data-type="backdrop"></div>
            <div class="select-ui__input ${cls}" data-type="input">
                <span class="select-ui__input-name form-item__name" data-type="input">${this.placeholder}</span>
                <span data-type="value">${this.valueInput}</span>
            </div>
            <div class="select-ui__dropdown">
                <ul class="select-ui__list">
                    ${this.mapItems().join('')}
                </ul>
            </div>
            <select class="select-ui__hidden-select" name="${this.nameSelect}" required data-validate-text-invalid="${this.errorText}">
                <option value="">Выберите пункт</option>
                ${this.mapOptionsSelect().join('')}
            </select>
        `
    }

    mapItems = () => {
        const items = this.data.map(item => {
            let cls = '';
    
            if (this.selectedDataProp === undefined) {
                if (item.id === this.selectedId){
                    cls = 'selected';
                }
            } else {
                if (item.dataProp === this.selectedDataProp){
                    cls = 'selected';
                }
            }
    
            return `
                <li class="select-ui__item ${cls}" data-type="item" data-id=${item.id} data-prop="${item.dataProp}">${item.value}</li>
            `
        });

        return items;
    }

    mapOptionsSelect = () => {
        const optionsSelect = this.data.map(option => {
            let selected = '';
    
            if (this.selectedDataProp === undefined) {
                if (option.id === this.selectedId){
                    selected = 'selected';
                }
            } else {
                if (option.dataProp === this.selectedDataProp){
                    selected = 'selected';
                }
            }
            
            return `
                <option class="select-ui__hidden-option" value="${option.value}" ${selected}>${option.value}</option>
            `
        });

        return optionsSelect;
    }

    clickHandler(el, event){            
        const {type} = event.target.dataset;
        console.log(type);
        if (type === 'input' || type === 'value'){
            this.toggle(el);
        } else if (type === 'item'){
            const id = event.target.dataset.id;
            const dataProp = event.target.dataset.prop;
            this.select(id, dataProp, el);           
        } else if (type === 'backdrop'){
            this.close(el);
        } 
    }

    select(id, dataProp, el){
        this.selectedId = id;
        this.selectedDataProp = dataProp;
        this.$value = el.querySelector('[data-type="value"]');
        this.$input = el.querySelector('.select-ui__input');
        this.$inputName = this.$input.querySelector('.form-item__name');
        this.$hiddenSelect = el.querySelector('.select-ui__hidden-select');
        this.$value.innerHTML = this.current.value;

        el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected'); 
        });        
        el.querySelector(`[data-id="${id}"]`).classList.add('selected');
        
        this.$input.classList.add('selected'); //для лейбла
        
        // if (this.$el.nextElementSibling && this.$el.nextElementSibling.classList.contains('alert')) { //чтобы не было ошибки и лейбла одновременно
        //     this.$inputName.style.display = 'none';
        // }       

        this.$hiddenSelect.value = this.current.value; //присваиваем в скрытый селект выбранное значение

        this.onSelect ? this.onSelect(this.current) : null;
        this.close(el);
    }   

    get current(){
        return this.data.find(item => item.id === this.selectedId);
    }

    toggle(el){        
        this.getIsOpen(el) ? this.close(el) : this.open(el);
    }

    getIsOpen(el){
        return el.classList.contains('open');
    }

    open(el){
        el.classList.add('open');
    }

    close(el){
        el.classList.remove('open');
    }

    destroy(el){
        el.removeEventListener('click', this.clickHandler);
        el.innerHTML = '';
    }

    hideFakeSelect(){
        if (this.fakeSelect !== null) {
            this.fakeSelect.remove();
        }           
    }
}





