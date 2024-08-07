import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"
import { validateHelper } from "../helpers/validate-helper.js"

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

        this.userRegisterNameRules = document.getElementById('userRegisterNameRules')
        this.userRegisterPasswordRules = document.getElementById('userRegisterPasswordRules')
        this.userRegisterPhoneRules = document.getElementById('userRegisterPhoneRules')

        this.userRegisterFailMessage = document.getElementById('userRegisterFailMessage')

        this.registerSubmitButton = document.getElementById('registerSubmitButton')
        this.registerSubmitButton.disabled = true

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

        this.userRegisterName.addEventListener('focusin', () => {
            this.userRegisterNameRules.classList.remove('element-hidden') 
        })

        this.userRegisterPassword.addEventListener('focusin', () => {
            this.userRegisterPasswordRules.classList.remove('element-hidden') 
        })

        this.userRegisterPhone.addEventListener('focusin', () => {
            this.userRegisterPhoneRules.classList.remove('element-hidden') 
        })

        this.userRegisterName.addEventListener('focusout', () => {
            this.userRegisterNameRules.classList.add('element-hidden') 
        })

        this.userRegisterPassword.addEventListener('focusout', () => {
            this.userRegisterPasswordRules.classList.add('element-hidden') 
        })

        this.userRegisterPhone.addEventListener('focusout', () => {
            this.userRegisterPhoneRules.classList.add('element-hidden') 
        })

        this.userRegisterName.addEventListener('input', () => this.enableRegister())
        this.userRegisterPassword.addEventListener('input', () => this.enableRegister())
        this.userRegisterConfirmPassword.addEventListener('input', () => this.enableRegister())
        this.userRegisterEmail.addEventListener('input', () => this.enableRegister())
        this.userRegisterPhone.addEventListener('input', () => this.enableRegister())
    }

    enableRegister() {
        if(
            validateHelper.checkName(this.userRegisterName.value)
            && validateHelper.checkPassword(this.userRegisterPassword.value)
            && (this.userRegisterConfirmPassword.value != '')
            && (validateHelper.checkEmail(this.userRegisterEmail.value) || validateHelper.checkPhone(this.userRegisterPhone.value))
        )
            this.registerSubmitButton.disabled = false
        else
        this.registerSubmitButton.disabled = true
    }
}