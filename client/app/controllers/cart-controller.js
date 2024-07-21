import { Cart } from "../models/cart-model.js";

export class CartController  {
    constructor() {
        this.userId = this.checkLoggedser()
        this.cart = new Cart(this.userId)
    }

    updateCart() {
        
    }

    retrieveCart() {
        return this.cart.getCartList
    }

    checkLoggedser() {
        let user = {id: 1, name: 'Pedro'}
        return user
        return false
    }
}