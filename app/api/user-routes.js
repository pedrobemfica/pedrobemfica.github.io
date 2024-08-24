import { BACKEND } from "./routes.js"
import { Cookies } from "../helpers/cookie-helper.js"

const BASE_ROUTE = '/user'
export class ApiUser {
    static async login(username, password) {
        try {
            console.log(`Trying at ${BACKEND}${BASE_ROUTE}/login`)
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true,
                    user: {
                        userId: data.userId, 
                        username: data.username, 
                        name: data.name, 
                        email: data.email, 
                        phone: data.phone, 
                        gender: data.gender, 
                        birth: data.birth, 
                        jwt: data.jwt
                    }}
            else
                return {result: false, message: data.message}
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }
    
    static async logout() {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/logout`, {
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

    static async register(username, password, confirmPassword, email, phone) {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password, confirmPassword, email, phone })
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

    static async changePassword(password, confirmPassword) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/change-password`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ password, confirmPassword })
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

    static async requestNewPassword(username) {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/new-password`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username })
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

    static async updatePreferences(email, phone, name, gender, birth) {
        const token = Cookies.getCookie('jwt')
        try {        
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/update-preferences`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ email, phone, name, gender, birth })
            })
            const data = await response.json()

            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
    
            if (response.ok)
                return {result: true, 
                    user: {
                        userId: data.userId, 
                        username: data.username, 
                        name: data.name, 
                        email: data.email, 
                        phone: data.phone, 
                        gender: data.gender, 
                        birth: data.birth
                    }}
            else 
                return {result: false, message: data.message}
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }
}
