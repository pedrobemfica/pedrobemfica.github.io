import { Cart } from "../models/cart-model.js";
import { ApiCart } from "../api/cart-routes.js";
import { UserController } from "./user-controller.js"

import { alertMessage } from "../helpers/alert-helper.js"

export class CartController  {
    constructor() {
        this.cart = new Cart()
        this.userController = new UserController()
    }

    checkUser() {
        return this.userController.checkUser()
    }

    async updateCart() {    
        try {
            const data = await ApiCart.listCart()
            if (data.result) {
                if (data.list.length <= 0) 
                    this.cart.clearCart()
                else {
                    this.cart.clearCart()
                    data.list.map(product => this.cart.addToCart(product))
                }
            } else
                alertMessage('Falha ao abrir carrinho', data.message)  
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao abrir carrinho', err)
        }
        return false
    }

    async retrieveCart() {
        await this.updateCart()
        return this.cart.cartList
    }

    async deleteItem(itemId) {
        try {
            const data = await ApiCart.deleteFromCart(itemId)
            if (data.result) {
                alertMessage('Item removido', data.message)
                return true
            } else
                alertMessage('Falha ao remover', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao remover', err)
        }
        return false
    }

    async clearCart() {
        try {
            const data = await ApiCart.clearCart()
            if (data.result) {
                alertMessage('Carrinho limpo', data.message)
                return true
            } else
                alertMessage('Falha ao limpar', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao limpar', err)
        }
        return false
    }

    async addSingleToCart(singleId) {
        try {
            const data = await ApiCart.addSingleToCart(singleId)
            if (data.result) {
                alertMessage('Item adicionado', data.message)
                return true
            } else
                alertMessage('Falha ao adicionar', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao adicionar', err)
        }
        return false
    }

    async addPackageToCart(packageId) {
        try {
            const data = await ApiCart.addPackageToCart(packageId)
            if (data.result) {
                alertMessage('Item adicionado', data.message)
                return true
            } else
                alertMessage('Falha ao adicionar', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao adicionar', err)
        }
        return false
    }

    async purchaseCart() {
        try {
            const data = await ApiCart.purchaseCart()
            if (data.result) {
                alertMessage('Compra realizada', data.message)
                return true
            } else
                alertMessage('Falha ao comprar', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao comprar', err)
        }
        return false
    }
}