class register {

    static clickRegister() {
        const btn = document.querySelector('.register__button');
        btn.addEventListener('click', () => {

            window.location.href = "register.html"

        })

    }


}

register.clickRegister();