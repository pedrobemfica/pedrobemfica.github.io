import { User } from "../models/user-model.js"
import { Cookies } from "../helpers/cookie-helper.js"
import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"

export class UserController {
    constructor() {
        this.user = ''
        this.retrieveCookie()
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
 
    login(userName, password) {
        let data = routes.loginUser(userName, password)
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
                alertMessage('Login efetuado', 'Login de usuário realizado com sucesso.')
                this.saveCookie()
                return true
            }
        }
        alertMessage('Falha no login', 'Não foi possível realizar o login do usuário.')
        return false
    }

    saveCookie() {
        let cookieObj = this.user
        Cookies.createCookie('user', JSON.stringify(cookieObj))    
    }

    deleteCookie() {
        Cookies.deleteCookie('user', '') 
    }

    changePassword(password, newPassword) {
        let data = routes.changeUserPassword(this.userName, password, newPassword, this.user.userId, this.user.jwt)
        if (data) {
            alertMessage('Senha alterada', 'Senha do usuário alterada com sucesso.')
            return true
        }
        alertMessage('Senha não alterada', 'Não foi possível alterar a senha do usuário.')
        return false
    }

    checkUser() {
        this.retrieveCookie()
        if (Cookies.getCookie('user') && this.user.getLogged) {
            return this.user
        }
        return false
    }

    updatePreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth) {
        let data = routes.updateUserPreferences(
            userProfileEmail, 
            userProfilePhone, 
            userProfileName, 
            userProfileGender, 
            userProfileBirth, 
            this.user.userId, 
            this.user.jwt
        )
        if (data) {
            alertMessage('Preferências alteradas', 'Preferências do usuário alteradas com sucesso.')
            return true
        }
        alertMessage('Preferências não alteradas', 'Não foi possível alterar as preferências do usuário.')
        return false
    }

    logout() {
        alertMessage('Logout efetuado', 'Conta de usuário não está mais aberta.')
        this.deleteCookie()
        this.user = ''
        this.checkUser()
        return true
    }

    register(userName, password, confirmPassword, email, cellPhone) {
        let confirm = routes.registerUser(userName, password, confirmPassword, email, cellPhone)
        if (confirm) {
            alertMessage('Usuário registrado', 'O usuário foi registrado com sucesso.')
            return true
        }
        alertMessage('Usuário não registrado', 'Não foi possível registrar o usuário.')
        return false
    }
}


// OLD
// export function openLoginView() {}

// export function openProfileView() {}

// export function openRegistrationView() {}

// export async function userLogin(username, password){
//     const response = await fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     });
//     const result = await response.json();
//     if (response.ok) {
//         localStorage.setItem('token', result.token);
//         // #### PENDING -- Insert alert 
//         console.log('Login successful');
//     } else {
//         // #### PENDING -- Insert alert 
//         console.log('Login failed' + result.message);
//     }
// }

// // Load the Google API client library
// export async function onGoogleSignIn(googleUser) {
//     var profile = await googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId());
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());
//     // Send this data to your backend for further processing
// }

// // Initialize the Facebook SDK
// window.fbAsyncInit = function() {
//     FB.init({
//         appId      : 'YOUR_APP_ID', // Replace 'YOUR_APP_ID' with your Facebook App ID
//         cookie     : true,
//         xfbml      : true,
//         version    : 'v10.0'
//     });
//     FB.AppEvents.logPageView();   
// };

// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

// function facebookLogin() {
//     FB.login(function(response) {
//         if (response.status === 'connected') {
//             FB.api('/me', {fields: 'name,email'}, function(response) {
//                 console.log('Successful login for: ' + response.name);
//                 console.log('Email: ' + response.email);
//                 // Send this data to your backend for further processing
//             });
//         } else {
//             console.log('User cancelled login or did not fully authorize.');
//         }
//     }, {scope: 'public_profile,email'});
// }
