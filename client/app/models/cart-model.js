export class Cart {
    constructor(userId) {
        this.userId = userId
        this.cartList = []
    }

    get getUserId() {
        return this.userId
    }

    get getCartList() {
        return [].concat(this.cartList)
    }

    addToCart(product) {
        if (this.checkProduct(product)) {
            let targetObj = this.cartList.find(obj => obj.product == product)
            if (!targetObj) {
                newObj = {product: product, quantity: 1}
                this.cartList.push(newObj)
            } else
                targetObj.quantity += 1
            return true
        }
        return false
    }

    reduceFromCart(product) {
        if (this.checkProduct(product)) {
            let targetObj = this.cartList.find(obj => obj.product === product)
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
            let targetObj = this.cartList.find(obj => obj.product === product)
            if (targetObj) {
                let index = this.cartList.findIndex(obj => obj.product === product)
                this.cartList.splice(index, 1)
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
}