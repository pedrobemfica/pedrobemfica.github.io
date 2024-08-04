import { BACKEND } from "./routes.js"

const BASE_ROUTE = '/auth'
export class ApiAuth {


    static async login(username, password) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        
        if (response.ok) {
            let userId = data.userId
            let username = data.username
            let jwt = data.jwt
            let preferences = data.preferences
            return {userId: userId, username: username, jwt: jwt, preferences: preferences}
        } else {
            console.log(`unable to fetch data from server`)
            return false
        }
    }
    
    static async logout(userId, jwt) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, jwt })
        })
        const data = await response.json()

        if (response.ok) {
            let message = data.message
            return {result: true, message: message}
        } else {
            console.log(`unable to fetch data from server`)
            return false
        }
    }

    static async register(username, password, confirmPassword, email, cellPhone) {
        const response = await fetch(`${BACKEND}${BASE_ROUTE}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password, confirmPassword, email, cellPhone })
        })
        const data = await response.json()

        if (response.ok) {
            let userId = data.userId
            let username = data.username
            let jwt = data.jwt
            let preferences = data.preferences
            return {userId: userId, username: username, jwt: jwt, preferences: preferences}
        } else {
            console.log(`unable to fetch data from server`)
            return false
        }
    }

    static async changePassword(username, password, newPassword, userId, jwt) {
        const response = fetch(`${BACKEND}${BASE_ROUTE}/change-password`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password, newPassword, userId, jwt })
        })
        const data = await response.json()

        if (response.ok) {
            let message = data.message
            return {result: true, message: message}
        } else {
            console.log(`unable to fetch data from server`)
            return false
        }
    }

    static async updatePreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt) {
        fetch(`${BACKEND}${BASE_ROUTE}/update-preferences`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt })
        })
        .then(response => {
            if (response.ok)
                return true
        })
        .catch(err => console.log(`unable to fetch data from server with error = ${err}`))
        return false
    }
}
