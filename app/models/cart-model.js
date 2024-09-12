export class Cart {
    constructor() {
        this._cartList = []
    }

    get cartList() {
        return [].concat(this._cartList)
    }

    addToCart(product) {
        if (this.checkProduct(product)) {
            let targetObj = this._cartList.find(obj => obj.product == product)
            if (!targetObj) {
                this._cartList.push(product)
            } else
                targetObj.quantity += 1
            return true
        }
        return false
    }

    reduceFromCart(product) {
        if (this.checkProduct(product)) {
            let targetObj = this._cartList.find(obj => obj.product === product)
            if (targetObj)
                targetObj.quantity -= 1
            else
                return false
            if (targetObj.quantity <= 0)
                this.removeFromCart(product)
            return true
        }
        return false
    }

    removeFromCart(product) {
        if (this.checkProduct(product)) {
            let targetObj = this._cartList.find(obj => obj.product === product)
            if (targetObj) {
                let index = this._cartList.findIndex(obj => obj.product === product)
                this._cartList.splice(index, 1)
                return true
            }
        }
        return false
    }

    checkProduct(product) {
        // Check if product meet the criteria
        return true
        return false
    }

    clearCart() {
        this._cartList = []
    }
}