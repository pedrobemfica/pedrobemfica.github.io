import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"

export class ProfileView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()

        this.userProfileForm = document.getElementById('userProfileForm')
        this.userProfileLogout = document.getElementById('userProfileLogout')

        this.userProfileUserName = document.getElementById('userProfileUserName')
        this.userProfileEmail = document.getElementById('userProfileEmail')
        this.userProfilePhone = document.getElementById('userProfilePhone')
        this.userProfileName = document.getElementById('userProfileName')
        this.userProfileGender = document.getElementById('userProfileGender')
        this.userProfileBirth = document.getElementById('userProfileBirth')

        this.userProfileFailMessage = document.getElementById('userProfileFailMessage')

        this.userProfileForm.addEventListener('submit', event => {
            event.preventDefault()
            if (this.userController.updatePreferences(
                this.userProfileEmail.value,
                this.userProfilePhone.value,
                this.userProfileName.value,
                this.userProfileGender.value,
                this.userProfileBirth.value
                )) {
                    this.userProfileFailMessage.classList.add('element-hidden')
                    bootstrap.Modal.getInstance('#staticModal').hide()
                } else
                    this.userProfileFailMessage.classList.remove('element-hidden') 
        })

        this.userProfileLogout.addEventListener('click', event => {
            event.preventDefault()
            this.userController.logout()
            bootstrap.Modal.getInstance('#staticModal').hide()
            this.applicationController.loadContent('home')
        })
    }
}