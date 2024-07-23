import { UserController } from "../controllers/user-controller.js"

export class RegisterView {
    constructor() {
        this.userController = new UserController()

        this.userRegisterForm = document.getElementById('userRegisterForm')
        this.userRegisterName = document.getElementById('userRegisterName')
        this.userRegisterPassword = document.getElementById('userRegisterPassword')
        this.userRegisterConfirmPassword = document.getElementById('userRegisterConfirmPassword')

        this.userRegisterFailMessage = document.getElementById('userRegisterFailMessage')

        this.userRegisterForm.addEventListener('submit', event => {
            event.preventDefault()
            if (this.userController.register(this.userRegisterName.value, this.userRegisterPassword.value, this.userRegisterConfirmPassword.value)) {
                this.userRegisterFailMessage.classList.add('element-hidden')
                document.location.href="/"
            } else 
                this.userRegisterFailMessage.classList.remove('element-hidden')
        })
    }
}