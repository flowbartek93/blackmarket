import {
    Animations
} from './Animations.js'

export class Login {
    constructor(form) {

        this.inputLogin = document.getElementById('login');
        this.inputPassword = document.getElementById('password');
        this.form = form;
        this.session;

    }


    async validate() {

        if (this.form.querySelector('.red-alert') || this.form.querySelector('.green-alert')) {
            this.form.querySelector('.alert').remove();
        }

        if (this.inputLogin.value === '' || this.inputPassword.value === '') {
            this.redalert('Musisz wypełnić wszystkie pola')
            return;
        } else {
            const status = await this.sendDataToServer();

            if (status === false) {


                this.redalert("User does not exist")

            } else if (status) {

                this.greenalert("Logging in...")
            }
        }

    }

    getInputsData() {
        const userData = {
            login: this.inputLogin.value,
            password: this.inputPassword.value
        }
        return userData;
    }

    async sendDataToServer() {
        const userData = this.getInputsData();

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json();




        if (data.userExists) {
            this.session = data.sess;
            console.log(this.session);
            this.startSession();

            const toshop = new Animations({
                form: document.querySelector('.login-form'),
                background: document.querySelector('.background'),
                body: document.querySelector('body')
            });

            toshop.run();
            return data.userExists;


        } else if (data.userExists === false) {

            return data.userExists;
        }


    }

    startSession() {
        const session = window.sessionStorage;
        session.setItem('login', this.session.username);
        session.setItem('balance', this.session.balance)
    }
    redalert(text) {

        const par = document.createElement('p')
        par.setAttribute('class', 'alert red-alert')
        par.textContent = text;
        this.form.appendChild(par)
    }

    greenalert(text) {
        const par = document.createElement('p')
        par.setAttribute('class', 'alert green-alert')
        par.textContent = text;
        this.form.appendChild(par)
    }


}


function eventListener() {


    const form = document.querySelector('.login-form')

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const startLogin = new Login(form)
        startLogin.validate();



    })

}

document.addEventListener('DOMContentLoaded', eventListener)