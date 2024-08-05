import { User } from "../models/user-model.js"
import { Cookies } from "../helpers/cookie-helper.js"
import { alertMessage } from "../helpers/alert-helper.js"
import { ApiAuth } from "../api/auth-routes.js"

export class UserController {
    constructor() {
        this.user = ''
        this.retrieveCookie()
    }
 
    async login(username, password) {
        // Client side check
        let check = this.checkLogin(username, password)
        if (!check.result) {
            alertMessage('Falha no login', check.message)
            return false
        } 
        
        // Server side check
        const data = await ApiAuth.login(username, password)
        if (data && data.result) {
            this.user = new User(data.user.userId, data.user.username)
            this.user.setJwt(data.user.jwt)
            
            this.user.setName(data.user.name)
            this.user.setEmail(data.user.email)
            this.user.setCellPhone(data.user.cellPhone) 
            this.user.setGender(data.user.gender) 
            this.user.setBirthYear(data.user.birthYear) 
            this.user.setBirthMonth(data.user.birthMonth)
            this.user.setBirthDay(data.user.birthDay)

            if (this.user.getJwt) {
                this.user.setLogged(true)
                alertMessage('Login realizado', 'Usuário conectado com sucesso')
                this.saveCookie()
                return true
            } else {
                alertMessage('Falha no login', 'Token de usuário não registrado')
            }
        } else if (data && !data.result)
            alertMessage('Falha no login', data.message)
        else 
            alertMessage('Falha no login', 'Não foi possível conectar com o servidor')
        return false
    }

    async logout() {
        const data = await ApiAuth.logout(this.user.userId, this.user.jwt)
        this.deleteCookie()
        this.user = ''
        this.checkUser()
        if (data && data.result) {
            alertMessage('Logout', data.message)
            return true
        } else if (data && !data.result)
            alertMessage('Falha no logout', data.message)
        else
            alertMessage('Falha no logout', 'Não foi possível conectar com o servidor')
        return false
    }

    async register(username, password, confirmPassword, email, cellPhone) {
        // Client side check
        let check = this.checkRegister(username, password, confirmPassword, email, cellPhone)
        if (!check.result) {
            alertMessage('Falha no registro', check.message)
            return false
        }

        // Server side check
        const data = await ApiAuth.register(username, password, confirmPassword, email, cellPhone)
        if (data && data.result) {
            alertMessage('Registrado', data.message)
            return true
        } else if (data && !data.result)
            alertMessage('Falha no registro', data.message)
        else
            alertMessage('Falha no registro', 'Não foi possível conectar com o servidor')
        return false
    }

    async changePassword(password, newPassword) {
        // Client side check
        let check = this.checkChangePassword(password, newPassword)
        if (!check.result) {
            alertMessage('Falha ao alterar senha', check.message)
            return false
        }

        // Server side check
        const data = await ApiAuth.changePassword(this.username, password, newPassword, this.user.userId, this.user.jwt)
        if (data && data.result) {
            alertMessage('Senha alterada', data.message)
            return true
        } else if (data && !data.result)
            alertMessage('Falha ao alterar senha', data.message)
        else
            alertMessage('Falha ao alterar senha', 'Não foi possível conectar com o servidor')
        return false
    }

    async updatePreferences(email, cellPhone, profileName, gender, birth) {
        // Client side check
        let check = this.checkUpdatePreferences(email, cellPhone, profileName, gender, birth)
        if (!check.result) {
            alertMessage('Falha ao atualizar preferências', check.message)
            return false
        }

        // Server side check
        const data = await ApiAuth.updatePreferences(email, cellPhone, profileName, gender, birth, this.user.userId, this.user.jwt)
        if (data && data.result) {
            alertMessage('Preferências atualizadas', data.message)
            return true
        } else if (data && !data.result)
            alertMessage('Falha ao atualizar preferências', data.message)
        else
            alertMessage('Falha ao atualizar preferências', 'Não foi possível conectar com o servidor')
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
            this.user = new User(cookieObj.userId, cookieObj.username)
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

    checkLogin(username, password) {
        if (username == '' || password == '')
            return {result: false, message: 'Nome de usuário ou senha em branco'}
        return {result: true}
    }

    checkRegister(username, password, confirmPassword, email, cellPhone) {
        if (username == '' || password == '')
            return {result: false, message: 'Nome de usuário ou senha em branco'}
        if (password != confirmPassword)
            return {result: false, message: 'Confirmação de senha não condiz com senha digitada'}
        if (email == '' || cellPhone == '')
            return {result: false, message: 'Pelo menos uma informação de contato deve ser fornecida'}
        if (!this.validCheckUsername(username))
            return {result: false, message: 'Nome de usuário inválido'}
        if (!this.validCheckPassword(password))
            return {result: false, message: 'Senha inválida'}
        if (!this.validCheckEmail(email) && email != '')
            return {result: false, message: 'E-mail inválido'}
        if (!this.validCheckPhone(cellPhone) && cellPhone != '')
            return {result: false, message: 'Número de telefone inválido'}
        return {result: true}
    }

    checkChangePassword(password, newPassword) {
        if (!this.validCheckPassword(newPassword))
            return {result: false, message: 'Nova senha inválida'}
        return {result: true}
    }

    checkUpdatePreferences(email, cellPhone, profileName, gender, birth) {
        if (!this.validCheckEmail(email) && email != '')
            return {result: false, message: 'E-mail inválido'}
        if (!this.validCheckPhone(cellPhone) && cellPhone != '')
            return {result: false, message: 'Número de telefone inválido'}
        if (!this.validCheckName(profileName) && profileName != '')
            return {result: false, message: 'Nome pode conter apenas caracteres alfabéticos'}
        if (!this.validCheckGender(gender) && gender != '')
            return {result: false, message: 'Gênero inválido'}
        if (!this.validCheckBirth(birth) && birth != '')
            return {result: false, message: 'Data de nascimento inválida'}
        return {result: true}
    }

    validCheckUsername(username) {
        let regex = /[a-zA-Z0-9]{4,15}/
        return regex.test(username)
    }

    validCheckPassword(password) {
        let regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
        return regex.test(password)
    }

    validCheckEmail(email) {
        let regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
        return regex.test(email)
    }

    validCheckPhone(phone) {
        let regex = /\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}/
        return regex.test(phone)
    }

    validCheckName(name) {
        let regex = /[a-zA-Z]+/
        return regex.test(name)
    }

    validCheckGender(gender) {
        let regex = /(masculino|feminino)/
        return regex.test(gender)
    }

    validCheckBirth(birth) {
        return true
        return false
    }
}