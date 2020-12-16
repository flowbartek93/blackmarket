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
        this.productsList = document.querySelector('.products__list')
        this.priceSpan = document.querySelector('#products__price_span')
        this.basketAmount = document.querySelector('.basket__amount')

    }


    items = []


    async displayWeapon(path) {
        const container = await document.querySelector('.shop-container__items')
        await fetch(`weapons/${path}`).then(response => response.json()).then(data => container.innerHTML = data);

        /* addEventListener to buy buttons that dynamically show up */

        this.buyItem();
    }

    chooseWeapon() {
        /* Deafault display for first run*/
        this.displayWeapon('pistols')

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

        let number = parseInt(this.basketAmount.textContent)
        console.log(number);



        buyBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                let number = parseInt(this.basketAmount.textContent)
                this.basketAmount.textContent = ++number
                console.log(number);


                let itemname = btn.previousElementSibling.previousElementSibling.textContent
                let itemprice = parseInt(btn.previousElementSibling.textContent)
                let id = parseInt(btn.parentElement.dataset.id);


                if (this.items.length === 0) {

                    this.items.push({
                        name: itemname,
                        price: itemprice,
                        amount: 1,
                        id,

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
                            id,

                        })

                        return;
                    }


                }


            })
        })

        console.log(this.items);

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
        while (this.productsList.hasChildNodes()) {
            this.productsList.removeChild(this.productsList.childNodes[0]);
        }

        /* Displaying items in basket in checkout card */
        this.items.forEach(item => {



            itemPrice = itemPrice + item.price;
            const paragraph = document.createElement('p')

            const spanPlus = document.createElement('span')
            const spanMinus = document.createElement('span')
            spanPlus.className = "addIcon"
            spanMinus.className = "minusIcon"
            spanPlus.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>'
            spanMinus.innerHTML = '<i class="fa fa-minus" aria-hidden="true"></i>'


            paragraph.className = "products__list--singleitem"
            paragraph.setAttribute('data-id', item.id)
            paragraph.innerHTML =
                `<span class="item-name">${item.name}</span>
              - <span class="item-price"> ${item.price / item.amount}$</span> -  x 
              <span class="item-amount">${item.amount}</span>
             `
            this.productsList.appendChild(paragraph);
            paragraph.appendChild(spanPlus)
            paragraph.appendChild(spanMinus)

            this.priceSpan.textContent = `${itemPrice}$`;
            this.saldoSpan.textContent = parseInt(this.balanceSpan.textContent) - itemPrice + "$";
        })


        /* let user decide whether to continue shopping or confirm purchase */

        this.addItem();
        this.deleteItem();
        this.confirmBtn.addEventListener('click', confirmation)
        this.backBtn.addEventListener('click', cancelation)

    }



    addItem() {
        const addBtns = document.querySelectorAll('.addIcon')
        addBtns.forEach(btn => btn.addEventListener('click', () => {
            let itemId = parseInt(btn.parentElement.dataset.id);
            let amountSpan = btn.parentElement.children[2];
            let itemPrice = btn.parentElement.children[1];
            let newAmountValue = parseInt(amountSpan.textContent) + 1;
            amountSpan.textContent = newAmountValue;

            const riseAmountOf = this.items.find(item => item.id === itemId)
            // console.log(riseAmountOf);
            this.priceSpan.textContent = parseInt(this.priceSpan.textContent) + parseInt(itemPrice.textContent) + "$";
            ++riseAmountOf.amount;
            riseAmountOf.price = riseAmountOf.price + parseInt(itemPrice.textContent);


        }))

    }

    deleteItem() {
        const deleteBtns = document.querySelectorAll('.minusIcon')
        deleteBtns.forEach(btn => btn.addEventListener('click', () => {
            let itemId = parseInt(btn.parentElement.dataset.id);
            let amountSpan = btn.parentElement.children[2];
            let itemPrice = btn.parentElement.children[1];
            let newAmountValue = parseInt(amountSpan.textContent) - 1;
            amountSpan.textContent = newAmountValue;

            if (parseInt(amountSpan.textContent) === 0) {
                const itemToDelete = this.items.findIndex(item => item.id === itemId)
                btn.parentElement.remove();
                this.items.splice(itemToDelete, 1)
                this.priceSpan.textContent = parseInt(this.priceSpan.textContent) - parseInt(itemPrice.textContent) + "$";
                this.saldoSpan.textContent = parseInt(this.saldoSpan.textContent) + parseInt(itemPrice.textContent) + "$";

                // console.log(itemToDelete);
                // console.log(this.items);
            } else if (parseInt(amountSpan.textContent) > 0) {
                const reduceAmountOf = this.items.find(item => item.id === itemId)
                console.log(reduceAmountOf);
                this.priceSpan.textContent = parseInt(this.priceSpan.textContent) - parseInt(itemPrice.textContent) + "$";
                --reduceAmountOf.amount;

            }


        }))
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

    clearBasket() {
        const clearBtn = document.querySelector('.bar__element-clear-btn')

        clearBtn.addEventListener('click', () => {


            this.items.splice(0, this.items.length)
            console.log(this.items);
            this.basketAmount.textContent = "0";
            this.saldoSpan.textContent = this.balanceSpan.textContent
            this.priceSpan.textContent = "0$"
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

    /* Display current user and let him log out or clear basket */
    Shop.logout();
    Shop.displayUser();
    weapons.clearBasket();



})