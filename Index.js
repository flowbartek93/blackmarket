class Index {

    static toLoginPage() {

        const btn = document.querySelector('.login__button')
        btn.addEventListener('click', () => {
            window.location.href = "login.html"
        })

    }

    static toRegisterPage() {
        const btn = document.querySelector('.register__button')
        btn.addEventListener('click', () => {
            window.location.href = "register.html"
        })

    }

}

Index.toLoginPage();
Index.toRegisterPage();