import { UserController } from "../controllers/user-controller.js"

export class ProfileView {
    constructor() {
        this.userController = new UserController()

        let user = this.userController.checkUser()

        this.userProfileForm = document.getElementById('userProfileForm')
        this.userProfileLogout = document.getElementById('userProfileLogout')

        this.userProfileUsername = document.getElementById('userProfileUserName')
        this.userProfileUsername.value = user.username
        this.userProfileEmail = document.getElementById('userProfileEmail')
        this.userProfileEmail.value = user.email
        this.userProfilePhone = document.getElementById('userProfilePhone')
        this.userProfilePhone.value = user.phone
        this.userProfileInputName = document.getElementById('userProfileInputName')
        this.userProfileInputName.value = user.name
        this.userProfileGender = document.getElementById('userProfileGender')
        if (user.gender) 
            this.userProfileGender.value = user.gender
        else
            this.userProfileGender.value = ''
        this.userProfileBirth = document.getElementById('userProfileBirth')
        this.userProfileBirth.value = user.birth

        this.profileSubmitButton = document.getElementById('profileSubmitButton')

        this.userProfileNameRules = document.getElementById('userProfileNameRules')
        this.userProfilePhoneRules = document.getElementById('userProfilePhoneRules')

        this.userProfilePassword = document.getElementById('userProfilePassword')

        this.userProfileFailMessage = document.getElementById('userProfileFailMessage')

        this.userProfileForm.addEventListener('submit', event => {
            event.preventDefault()
            this.userController.updatePreferences(
                this.userProfileEmail.value,
                this.userProfilePhone.value,
                this.userProfileInputName.value,
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
                this.userController.backToHome()
            })
        })

        this.userProfileInputName.addEventListener('focusin', () => {
            this.userProfileNameRules.classList.remove('element-hidden') 
        })

        this.userProfilePhone.addEventListener('focusin', () => {
            this.userProfilePhoneRules.classList.remove('element-hidden') 
        })

        this.userProfileInputName.addEventListener('focusout', () => {
            this.userProfileNameRules.classList.add('element-hidden') 
        })

        this.userProfilePhone.addEventListener('focusout', () => {
            this.userProfilePhoneRules.classList.add('element-hidden') 
        })

        this.userProfileInputName.addEventListener('input', () => this.enableUpdate())
        this.userProfileEmail.addEventListener('input', () => this.enableUpdate())
        this.userProfilePhone.addEventListener('input', () => this.enableUpdate())

        this.userProfilePassword.addEventListener('click', () => {
            this.userController.goToChangePass()
        })

        this.enableUpdate() 
    }

    enableUpdate() {
        if( this.userController.checkUpdatePreferences(
            this.userProfileEmail.value,
            this.userProfilePhone.value,
            this.userProfileInputName.value,
            this.userProfileGender.value,
            this.userProfileBirth.value
            )
            && (this.userProfileEmail.value || this.userProfilePhone.value)
        )
            this.profileSubmitButton.disabled = false
        else
        this.profileSubmitButton.disabled = true
    }
}