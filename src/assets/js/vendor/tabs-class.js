class Tabs {
    constructor(options) {
        this.$tabs = document.querySelectorAll('.js-tabs');
        this.options = options;
        this.$tabContents;
        this.$tabBtns;

        this.setup();
    }

    setup = () => {
        this.$tabs.forEach(tabs => {
            const children = tabs.children;
            [...children].forEach(child => {
                if (child.classList.contains('tab-links')) {
                    this.$tabBtns = child.querySelectorAll(this.options.tabBtns);
                } else {
                    this.$tabContents = child.children;
                }
            });
           
            this.$tabBtns.forEach(button => {
                button.addEventListener('click', this.clickHandler.bind(null, this.$tabBtns, this.$tabContents));
            });
        });
        
    }

    clickHandler = (buttons, contents, event) => {
        event.preventDefault();
                
        const $this = event.currentTarget;               
        const tabId = $this.getAttribute('href').slice(1);
        const tab = document.getElementById(tabId);
        
        buttons.forEach(btn => {
            btn.classList.remove('active');
        })
        $this.classList.add('active');
        
        [...contents].forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active');
    }
}