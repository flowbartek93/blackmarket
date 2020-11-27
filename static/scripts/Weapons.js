class Weapons {
    constructor() {
        this.buttons = document.querySelectorAll('.type')
    }

    async displayWeapon(path) {

        try {
            const container = document.querySelector('.shop-container')
            await fetch(`weapons/${path}`).then(response => response.json()).then(data => container.innerHTML += data).catch(err => console.log(err));
        } catch (err) {
            console.log(err);

        }





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

                        this.displayWeapon(weaponType)

                    case 'closerange':
                        console.log('click');
                        this.displayWeapon(weaponType)

                    case 'rocketlauchner':
                        console.log('click');
                        this.displayWeapon(weaponType)

                }

            })
        })

    }

}




document.addEventListener('DOMContentLoaded', function () {

    const buttons = document.querySelectorAll('.type')
    const weapons = new Weapons();
    weapons.chooseWeapon();



})