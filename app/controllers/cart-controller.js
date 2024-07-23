import { Cart } from "../models/cart-model.js";
import { UserController } from "./user-controller.js"

import { routes } from "../api/routes.js";
import { alertMessage } from "../helpers/alert-helper.js"

export class CartController  {
    constructor() {
        this.userController = new UserController()
        this.user = this.userController.checkUser()
        this.cart = new Cart(this.user.userId)

        this.updateCart()
    }

    updateCart() {    
        let getCart = []
        this.cart.clearCart()
        getCart = routes.getCartServer(this.user.userId, this.user.jwt)
        getCart.map(product => {this.cart.addToCart(product)})
    }

    retrieveCart() {
        return this.cart.getCartList
    }

    deleteItem(index) {
        let confirm = routes.deleteFomCart(index, this.user.userId, this.user.jwt)
        if (confirm) {
            alertMessage('Item removido', 'O item foi removido do seu carrinho.')
        } else
            alertMessage('Não foi possível apagar', 'Algum erro ocorreu e a ação não foi concluída.')
        
        this.updateCart()
    }

    clearCart() {
        let confirm = routes.clearCart(this.user.userId, this.user.jwt)
        if (confirm) {
            alertMessage('Carrinho limpo', 'Todos os itens foram removidos do seu carrinho.')
        } else
            alertMessage('Não foi possível apagar', 'Algum erro ocorreu e a ação não foi concluída.')
        
        this.updateCart()
    }

    checkLoggedser() {
        if (this.user)
            if (this.user.logged)
                return this.user
        return false
    }
}