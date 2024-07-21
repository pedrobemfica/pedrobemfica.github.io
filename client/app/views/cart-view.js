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

        this.cartPurchaseAction = document.getElementById('cartPurchaseAction')
        this.cartCleanAction = document.getElementById('cartCleanAction')
        
        this.cartForm.addEventListener('submit', event => {
            event.preventDefault()
            this.purchaseCart()
        })

        this.cartCleanAction.addEventListener('click', event => {
            event.preventDefault()
            this.cleanCart()
        })
        this.updateList()
    }

    updateList() {
        this.cartList = this.cartController.retrieveCart()
        if (this.cartList.length <= 0) {
            this.emptyCartMessage.classList.remove('element-hidden')
            this.cartTable.classList.add('element-hidden')
        } else {
            this.emptyCartMessage.classList.add('element-hidden')
            this.cartTable.classList.remove('element-hidden')
            this.cartCompleteList.innerHTML = ''
            for (let cartItem in this.cartList) {
                this.cartCompleteList.innerHTML += `<td>${this.cartList[cartItem].description}</td>
                                                    <td>${this.cartList[cartItem].quantity}</td>
                                                    <td>${this.cartList[cartItem].price}</td>
                                                    <td><form id="cartItemForm${this.cartList[cartItem].name}">
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="cartItemRemoveAction"
                                                    value="${this.cartList[cartItem].name}"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="Remove o item">
                                                    <i class="fa-solid fa-trash-can"></i></button>
                                                    </form></td>`
            }
            this.setCartListActions()
        }
    }

    purchaseCart() {

    }

    cleanCart() {

    }

    setCartListActions() {

    }
}