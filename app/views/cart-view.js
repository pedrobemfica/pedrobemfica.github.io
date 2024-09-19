import { CartController } from "../controllers/cart-controller.js"

export class CartView {
    constructor() {
        this.cartList = []

        this.cartController = new CartController()

        const offcanvasElementList = document.querySelectorAll('.offcanvas')
        const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl))

        this.cartForm = document.getElementById('cartForm')
        this.cartTable = document.getElementById('cartTable')
        
        this.cartCompleteList = document.getElementById('cartCompleteList')
        this.cartTotal = document.getElementById('cartTotal')

        this.cartPurchaseAction = document.getElementById('cartPurchaseAction')
        this.cartCleanAction = document.getElementById('cartCleanAction')
        
        this.emptyCartMessage = document.getElementById('emptyCartMessage')

        this.userCart = document.getElementById("userCart")
        if (this.userCart)
            this.userCart.addEventListener('click', event => {
                event.preventDefault()
                this.updateList()
                })

        this.cartForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.cartController.purchaseCart()
            if (confirmation)
                this.updateList()
        })

        this.cartCleanAction.addEventListener('click', async event => {
            event.preventDefault()
            const confirmation = await this.cartController.clearCart()
            if (confirmation)
                this.updateList()        })
    }

    async updateList() {
        this.cartList = []
        if (this.cartController.checkUser())
            this.cartList = this.cartList.concat(await this.cartController.retrieveCart())

        if (this.cartList.length <= 0) {
            this.emptyCartMessage.classList.remove('element-hidden')
            this.cartTotal.classList.add('element-hidden')
            this.cartTable.classList.add('element-hidden')
        } else {
            this.emptyCartMessage.classList.add('element-hidden')
            this.cartTotal.classList.remove('element-hidden')
            this.cartTable.classList.remove('element-hidden')
            this.cartCompleteList.innerHTML = ''
            let total = 0
            for (let cartItem in this.cartList) {
                total += this.cartList[cartItem].quantity * this.cartList[cartItem].price
                this.cartCompleteList.innerHTML += `<td>${this.cartList[cartItem].name}</td>
                                                    <td>${this.cartList[cartItem].quantity}</td>
                                                    <td>${this.cartList[cartItem].price}</td>
                                                    <td><form id="cartItemForm${cartItem}">
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="cartItemRemoveAction"
                                                    value="${this.cartList[cartItem].id}"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="Remove o item">
                                                    <i class="fa-solid fa-trash-can"></i></button>
                                                    </form></td>`
            }
            this.cartTotal.innerHTML = `Total = R$ ${total}`
            this.setCartListActions()
        }
    }
    
    setCartListActions() {
        let cartItemRemoveAction = document.getElementsByName('cartItemRemoveAction')
        
        cartItemRemoveAction.forEach(element => element.addEventListener('click', async event => {
            event.preventDefault()           
            const confirmation = await this.cartController.deleteItem(element.value)
            if (confirmation)
                this.updateList()
        }))   
    }
}