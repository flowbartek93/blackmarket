class Register {
    constructor() {

        this.inputLogin = document.getElementById('login')
        this.inputPassword = document.getElementById('password')
        this.users = []

    }


    add() {

        if (this.inputLogin.value === '' || this.inputPassword.value === '') {
            this.alert('Musisz wypełnić wszystkie pola')
        } else {
            let userData = {
                login: this.inputLogin.value,
                password: this.inputPassword.value,
            }


            if (window.localStorage.getItem('users')) {
                const existingData = JSON.parse(window.localStorage.getItem('users'));

                for (let i = 0; i < existingData.length; i++) {
                    if (existingData[i].login === userData.login) {
                        if (document.querySelector('.red-alert')) {
                            return;
                        } else {
                            this.alert("Taki użytkownik już jest członkiem Black Market");
                            break;
                        }
                    } else {
                        if (this.users.length === 0) {
                            existingData.map((obj) => {
                                return this.users.push(obj);
                            })
                            this.users.push(userData);
                            localStorage.setItem('users', JSON.stringify(this.users))
                            window.location.href = "index.html";
                        } else if (this.users.length > 0) {
                            this.users.push(userData);
                            localStorage.setItem('users', JSON.stringify(this.users))
                            console.log(this.users);
                            window.location.href = "index.html";
                        }
                    }
                }
            } else {
                //success when no users at all
                this.users.push(userData);
                localStorage.setItem('users', JSON.stringify(this.users))
                window.location.href = "index.html";
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