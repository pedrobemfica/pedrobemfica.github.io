import { UserController } from "../controllers/user-controller.js"

export class LoginView {
    constructor() {
        this.userController = new UserController()
        
        this.userLoginForm = document.getElementById('userLoginForm')
        this.userLoginName = document.getElementById('userLoginName')
        this.userLoginPassword = document.getElementById('userLoginPassword')
        
        this.userLoginRegister = document.getElementById('userLoginRegister')
        this.userLoginForgot = document.getElementById('userLoginForgot')

        this.userLoginFailMessage = document.getElementById('userLoginFailMessage')

        this.userLoginForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.userController.login(this.userLoginName.value, this.userLoginPassword.value)
            if (confirmation) {
                this.userLoginFailMessage.classList.add('element-hidden')
                bootstrap.Modal.getInstance('#staticModal').hide()
                this.userController.backToHome()
            } else 
                this.userLoginFailMessage.classList.remove('element-hidden')
        })

        this.userLoginRegister.addEventListener('click', () => {
            this.applicationController.loadContent('register')
        })
        
        this.userLoginForgot.addEventListener('click', () => {
            this.applicationController.loadContent('forgotpass') 
        })
    }
}