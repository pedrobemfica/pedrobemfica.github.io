import { ApplicationController } from "../controllers/application-controller.js"
import { Cookies } from "../helpers/cookie-helper.js"

export class ApplicationView {
    constructor() {
        this.applicationController = new ApplicationController()
        this.userRegistration = document.getElementById("userRegistration")
        this.userLogin = document.getElementById("userLogin")
        this.userProfile = document.getElementById("userProfile")
        this.userCart = document.getElementById("userCart")
        this.userProfileName = document.getElementById('userProfileName')
        
        this.checkLoggedUser()
        this.initializeCookies()
        
        this.navPageList = [...document.getElementsByClassName("nav-page")]
        this.navPageList.forEach(page => {
            let path = page.getAttribute('data-nav-target')
            page.addEventListener('click', event => {
                event.preventDefault()
                this.applicationController.navigateTo(path)
            })
        })

        const offcanvasElementList = document.querySelectorAll('.offcanvas')
        const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl))

        this.userCart.addEventListener('click', event => {
            event.preventDefault()
            const bsOffcanvas = new bootstrap.Offcanvas('#offCanvasCart')
            bsOffcanvas.show()
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

    initializeCookies() {
        let cookieConsent = document.getElementById('cookieConsent')
        let cookieAccept = document.getElementById('acceptCookies')
        Cookies.cookieConsent(cookieConsent, cookieAccept)
    }
}