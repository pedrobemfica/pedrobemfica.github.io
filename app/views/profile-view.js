import { UserController } from "../controllers/user-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"

export class ProfileView {
    constructor() {
        this.userController = new UserController()
        this.applicationController = new ApplicationController()

        let user = this.userController.checkUser()

        this.userProfileForm = document.getElementById('userProfileForm')
        this.userProfileLogout = document.getElementById('userProfileLogout')

        this.userProfileUsername = document.getElementById('userProfileUserName')
        this.userProfileUsername.value = user.username
        this.userProfileEmail = document.getElementById('userProfileEmail')
        this.userProfileEmail.value = user.email
        this.userProfilePhone = document.getElementById('userProfilePhone')
        this.userProfilePhone.value = user.cellPhone
        this.userProfileName = document.getElementById('userProfileName')
        this.userProfileName.value = user.name
        this.userProfileGender = document.getElementById('userProfileGender')
        this.userProfileGender.value = user.gender
        this.userProfileBirth = document.getElementById('userProfileBirth')

        this.userProfileFailMessage = document.getElementById('userProfileFailMessage')

        this.userProfileForm.addEventListener('submit', event => {
            event.preventDefault()
            this.userController.updatePreferences(
                this.userProfileEmail.value,
                this.userProfilePhone.value,
                this.userProfileName.value,
                this.userProfileGender.value,
                this.userProfileBirth.value
            )
            .then(confirmation => {
                if (confirmation) {
                        this.userProfileFailMessage.classList.add('element-hidden')
                        bootstrap.Modal.getInstance('#staticModal').hide()
                    } else
                        this.userProfileFailMessage.classList.remove('element-hidden') 
            })
        })

        this.userProfileLogout.addEventListener('click', event => {
            event.preventDefault()
            this.userController.logout()
            .then(() => {
                bootstrap.Modal.getInstance('#staticModal').hide()
                this.applicationController.loadContent('home')
            })
        })
    }
}