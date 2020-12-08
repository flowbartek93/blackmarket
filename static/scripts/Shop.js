class Shop {

    constructor() {

        this.buttons = document.querySelectorAll('.type')
        this.categories = document.querySelector('.shop-container__categories')
        this.backgroundplane = document.querySelector('.checkout-plane')
        this.checkoutPlane = document.querySelector('.checkout-plane__card')
        this.confirmBtn = document.querySelector('.confirmBtn')
        this.backBtn = document.querySelector('.backBtn')
        this.saldoSpan = document.querySelector('#saldo')
        this.balanceSpan = document.querySelector('#balance')

    }


    items = []


    async displayWeapon(path) {
        const container = await document.querySelector('.shop-container__items')
        await fetch(`weapons/${path}`).then(response => response.json()).then(data => container.innerHTML = data);

        /* addEventListener to buy buttons that dynamically show up */

        this.buyItem();
    }

    chooseWeapon() {

        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {


                let weaponType = e.target.dataset.type
                switch (weaponType) {
                    case 'pistols':


                        return this.displayWeapon(weaponType)



                    case 'rifles':

                        return this.displayWeapon(weaponType)

                    case 'grenades':


                        return this.displayWeapon(weaponType)

                    case 'closerange':

                        return this.displayWeapon(weaponType)

                    case 'rocketlauchner':

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
        const balance = window.sessionStorage.getItem('balance')
        const userSpan = document.querySelector('#session__user')
        const balanceSpan = document.querySelector('#balance')
        userSpan.textContent = user;
        balanceSpan.textContent = balance + "$";
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


                let itemname = btn.previousElementSibling.previousElementSibling.textContent
                let itemprice = parseInt(btn.previousElementSibling.textContent)
                let id = btn.parentElement.dataset.id - 1;


                if (this.items.length === 0) {

                    this.items.push({
                        name: itemname,
                        price: itemprice,
                        amount: 1,
                    })
                    this.displayCheckoutBtn();
                    return;

                } else {

                    const match = this.items.find(item => item.name === itemname)

                    if (match) {

                        let amount = match.amount;
                        match.amount = ++amount;
                        match.price += itemprice;

                        return;


                    } else {
                        this.items.push({
                            name: itemname,
                            price: itemprice,
                            amount: 1,
                        })

                        return;
                    }


                }


            })
        })
    }


    displayCheckoutBtn() {
        // check if there is any content in this.items, then display checkout button;
        const checkoutBtn = document.querySelector('.checkout-btn')

        if (this.items.length > 0) {
            checkoutBtn.style.display = "block"
        }

        checkoutBtn.addEventListener('click', () => {
            this.checkoutBoard();
            console.log('wywolanie purchaseinfo()');


        })
    }
    checkoutBoard() {

        const productsList = document.querySelector('.products__list')
        const priceSpan = document.querySelector('#products__price_span')



        /* Arrow functions that runs on after clicking back or confirm buttons */
        const confirmation = () => {
            this.confirm()
        }

        const cancelation = () => {
            this.cancel()
            this.backBtn.removeEventListener('click', cancelation)
            this.confirmBtn.removeEventListener('click', confirmation)
        }

        /* Displaying checkoutBoard that overlays entire layout */

        this.backgroundplane.style.display = "block";
        this.checkoutPlane.style.display = "flex";
        let itemPrice = 0;


        /* Checking if there are already items in checkout board, so after closing checkout window it deletes them, so they not duplicate themeselves */
        while (productsList.hasChildNodes()) {
            productsList.removeChild(productsList.childNodes[0]);
        }

        /* Displaying items in basket in checkout card */
        this.items.forEach(item => {
            itemPrice = itemPrice + item.price;
            const paragraph = document.createElement('p')
            paragraph.className = "products__list--singleitem"
            paragraph.textContent = `${item.name} - ${item.price}$ -  x ${item.amount}`
            productsList.appendChild(paragraph);
            priceSpan.textContent = `${itemPrice}$`;
            this.saldoSpan.textContent = parseInt(this.balanceSpan.textContent) - itemPrice + "$";
        })


        /* let user decide whether to continue shopping or confirm purchase */


        this.confirmBtn.addEventListener('click', confirmation)
        this.backBtn.addEventListener('click', cancelation)

    }

    confirm() {

        /* Update cash */

        console.log(this.balanceSpan);

        let saldo = parseInt(this.saldoSpan.textContent)
        let user = window.sessionStorage.getItem('login')

        fetch('/confirm', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    saldoValue: saldo,
                    currentUser: user
                })
            })
            .then(response => response.json())
            .then(newBalance => this.balanceSpan.textContent = newBalance + "$")


    }

    cancel() {
        this.backgroundplane.style.display = "none";
        this.checkoutPlane.style.display = "none";


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