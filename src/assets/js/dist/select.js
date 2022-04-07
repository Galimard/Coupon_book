document.addEventListener("DOMContentLoaded", function(){  
    if (document.querySelector('#select-book')) {
        const selectBook = new SelectUI('#select-book', {
            placeholder: 'Тип книги',
            errorText: 'Выберите тип книги',
            nameSelect: 'select-book',
            data: [
                {id: '1', value: 'Яркие весенние каникулы'},
                {id: '2', value: 'Тип книги 2'},
                {id: '3', value: 'Тип книги 3'},
            ],
        });
    }
});