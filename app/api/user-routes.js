import { BACKEND } from "./routes.js"

const BASE_ROUTE = '/user'
export class ApiUser {
    static async login(username, password) {
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
            let jwt = data.jwt
            let name = data.name
            let email = data.email
            let phone = data.phone
            let gender = data.gender
            let birth = data.birth
            return {result: true, user: {userId: userId, username: username, jwt: jwt, name: name, email: email, phone: phone, gender: gender, birth: birth}}
        } else {
            let message = data.message  
            return {result: false, message: message}
        }
    }
    
    static async logout(userId, jwt) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, jwt })
        })
        const data = await response.json()

        if (!data)
            return {result: false, message: 'Não foi possível conectar com o servidor'}

        let message = data.message
        if (response.ok)
            return {result: true, message: message}
        else
            return {result: false, message: message}
    }

    static async register(username, password, confirmPassword, email, phone) {
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
    }

    static async changePassword(username, password, newPassword, userId, jwt) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/change-password`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password, newPassword, userId, jwt })
        })
        const data = await response.json()

        if (!data)
            return {result: false, message: 'Não foi possível conectar com o servidor'}

        let message = data.message
        if (response.ok)
            return {result: true, message: message}
        else
            return {result: false, message: message}
    }

    static async updatePreferences(email, phone, name, gender, birth, userId, jwt) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/update-preferences`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, phone, name, gender, birth, userId, jwt })
        })
        const data = await response.json()

        if (!data)
            return {result: false, message: 'Não foi possível conectar com o servidor'}

        if (response.ok) {
            let userId = data.userId
            let username = data.username
            let jwt = data.jwt
            let name = data.name
            let email = data.email
            let phone = data.phone
            let gender = data.gender
            let birth = data.birth
            return {result: true, user: {userId: userId, username: username, jwt: jwt, name: name, email: email, phone: phone, gender: gender, birth: birth}}
        } else {
            let message = data.message  
            return {result: false, message: message}
        }
    }
}
