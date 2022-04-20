const form = new Form('.js-form', handleSubmit);

function handleSubmit() {
    console.log('submit');
    
    return {
        result: true
        // error: 'Неверный логин или пароль, попробуйте еще раз'
    }
}