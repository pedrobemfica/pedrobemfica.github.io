import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"
import { validateHelper } from "../helpers/validate-helper.js"

export class ChangepassView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()

        this.userChangeForm = document.getElementById('userChangeForm')
        this.userChangePassword = document.getElementById('userChangePassword')
        this.userChangeConfirmPassword = document.getElementById('userChangeConfirmPassword')

        this.userChangePasswordRules = document.getElementById('userChangePasswordRules')

        this.userChangeFailMessage = document.getElementById('userChangeFailMessage')

        this.changeSubmitButton = document.getElementById('changeSubmitButton')
        this.changeSubmitButton.disabled = true

        this.userChangeForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.userController.changePassword(
                this.userChangePassword.value, 
                this.userChangeConfirmPassword.value
            )
            if (confirmation) {
                this.userChangeFailMessage.classList.add('element-hidden')
                bootstrap.Modal.getInstance('#staticModal').hide()
                this.applicationController.loadContent('home')
            } else 
                this.userChangeFailMessage.classList.remove('element-hidden') 
        })

        this.userChangePassword.addEventListener('focusin', () => {
            this.userChangePasswordRules.classList.remove('element-hidden') 
        })

        this.userChangePassword.addEventListener('focusout', () => {
            this.userChangePasswordRules.classList.add('element-hidden') 
        })


        this.userChangePassword.addEventListener('input', () => this.enableChange())
        this.userChangeConfirmPassword.addEventListener('input', () => this.enableChange())
    }

    enableChange() {
        if(
            validateHelper.checkPassword(this.userChangePassword.value)
            && (this.userChangeConfirmPassword.value != '')
        )
            this.changeSubmitButton.disabled = false
        else
        this.changeSubmitButton.disabled = true
    }
}