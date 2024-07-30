export class ApiCart {
    static async get(userId, jwt) {
        const response = await fetch('backend/cart/get', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, jwt })
        })
        if (response.ok) {
            const data = await response.json()
            let cart = data.cart
            return cart
        }
        else
            return false
    }
    
    static async add(product, userId, jwt) {
        const response = await fetch('backend/cart/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ product, userId, jwt })
        })
        if (response.ok) {
            const data = await response.json()
            let cart = data.cart
            return cart
        }
        else
            return false
    }

    static async remove(index, userId, jwt) {
        const response = await fetch('backend/cart/remove', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ index, userId, jwt })
        })
        if (response.ok) {
            const data = await response.json()
            let cart = data.cart
            return cart
        }
        else
            return false
    }

    static async clear(userId, jwt) {
        const response = await fetch('backend/cart/clear', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, jwt })
        })
        if (response.ok) 
            return true
        else
            return false
    }

}