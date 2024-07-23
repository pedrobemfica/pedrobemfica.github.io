import { UserController } from "../controllers/user-controller.js"

export class LoginView {
    constructor() {
        this.userController = new UserController()
        
        this.userLoginForm = document.getElementById('userLoginForm')
        this.userLoginName = document.getElementById('userLoginName')
        this.userLoginPassword = document.getElementById('userLoginPassword')

        this.userLoginFailMessage = document.getElementById('userLoginFailMessage')

        this.userLoginForm.addEventListener('submit', event => {
            event.preventDefault()
            if (this.userController.login(this.userLoginName.value, this.userLoginPassword.value)) {
                this.userLoginFailMessage.classList.add('element-hidden')
                document.location.href="/"
            } else 
                this.userLoginFailMessage.classList.remove('element-hidden')
        })
        
    }
}