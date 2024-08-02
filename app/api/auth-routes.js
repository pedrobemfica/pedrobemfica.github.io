import { BACKEND } from "./routes.js"

export class ApiAuth {

    static async login(username, password) {
        fetch(`${BACKEND}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                const data = response.json()
                let userId = data.userId
                let userName = data.userName
                let jwt = data.jwt
                let preferences = data.preferences
                return {userId: userId, userName: userName, jwt: jwt, preferences: preferences}
            }
        })
        .catch(err => console.log(`unable to fetch data from server with error = ${err}`))         
        return false
    }
    
    static async logout(userId, jwt) {
        fetch(`${BACKEND}/auth/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, jwt })
        })
        .then(response => {
            if (response.ok)
                return true
        })
        .catch(err => console.log(`unable to fetch data from server with error = ${err}`)) 
        return false
    }

    static async register(userName, password, confirmPassword, email, cellPhone) {
        fetch(`${BACKEND}/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName, password, confirmPassword, email, cellPhone })
        })
        .then(response => {
            if (response.ok) {
                const data = response.json()
                let userId = data.userId
                let userName = data.userName
                let jwt = data.jwt
                let preferences = data.preferences
                return {userId: userId, userName: userName, jwt: jwt, preferences: preferences}
            }
        })
        .catch(err => console.log(`unable to fetch data from server with error = ${err}`))
        return false
    }

    static async changePassword(userName, password, newPassword, userId, jwt) {
        fetch(`${BACKEND}/auth/change-password`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName, password, newPassword, userId, jwt })
        })
        .then(response => {
            if (response.ok)
                return true
        })
        .catch(err => console.log(`unable to fetch data from server with error = ${err}`))
        return false
    }

    static async updatePreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt) {
        fetch(`${BACKEND}/auth/update-preferences`, {
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
