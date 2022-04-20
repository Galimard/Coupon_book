class Modal{constructor(t,s){this.$modalBtns=document.querySelectorAll(t.modalBtns),this.$modalCloseBtns=document.querySelectorAll(t.modalCloseBtns),this.$modals=document.querySelectorAll(t.modals),this.$body=document.querySelector("body"),this.options=t,this.handleAjax=s,this.$textModal=document.querySelector(".js-text"),this.$titleModal=document.querySelector(".js-title"),this.setup()}setup=()=>{this.handleAjax?this.$modalBtns.forEach(t=>{t.addEventListener("click",this.openModalAjax)}):this.$modalBtns.forEach(t=>{t.addEventListener("click",this.openModal)}),this.$modalCloseBtns.forEach(t=>{t.addEventListener("click",this.closeBtnHandler)}),this.$modals.forEach(t=>{t.addEventListener("click",this.closeBtnHandler)})};closeBtnHandler=t=>{if(t.target.classList.contains("js-modal-close")){var s=t.currentTarget.closest(".js-modal");this.closeModal(s)}else{const e=t.target;e.classList.contains("js-modal")&&this.closeModal(e)}};openModal=t=>{t.preventDefault();const s=t.currentTarget;t=s.getAttribute(this.options.modalBtns.substr(1,this.options.modalBtns.length-2));const e=document.getElementById(t);e.classList.add("open"),this.$body.classList.add("no-scroll"),this.defaultInitSelects()};closeModal=t=>{t.classList.remove("open"),this.$body.classList.remove("no-scroll")};openModalAjax=t=>{const s=document.querySelector(".js-modal.open"),e=t.currentTarget;t=e.getAttribute(this.options.modalBtns.substr(1,this.options.modalBtns.length-2));const o=document.getElementById(t);s&&(s.classList.remove("open"),this.$body.classList.remove("no-scroll")),o.classList.add("open"),this.$body.classList.add("no-scroll");t=this.handleAjax();this.fillCard(t)};fillCard=t=>{this.$titleModal.innerHTML=t.title,this.$textModal.innerHTML=t.fullText}}