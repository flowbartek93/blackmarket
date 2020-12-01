class Shop {

    constructor() {

        this.buttons = document.querySelectorAll('.type')
    }


    items = [

    ]


    async displayWeapon(path) {
        const container = await document.querySelector('.shop-container__items')
        await fetch(`weapons/${path}`).then(response => response.json()).then(data => container.innerHTML = data);

        /* addEventListener to buy buttons that dynamically show up */

        this.buyItem();
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

    static displayUser() {
        const user = window.sessionStorage.getItem('login');
        const userSpan = document.querySelector('#session__user')
        userSpan.textContent = user;
    }

    static logout() {
        const logoutbtn = document.querySelector('.shop-container__logout')
        logoutbtn.addEventListener('click', () => {


            window.sessionStorage.clear();
            window.location.href = "index.html";
        })
    }

    buyItem() {
        const buyBtn = document.querySelectorAll('.buy')
        const basketAmount = document.querySelector('.basket__amount')
        let number = parseInt(basketAmount.textContent)

        buyBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                basketAmount.textContent = ++number
                console.log('click');

                let itemname = btn.previousElementSibling.previousElementSibling.textContent
                let itemprice = parseInt(btn.previousElementSibling.textContent)
                let id = btn.parentElement.dataset.id - 1;
                console.log(id);

                if (this.items.length === 0) {

                    this.items.push({
                        name: itemname,
                        price: itemprice,
                        amount: 1,
                    })

                } else {

                    const match = this.items.find(item => item.name === itemname)

                    if (match) {

                        let amount = match.amount;
                        match.amount = ++amount;
                        match.price += itemprice;

                        console.log(this.items);


                    } else {
                        this.items.push({
                            name: itemname,
                            price: itemprice,
                            amount: 1,
                        })
                    }


                }
            })

        })
    }
}





document.addEventListener('DOMContentLoaded', function () {

    // Check if user is logged in
    Shop.checkForSession();

    /* Display weapons */
    const weapons = new Shop();
    weapons.chooseWeapon();
    /* Display weapons */





    /* Display current user and let him log out */
    Shop.logout();
    Shop.displayUser();



})