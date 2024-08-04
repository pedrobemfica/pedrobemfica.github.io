import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"

export class RegisterView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()

        this.userRegisterForm = document.getElementById('userRegisterForm')
        this.userRegisterName = document.getElementById('userRegisterName')
        this.userRegisterPassword = document.getElementById('userRegisterPassword')
        this.userRegisterConfirmPassword = document.getElementById('userRegisterConfirmPassword')
        this.userRegisterEmail = document.getElementById('userRegisterEmail')
        this.userRegisterPhone = document.getElementById('userRegisterPhone')

        this.userRegisterFailMessage = document.getElementById('userRegisterFailMessage')

        this.userRegisterForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.userController.register(
                this.userRegisterName.value, 
                this.userRegisterPassword.value, 
                this.userRegisterConfirmPassword.value,
                this.userRegisterEmail.value,
                this.userRegisterPhone.value
            )
            if (confirmation) {
                const login = await this.userController.login(this.userRegisterName.value, this.userRegisterPassword.value)
                if (login) {
                    this.userRegisterFailMessage.classList.add('element-hidden')
                    bootstrap.Modal.getInstance('#staticModal').hide()
                    this.applicationController.loadContent('home')
                } else
                    this.userRegisterFailMessage.classList.remove('element-hidden')
            } else 
                this.userRegisterFailMessage.classList.remove('element-hidden') 
        })
    }
}