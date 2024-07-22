import { routes } from "../api/routes.js"
import { Cookies } from "../helpers/cookie-helper.js"

export class User {
    constructor() {
        this.logged = false
        this.userId = ''
        this.userName = ''
        this.jwt = ''

        this.preferences = {
            name: '',
            email: '',
            cellPhone: '',

            gender: '',
            birthYear: null,
            birthMonth: null,
            birthDay: null
        }

        this.retrieveCookie()
        this.saveCookie()
    }

    saveCookie() {
        let cookieObj = {
            userId: this.userId,
            userName: this.userName,
            jwt: this.jwt,
            preferences: this.preferences
        }
        this.createCookie('user', JSON.stringify(cookieObj))    
    }

    retrieveCookie() {
        if (this.getCookie('user')) {

        }
    }
 
    login(userName, password) {
        let data = routes.loginUser(userName, password)
        if (data) {
            this.jwt = data.jwt
            this.userId = data.userId
            this.preferences = data.preferences
            this.saveCookie()
            return true
        } else
            return false
    }

    changePassword(password, newPassword) {
        let data = routes.changeUserPassword(this.userName, password, newPassword, this.jwt)
        if (data)
            return true
        return false
    }

    set setName(name) {
        const regexValidation = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (regexValidation.test(name)) {
            this.name = name
            return true
        }
        return false
    }

    get getName() {
        return this.name
    }

    set setEmail(email) {
        const regexValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (regexValidation.test(email)) {
            this.email = email
            return true
        }
        return false
    }

    get getEmail() {
        return this.email
    }

    set setCellPhone(cellPhone) {
        const regexValidation = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/
        if (regexValidation.test(cellPhone)) {
            this.cellPhone = cellPhone
            return true
        }
        return false
    }

    get getCellPhone() {
        return this.cellPhone
    }

    set setGender(gender) {
        const regexValidation = /masculino|feminino/
        if (regexValidation.test(gender)) {
            this.gender = gender
            return true
        }
        return false
    }

    get getGender() {
        return this.gender;
    }

    set setBirth({year, month, day}) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        if (
            year > 1900 &&
            year < currentYear &&
            month >= 1 &&
            month <= 12 &&
            day >= 1 &&
            day <= 31
        ) {
            this.birthYear = year;
            this.birthMonth = month;
            this.birthDay = day;
            return true;
        }
        return false;
    }

    get getBirthString() {
        let dateString = `${("0" + this.birthDay).slice(-2)}/${("0" + this.birthMonth).slice(-2)}/${("000" + this.birthYear).slice(-4)}`;
        return dateString;
    }
}