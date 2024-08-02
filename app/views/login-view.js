import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"

export class LoginView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()
        
        this.userLoginForm = document.getElementById('userLoginForm')
        this.userLoginName = document.getElementById('userLoginName')
        this.userLoginPassword = document.getElementById('userLoginPassword')

        this.userLoginFailMessage = document.getElementById('userLoginFailMessage')
        
        this.userLoginForm.addEventListener('submit', event => {
            event.preventDefault()
            this.userController.login(this.userLoginName.value, this.userLoginPassword.value)
            .then(confirmation => {
                if (confirmation) {
                    this.userLoginFailMessage.classList.add('element-hidden')
                    bootstrap.Modal.getInstance('#staticModal').hide()
                    this.applicationController.loadContent('home')
                } else 
                    this.userLoginFailMessage.classList.remove('element-hidden')
            })
        })      
    }
}