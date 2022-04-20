document.addEventListener("DOMContentLoaded", function(){
    const modalAjax = new Modal({
        modalBtns: '[data-modal-ajax]',
        modalCloseBtns: '.js-modal-close',
        modals: '.js-modal',
    }, handleAjaxMenu); 
});

function handleAjaxMenu() {
    const path = !window.location.href.includes("localhost") ? '/local/templates/chateaudetalu' : '';
    const result = {
        title: 'Как добраться?',
        fullText: 'Тариф действует на один подъем и один спуск по канатным дорогам «Красная Поляна», «Реликтовый лес» и «Вершина» с 9:00 до 18:00 Тариф действует на один подъем и один спуск по канатным дорогам «Красная Поляна», «Реликтовый лес» и «Вершина» с 9:00 до 18:00'
    };

    return result;
}