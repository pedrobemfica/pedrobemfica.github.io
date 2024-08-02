import { User } from "../models/user-model.js"
import { Cookies } from "../helpers/cookie-helper.js"
import { alertMessage } from "../helpers/alert-helper.js"
import { ApiAuth } from "../api/auth-routes.js"

export class UserController {
    constructor() {
        this.user = ''
        this.retrieveCookie()
    }
 
    async login(userName, password) {
        ApiAuth.login(userName, password)
        .then(data => {
            if (data) {
                this.user = new User(data.userId, data.userName)
                this.user.setJwt(data.jwt)
                
                this.user.setName(data.name)
                this.user.setEmail(data.email)
                this.user.setCellPhone(data.cellPhone) 
                this.user.setGender(data.gender) 
                this.user.setBirthYear(data.birthYear) 
                this.user.setBirthMonth(data.birthMonth)
                this.user.setBirthDay(data.birthDay)
    
                this.user.setLogged(false)
    
                if (this.user.getJwt) {
                    this.user.setLogged(true)
                    alertMessage('loginSuccess')
                    this.saveCookie()
                    return true
                }
            }
        })
        alertMessage('loginFail')
        return false
    }

    async logout() {
        ApiAuth.logout(this.user.userId, this.user.jwt)
        .then(data => {
            if (data) {
                this.deleteCookie()
                this.user = ''
                this.checkUser()
                alertMessage('logoutSuccess')
                return true
            }
        })
        alertMessage('logoutFail')
        return false
    }

    async register(userName, password, confirmPassword, email, cellPhone) {
        ApiAuth.register(userName, password, confirmPassword, email, cellPhone)
        .then(data => {
            if (data) {
                alertMessage('registerSuccess')
                return true
            }
        })
        alertMessage('registerFail')
        return false
    }

    async changePassword(password, newPassword) {
        ApiAuth.changePassword(this.userName, password, newPassword, this.user.userId, this.user.jwt)
        .then(data => {
            if (data) {
                alertMessage('changePasswordSuccess')
                return true
            }
        })
        alertMessage('changePasswordFail')
        return false
    }

    async updatePreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth) {
        ApiAuth.updatePreferences(
            userProfileEmail,
            userProfilePhone,
            userProfileName,
            userProfileGender,
            userProfileBirth,
            this.user.userId,
            this.user.jwt
        )
        .then(data => {
            if (data) {
                alertMessage('updatePreferencesSuccess')
                return true
            }
        })
        alertMessage('updatePreferencesFail')
        return false
    }

    checkUser() {
        this.retrieveCookie()
        if (Cookies.getCookie('user') && this.user.getLogged) {
            return this.user
        }
        return false
    }

    retrieveCookie() {
        if (Cookies.getCookie('user')) {
            let cookieObj = JSON.parse(Cookies.getCookie('user'))
            this.user = new User(cookieObj.userId, cookieObj.userName)
            this.user.setJwt(cookieObj.jwt)

            this.user.setName(cookieObj.name)
            this.user.setEmail(cookieObj.email)
            this.user.setCellPhone(cookieObj.cellPhone) 
            this.user.setGender(cookieObj.gender) 
            this.user.setBirthYear(cookieObj.birthYear) 
            this.user.setBirthMonth(cookieObj.birthMonth)
            this.user.setBirthDay(cookieObj.birthDay)

            if (this.user.getJwt)
                this.user.setLogged(true)
        } else
            return false
    }

    saveCookie() {
        let cookieObj = this.user
        Cookies.createCookie('user', JSON.stringify(cookieObj))    
    }

    deleteCookie() {
        Cookies.deleteCookie('user', '') 
    }
}