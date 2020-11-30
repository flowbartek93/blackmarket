class Register {
    constructor(form) {


        this.inputLogin = document.getElementById('login')
        this.inputPassword = document.getElementById('password')
        this.form = form;

    }


    validate() {

        if (this.form.querySelector('.red-alert') || this.form.querySelector('.green-alert')) {
            this.form.querySelector('.alert').remove();
        }

        if (this.inputLogin.value === '' || this.inputPassword.value === '') {
            this.redalert('Musisz wypełnić wszystkie pola');
            return;

        } else {
            this.sendDataToServer();
            this.greenalert("Account created...")
            this.ProccedToLogin()

        }

    }

    getInputsData() {

        const userData = {
            login: this.inputLogin.value,
            password: this.inputPassword.value
        }
        return userData;
    }

    ProccedToLogin() {

        /* remove register buttons in order to proceed to login phase */
        const registerButtons = document.querySelector('.register-form__buttons')
        registerButtons.remove();
        /* add login button */
        const loginBtn = document.createElement('a')
        loginBtn.classList.add('loginAfterRegister')
        loginBtn.textContent = "Procced to login"
        this.form.appendChild(loginBtn)

        loginBtn.addEventListener('click', () => {
            window.location.href = "login.html"
        })

    }



    sendDataToServer() {

        const userdata = this.getInputsData();
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
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
    const form = document.querySelector('.register-form')

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const startRegistration = new Register(form)
        startRegistration.validate();

    })


}

document.addEventListener('DOMContentLoaded', eventListener)