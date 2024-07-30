export class ApiAuthentication {

    static async login(username, password) {
        const response = await fetch('backend/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })           
        if (response.ok) {
            const data = await response.json()
            let userId = data.userId
            let userName = data.userName
            let jwt = data.jwt
            let preferences = data.preferences
            return {userId: userId, userName: userName, jwt: jwt, preferences: preferences}
        } else 
            return false
    }
    
    static async logout(userId, jwt) {
        const response = await fetch('backend/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId, jwt })
        })
        if (response.ok)
            return true
        else
            return false
    }

    static async register(userName, password, confirmPassword, email, cellPhone) {
        const response = await fetch('backend/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName, password, confirmPassword, email, cellPhone })
        })
        if (response.ok) {
            const data = await response.json()
            let userId = data.userId
            let userName = data.userName
            let jwt = data.jwt
            let preferences = data.preferences
            return {userId: userId, userName: userName, jwt: jwt, preferences: preferences}
        } else 
            return false
    }

    static async changePassword(userName, password, newPassword, userId, jwt) {
        const response = await fetch('backend/auth/change-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userName, password, newPassword, userId, jwt })
        })
        if (response.ok)
            return true
        else
            return false
    }

    static async updatePreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt) {
        const response = await fetch('backend/auth/update-preferences', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt })
        })
        if (response.ok)
            return true
        else
            return false
    }

}
