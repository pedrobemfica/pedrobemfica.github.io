import { BACKEND } from "./routes.js"
import { Cookies } from "../helpers/cookie-helper.js"

const BASE_ROUTE = '/cart'
export class ApiCart {

    static async listCart() {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/list`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, list: data.list}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async addSingleToCart(serviceId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/add-single`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ serviceId })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok)
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async addPackageToCart(packageId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/add-package`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ packageId })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok)
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async deleteFromCart(itemId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/delete`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ itemId })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok)
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async clearCart() {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/clear`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async purchaseCart() {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/purchase`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }
}