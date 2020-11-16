class Register {
    constructor() {

        this.inputLogin = document.getElementById('login')
        this.inputPassword = document.getElementById('password')

    }


    checkInputs() {

        if (this.inputLogin.value === '' || this.inputPassword.value === '') {
            this.alert('Musisz wypełnić wszystkie pola')
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
    const formSubmit = document.querySelector('.register-form');

    const newUser = new Register();

    formSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        newUser.checkInputs();

        const form = e.target;
        const formData = new FormData(form)

        const userData = {
            login: formData.get('login'),
            password: formData.get('password'),
        }

        console.log(userData);

        fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                console.log(response);

            })

    })
}

document.addEventListener('DOMContentLoaded', eventListener)