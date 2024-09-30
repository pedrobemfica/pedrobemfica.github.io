export class Cart {
    constructor() {
        this._cartList = []
    }

    get cartList() {
        return [].concat(this._cartList)
    }

    addToCart(product) {
        let targetObj = this._cartList.find(obj => obj.product == product)
        if (!targetObj) {
            this._cartList.push(product)
        } else
            targetObj.quantity += 1
        return true
    }

    clearCart() {
        this._cartList = []
    }
}