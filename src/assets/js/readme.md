# Form.js  
## Вызов валидации форм  
const form = new Form('.js-form', handleSubmit);  
  
handleSubmit - колбэк, передеваемый в валидатор. Содержит ответ сервера: либо все хорошо, либо ошибку

function handleSubmit() {
    console.log('submit');
    
    return {
        result: true
        // error: 'Неверный логин или пароль, попробуйте еще раз'
    }
}