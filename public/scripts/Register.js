class Register {
    constructor() {

        this.inputLogin = document.getElementById('login')
        this.inputPassword = document.getElementById('password')


    }


    add() {

        if (this.inputLogin.value === '' || this.inputPassword.value === '') {
            this.alert('Musisz wypełnić wszystkie pola')
        } else {
            let userData = {
                login: this.inputLogin.value,
                password: this.inputPassword.value,
            }


        }
    }
    alert(text) {
        const par = document.createElement('p')
        par.classList.add('red-alert');
        par.textContent = text;
        document.querySelector('.register-form').appendChild(par)
    }



}


function eventListener() {
    const form = document.querySelector('.register-form');

    const newUser = new Register();


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        newUser.add();

    })
}

document.addEventListener('DOMContentLoaded', eventListener)