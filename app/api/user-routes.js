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
            return false
        
        if (response.ok) {
            let userId = data.userId
            let username = data.username
            let jwt = data.jwt
            let preferences = data.preferences
            return {result: true, user: {userId: userId, username: username, jwt: jwt, preferences: preferences}}
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
            return false

        let message = data.message
        if (response.ok)
            return {result: true, message: message}
        else
            return {result: false, message: message}
    }

    static async register(username, password, confirmPassword, email, cellPhone) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password, confirmPassword, email, cellPhone })
        })
        const data = await response.json()

        if (!data)
            return false

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
            return false

        let message = data.message
        if (response.ok)
            return {result: true, message: message}
        else
            return {result: false, message: message}
    }

    static async updatePreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/update-preferences`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt })
        })
        const data = await response.json()

        if (!data)
            return false

        let message = data.message
        if (response.ok)
            return {result: true, message: message}
        else
            return {result: false, message: message}
    }
}
