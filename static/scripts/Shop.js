import {
    Login
} from './Login.js'

class Weapons {

    constructor() {

        this.buttons = document.querySelectorAll('.type')
    }

    async displayWeapon(path) {
        const container = await document.querySelector('.shop-container__items')
        await fetch(`weapons/${path}`).then(response => response.json()).then(data => container.innerHTML = data);
    }

    chooseWeapon() {

        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('click');

                let weaponType = e.target.dataset.type
                switch (weaponType) {
                    case 'pistols':
                        console.log('click');
                        return this.displayWeapon(weaponType)

                    case 'rifles':
                        console.log('click');
                        return this.displayWeapon(weaponType)

                    case 'grenades':
                        console.log('click');

                        return this.displayWeapon(weaponType)

                    case 'closerange':
                        console.log('click');
                        return this.displayWeapon(weaponType)

                    case 'rocketlauchner':
                        console.log('click');
                        return this.displayWeapon(weaponType)

                }

            })
        })

    }

    static checkForSession() {

        const session = window.sessionStorage;
        console.log(session);
        if (!session.login) {
            window.location.replace("login.html")
        }

    }

}



document.addEventListener('DOMContentLoaded', function () {

    Weapons.checkForSession();
    const weapons = new Weapons();
    weapons.chooseWeapon();


})