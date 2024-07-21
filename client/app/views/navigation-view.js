import { ApplicationController } from "../controllers/application-controller.js"

export class NavigationView {
    constructor() {

        this.applicationController = new ApplicationController()

        this.userRegistration = document.getElementById("userRegistration")
        this.userLogin = document.getElementById("userLogin")
        this.userProfile = document.getElementById("userProfile")
        this.userProfileName = document.getElementById('userProfileName')
        this.userCart = document.getElementById("userCart")

        this.bsOffcanvas = new bootstrap.Offcanvas('#offCanvasCart')

        this.updateView()
    }
   
    updateView() {
        this.checkLoggedUser()
        this.updateNavigation()
    }

    updateNavigation() {
        this.navPageList = [...document.getElementsByClassName("navigation-page")]
        this.navPageList.forEach(page => {
            let path = page.getAttribute('data-nav-target')
            page.addEventListener('click', event => {
                event.preventDefault()
                this.applicationController.loadContent(path)
                this.updateView()
            })
        })

        this.userCart.addEventListener('click', event => {
            event.preventDefault()
            this.bsOffcanvas.show()
            })

        document.getElementById('offCanvasClose').addEventListener('click', event => {
            event.preventDefault()
            this.bsOffcanvas.hide()
        })


    }

    checkLoggedUser() {
        this.loggedUser = this.applicationController.checkLoggedser()

        if (this.loggedUser) {
            this.userRegistration.classList.add('element-hidden')
            this.userLogin.classList.add('element-hidden')
            this.userProfile.classList.remove('element-hidden')
            this.userCart.classList.remove('element-hidden')  
            this.userProfileName.innerHTML = this.loggedUser.name      
        } else {
            this.userRegistration.classList.remove('element-hidden')
            this.userLogin.classList.remove('element-hidden')
            this.userProfile.classList.add('element-hidden')
            this.userCart.classList.add('element-hidden')
        }
    }
}