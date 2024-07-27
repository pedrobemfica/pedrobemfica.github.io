import { UserController } from "../controllers/user-controller.js"

export class RegisterView {
    constructor() {
        this.userController = new UserController()

        this.userRegisterForm = document.getElementById('userRegisterForm')
        this.userRegisterName = document.getElementById('userRegisterName')
        this.userRegisterPassword = document.getElementById('userRegisterPassword')
        this.userRegisterConfirmPassword = document.getElementById('userRegisterConfirmPassword')
        this.userRegisterEmail = document.getElementById('userRegisterEmail')
        this.userRegisterPhone = document.getElementById('userRegisterPhone')

        this.userRegisterFailMessage = document.getElementById('userRegisterFailMessage')

        this.userRegisterForm.addEventListener('submit', event => {
            event.preventDefault()
            if (this.userController.register(
                    this.userRegisterName.value, 
                    this.userRegisterPassword.value, 
                    this.userRegisterConfirmPassword.value,
                    this.userRegisterEmail.value,
                    this.userRegisterPhone.value
                )) {
                if (this.userController.login(this.userRegisterName.value, this.userRegisterPassword.value)) {
                    this.userRegisterFailMessage.classList.add('element-hidden')
                    bootstrap.Modal.getInstance('#staticModal').hide()
                } else
                    this.userRegisterFailMessage.classList.remove('element-hidden') 
            } else 
                this.userRegisterFailMessage.classList.remove('element-hidden')
        })
    }
}