import { Cart } from "../models/cart-model.js";
import { routes } from "../api/routes.js";
import { alertMessage } from "../helpers/alert-helper.js"

export class CartController  {
    constructor() {
        this.userId = this.checkLoggedser()
        this.cart = new Cart(this.userId)

        this.updateCart()
    }

    updateCart() {    
        let getCart = []
        this.cart.clearCart()
        getCart = routes.getCartServer()
        getCart.map(product => {this.cart.addToCart(product)})
    }

    retrieveCart() {
        return this.cart.getCartList
    }

    deleteItem(index) {
        let confirm = routes.deleteFomCart(index)
        if (confirm) {
            alertMessage('Item removido', 'O item foi removido do seu carrinho.')
        } else
            alertMessage('Não foi possível apagar', 'Algum erro ocorreu e a ação não foi concluída.')
        
        this.updateCart()
    }

    clearCart() {
        let confirm = routes.clearCart()
        if (confirm) {
            alertMessage('Carrinho limpo', 'Todos os itens foram removidos do seu carrinho.')
        } else
            alertMessage('Não foi possível apagar', 'Algum erro ocorreu e a ação não foi concluída.')
        
        this.updateCart()
    }

    checkLoggedser() {
        let user = {id: 1, name: 'Pedro'}
        return user
        return false
    }
}