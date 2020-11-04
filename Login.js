import {
    Animations
} from './Animations.js'

class Login {
    constructor() {

        this.inputLogin = document.getElementById('login');
        this.inputPassword = document.getElementById('password');
    }

    login() {

        const login = this.inputLogin.value;
        const password = this.inputPassword.value;

        const getUser = JSON.parse(window.localStorage.getItem('users'));

        if (this.inputLogin.value == '' || this.inputPassword.value == '') {
            if (document.querySelector('.red-alert')) {
                document.querySelector('.red-alert').remove();
            }
            this.alert('Musisz wypełnić wszystkie pola')
        } else {

            let existingUser = getUser.find(user => user.login === login && user.password === password);

            if (existingUser) {
                const runAnimation = new Animations({
                    form: document.querySelector('.register-form'),
                    background: document.querySelector('.background'),
                    body: document.querySelector('.login-page__body')
                })

                runAnimation.run();
            } else if (!existingUser) {
                if (document.querySelector('.red-alert')) {
                    document.querySelector('.red-alert').remove();
                    this.alert('Błędne dane');
                } else {
                    this.alert('Błędne dane');
                }
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginToSystem = new Login();
        loginToSystem.login();



    })
}

document.addEventListener('DOMContentLoaded', eventListener)