import { SERVICES } from "./entities.js"

export class Cart {
    constructor(userId, cartList = []) {
        this.userId = userId
        this.cartList = cartList
    }

    get getUserId() {
        return this.userId
    }

    get getCartList() {
        return [].concat(this.cartList)
    }

    addToCart(service) {
        if (service in SERVICES) {
            let targetObj = this.cartList.find(obj => obj.service == service)
            if (!targetObj) {
                newObj = {service: service, quantity: 1}
                this.cartList.push(newObj)
            } else
                targetObj.quantity += 1
            return true
        } 
        return false
    }

    reduceFromCart(service) {
        if (service in SERVICES) {
            let targetObj = this.cartList.find(obj => obj.service === service)
            if (targetObj)
                targetObj.quantity -= 1
            else
                return false
            if (targetObj.quantity <= 0) {
                let index = this.cartList.findIndex(obj => obj.service === service)
                this.cartList.splice(index, 1)
            }
            return true
        } 
        return false
    }

    removeFromCart(service) {
        if (service in SERVICES) {
            let targetObj = this.cartList.find(obj => obj.service === service)
            if (targetObj) {
                let index = this.cartList.findIndex(obj => obj.service === service)
                this.cartList.splice(index, 1)
                return true
            }
        } 
        return false
    }
}