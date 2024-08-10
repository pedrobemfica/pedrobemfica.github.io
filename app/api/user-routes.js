import { BACKEND } from "./routes.js"

const BASE_ROUTE = '/user'
export class ApiUser {
    static async login(username, password) {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) {
                let userId = data.userId
                let username = data.username
                let name = data.name
                let email = data.email
                let phone = data.phone
                let gender = data.gender
                let birth = data.birth

                let jwt = data.jwt
                return {result: true, user: {userId: userId, username: username, name: name, email: email, phone: phone, gender: gender, birth: birth, jwt: jwt}}
            } else {
                let message = data.message  
                return {result: false, message: message}
            }
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }
    
    static async logout(userId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/logout`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ userId })
            })
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
    
            let message = data.message
            if (response.ok)
                return {result: true, message: message}
            else
                return {result: false, message: message}
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
    
            let message = data.message
            if (response.ok)
                return {result: true, message: message}
            else
                return {result: false, message: message}
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async changePassword(password, newPassword, userId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/change-password`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ password, newPassword, userId })
            })
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
    
            let message = data.message
            if (response.ok)
                return {result: true, message: message}
            else
                return {result: false, message: message}
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async requestVerificationCode(username) {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/request-code`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username })
            })
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
    
            let message = data.message
            if (response.ok)
                return {result: true, message: message}
            else
                return {result: false, message: message}
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async retrievePassword(password, confirmPassword, verificationCode, username) {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/retrieve-password`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ password, confirmPassword, verificationCode, username })
            })
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
    
            let message = data.message
            if (response.ok)
                return {result: true, message: message}
            else
                return {result: false, message: message}
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async updatePreferences(email, phone, name, gender, birth, userId) {
        const token = Cookies.getCookie('jwt')
        try {        
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/update-preferences`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ email, phone, name, gender, birth, userId })
            })
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
    
            if (response.ok) {
                let userId = data.userId
                let username = data.username
                let name = data.name
                let email = data.email
                let phone = data.phone
                let gender = data.gender
                let birth = data.birth
                return {result: true, user: {userId: userId, username: username, name: name, email: email, phone: phone, gender: gender, birth: birth}}
            } else {
                let message = data.message  
                return {result: false, message: message}
            }
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }
}
