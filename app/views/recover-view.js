import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"

export class RecoverView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()

        this.userRecoverForm = document.getElementById('userRecoverForm')
        this.userRecoverName = document.getElementById('userRecoverName')
        
        this.generateSubmitButton = document.getElementById('generateSubmitButton')
        this.generateSubmitButton.disabled = true

        this.userRecoverFailMessage = document.getElementById('userRecoverFailMessage')


        this.userRecoverForm.addEventListener('submit', async event => {
            event.preventDefault()
            const confirmation = await this.userController.requestNewPassword(this.userRecoverName.value)
            if (confirmation) {
                this.userRecoverFailMessage.classList.add('element-hidden')
                bootstrap.Modal.getInstance('#staticModal').hide()
                this.applicationController.loadContent('home')
            } else 
                this.userRecoverFailMessage.classList.remove('element-hidden') 
        })

        this.userRecoverName.addEventListener('input', () => this.enableCode())
    }

    enableCode() {
        if (this.userRecoverName.value != '')
            this.generateSubmitButton.disabled = false
        else
            this.generateSubmitButton.disabled = true
    }
}