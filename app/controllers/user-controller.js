import { User } from "../models/user-model.js"
import { Cookies } from "../helpers/cookie-helper.js"
import { alertMessage } from "../helpers/alert-helper.js"
import { ApiUser } from "../api/user-routes.js"
import { validateHelper } from "../helpers/validate-helper.js"

export class UserController {
    constructor() {
        this.user = ''
        this.retrieveCookieUser()
    }
 
    async login(username, password) {
        // Client side check
        let check = this.checkLogin(username, password)
        if (!check.result) {
            alertMessage('Falha no login', check.message)
            return false
        } 
        
        // Server side check
        try {
            const data = await ApiUser.login(username, password)
            if (data.result) {
                this.user = new User(data.user.userId, data.user.username)
        
                this.user.setName(data.user.name)
                this.user.setEmail(data.user.email)
                this.user.setPhone(data.user.phone) 
                this.user.setGender(data.user.gender) 
                this.user.setBirth(data.user.birth) 

                if(data.user.jwt) {
                    alertMessage('Login realizado', 'Usuário conectado com sucesso')
                    this.saveCookieUser()
                    this.saveCookieJwt(data.user.jwt)
                    return true
                } else
                    alertMessage('Falha no login', 'Falha no token de autenticação')
            } else
                alertMessage('Falha no login', data.message)  
        } catch(err) {
            console.log(err)
            alertMessage('Falha no login', err)
        }
        return false
    }

    async logout() {
        try {
            const data = await ApiUser.logout()
            if (data.result) {
                alertMessage('Logout', data.message)
                return true
            } else 
                alertMessage('Falha no logout', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no logout', err)
        } finally {
            this.deleteCookieUser()
            this.deleteCookieJwt()
            this.user = ''
            this.checkUser()
        }
        return false
    }

    async register(username, password, confirmPassword, email, phone) {
        // Client side check
        let check = this.checkRegister(username, password, confirmPassword, email, phone)
        if (!check.result) {
            alertMessage('Falha no registro', check.message)
            return false
        }

        // Server side check
        try {
            const data = await ApiUser.register(username, password, confirmPassword, email, phone)
            if (data.result) {
                alertMessage('Registrado', data.message)
                return true
            } else 
                alertMessage('Falha no registro', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no registro', err)
        }
        return false
    }

    async changePassword(password, confirmPassword) {
        // Client side check
        let check = this.checkChangePassword(password, confirmPassword)
        if (!check.result) {
            alertMessage('Falha ao alterar senha', check.message)
            return false
        }

        // Server side check
        try {
            const data = await ApiUser.changePassword(password, confirmPassword)
            if (data.result) {
                alertMessage('Senha alterada', data.message)
                return true
            } else
                alertMessage('Falha ao alterar a senha', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no alterar a senha', err)
        }
        return false
    }

    async requestNewPassword(username) {
        try {
            const data = await ApiUser.requestNewPassword(username)
            if (data.result) {
                alertMessage('Senha alterada', data.message)
                return true
            } else
                alertMessage('Falha ao solicitar nova senha', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no solicitar nova senha', err)
        }
        return false
    }

    async updatePreferences(email, phone, name, gender, birth) {
        // Client side check
        let check = this.checkUpdatePreferences(email, phone, name, gender, birth)
        if (!check.result) {
            alertMessage('Falha ao atualizar preferências', check.message)
            return false
        }

        // Server side check
        try {
            const data = await ApiUser.updatePreferences(email, phone, name, gender, birth)
            
            if (data.result) {
                this.user = new User(data.user.userId, data.user.username)
                
                this.user.setName(data.user.name)
                this.user.setEmail(data.user.email)
                this.user.setPhone(data.user.phone) 
                this.user.setGender(data.user.gender) 
                this.user.setBirth(data.user.birth) 

                alertMessage('Preferências atualizadas', 'Informações atualizadas com sucesso')
                this.saveCookieUser()
                    return true
            } else
                alertMessage('Falha ao atualizar preferências', data.message)    
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao atualizar preferências', err)
        }
        return false
    }

    checkUser() {
        this.retrieveCookieUser()
        if (Cookies.getCookie('user'))
            return this.user
        return false
    }

    retrieveCookieUser() {
        if (Cookies.getCookie('user')) {
            let cookieObj = JSON.parse(Cookies.getCookie('user'))
            this.user = new User(cookieObj.userId, cookieObj.username)

            this.user.setName(cookieObj.name)
            this.user.setEmail(cookieObj.email)
            this.user.setPhone(cookieObj.phone) 
            this.user.setGender(cookieObj.gender) 
            this.user.setBirth(cookieObj.birth) 
        } else
            return false
    }

    saveCookieUser() {
        let cookieObj = {
            userId: this.user.userId,
            username: this.user.username,
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
            gender: this.user.gender,
            birth: this.user.birth
        }
        Cookies.createCookie('user', JSON.stringify(cookieObj), 90)    
    }

    deleteCookieUser() {
        Cookies.deleteCookie('user', '') 
    }

    saveCookieJwt(jwt) {
        Cookies.createCookie('jwt', JSON.stringify(jwt))
    }

    deleteCookieJwt() {
        Cookies.deleteCookie('jwt', '') 
    }

    checkLogin(username, password) {
        if (username == '' || password == '')
            return {result: false, message: 'Nome de usuário ou senha em branco'}
        return {result: true}
    }

    checkRegister(username, password, confirmPassword, email, phone) {
        if (username == '' || password == '')
            return {result: false, message: 'Nome de usuário ou senha em branco'}
        if (password != confirmPassword)
            return {result: false, message: 'Confirmação de senha não condiz com senha digitada'}
        if (email == '' && phone == '')
            return {result: false, message: 'Pelo menos uma informação de contato deve ser fornecida'}
        if (!validateHelper.checkUsername(username))
            return {result: false, message: 'Nome de usuário inválido'}
        if (!validateHelper.checkPassword(password))
            return {result: false, message: 'Senha inválida'}
        if (!validateHelper.checkEmail(email) && email != '')
            return {result: false, message: 'E-mail inválido'}
        if (!validateHelper.checkPhone(phone) && phone != '')
            return {result: false, message: 'Número de telefone inválido'}
        return {result: true}
    }

    checkChangePassword(password, confirmPassword) {
        if (confirmPassword == '' || password == '')
            return {result: false, message: 'Senha ou confirmação em branco'}
        if (password != confirmPassword)
            return {result: false, message: 'Confirmação de senha não condiz com senha digitada'}
        if (!validateHelper.checkPassword(password))
            return {result: false, message: 'Nova senha inválida'}
        return {result: true}
    }

    checkUpdatePreferences(email, phone, name, gender, birth) {
        if (!validateHelper.checkEmail(email) && email != '')
            return {result: false, message: 'E-mail inválido'}
        if (!validateHelper.checkPhone(phone) && phone != '')
            return {result: false, message: 'Número de telefone inválido'}
        if (!validateHelper.checkName(name) && name != '')
            return {result: false, message: 'Nome pode conter apenas caracteres alfabéticos'}
        if (!validateHelper.checkGender(gender) && gender != '')
            return {result: false, message: 'Gênero inválido'}
        if (!validateHelper.checkDate(birth) && birth != '')
            return {result: false, message: 'Data de nascimento inválida'}
        return {result: true}
    }
}