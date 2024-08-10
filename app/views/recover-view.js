import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"
import { validateHelper } from "../helpers/validate-helper.js"

export class RecoverView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()

        this.codeRecoverForm = document.getElementById('codeRecoverForm')
        this.userRecoverName = document.getElementById('userRecoverName')
        this.codeSubmitButton = document.getElementById('codeSubmitButton')
        this.codeSubmitButton.disabled = true

        this.userRecoverForm = document.getElementById('userRecoverForm')
        this.userRecoverCode = document.getElementById('userRecoverCode')
        this.userRecoverPassword = document.getElementById('userRecoverPassword')
        this.userRecoverPasswordRules = document.getElementById('userRecoverPasswordRules')
        this.userRecoverConfirmPassword = document.getElementById('userRecoverConfirmPassword')
        this.generateSubmitButton = document.getElementById('generateSubmitButton')
        this.generateSubmitButton.disabled = true

        this.userRecoverFailMessage = document.getElementById('userRecoverFailMessage')

        this.codeRecoverForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.userController.requestVerificationCode(this.userRecoverName.value)
            if (confirmation) {
                this.userRecoverFailMessage.classList.add('element-hidden')
            } else 
                this.userRecoverFailMessage.classList.remove('element-hidden') 
        })

        this.userRecoverForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.userController.retrievePassword(
                this.userRecoverName.value,
                this.userRecoverPassword.value, 
                this.userRecoverConfirmPassword.value
            )
            if (confirmation) {
                this.userRecoverFailMessage.classList.add('element-hidden')
                bootstrap.Modal.getInstance('#staticModal').hide()
                this.applicationController.loadContent('home')
            } else 
                this.userRecoverFailMessage.classList.remove('element-hidden') 
        })

        this.userRecoverPassword.addEventListener('focusin', () => {
            this.userRecoverPasswordRules.classList.remove('element-hidden') 
        })

        this.userRecoverPassword.addEventListener('focusout', () => {
            this.userRecoverPasswordRules.classList.add('element-hidden') 
        })

        this.userRecoverName.addEventListener('input', () => this.enableCode())
        this.userRecoverPassword.addEventListener('input', () => this.enableRecover())
        this.userRecoverConfirmPassword.addEventListener('input', () => this.enableRecover())
    }

    enableCode() {
        if (this.userRecoverName.value != '')
            this.codeSubmitButton.disabled = false
        else
            this.codeSubmitButton.disabled = true
    }

    enableRecover() {
        if(
            (this.userRecoverName.value != '')
            && validateHelper.checkPassword(this.userRecoverPassword.value)
            && (this.userRecoverConfirmPassword.value != '')
        )
            this.generateSubmitButton.disabled = false
        else
        this.generateSubmitButton.disabled = true
    }
}