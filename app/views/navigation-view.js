import { NavigationController } from "../controllers/navigation-controller.js"

export class NavigationView {
    constructor() {

        this.navigationController = new NavigationController()

        this.userRegistration = document.getElementById("userRegistration")
        this.userLogin = document.getElementById("userLogin")
        this.userProfile = document.getElementById("userProfile")
        this.userProfileName = document.getElementById('userProfileName')
        this.userCart = document.getElementById("userCart")

        this.bsOffcanvas = new bootstrap.Offcanvas('#offCanvasCart')
        this.myModal = new bootstrap.Modal('#staticModal')

        this.myModalEl = document.getElementById('staticModal')
        this.myModalEl.addEventListener('hide.bs.modal', () => {
            this.checkLoggedUser()  
        })

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
            page.removeEventListener('click', this)
            page.addEventListener('click', event => {
                event.preventDefault()
                this.navigationController.loadPage(path)
                this.checkLoggedUser()
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

        this.userRegistration.addEventListener('click', event => {
            event.preventDefault()
            this.myModal.show()
        })

        this.userLogin.addEventListener('click', event => {
            event.preventDefault()
            this.myModal.show()
        })

        this.userProfile.addEventListener('click', event => {
            event.preventDefault()
            this.myModal.show()
        })

        document.getElementById('staticModalClose').addEventListener('click', event => {
            event.preventDefault()
            this.myModal.hide()
        })

    }

    checkLoggedUser() {
        this.loggedUser = this.navigationController.checkUser()

        if (this.loggedUser) {
            this.userRegistration.classList.add('element-hidden')
            this.userLogin.classList.add('element-hidden')
            this.userProfile.classList.remove('element-hidden')
            this.userCart.classList.remove('element-hidden')  
            this.userProfileName.innerHTML = this.loggedUser.username      
        } else {
            this.userRegistration.classList.remove('element-hidden')
            this.userLogin.classList.remove('element-hidden')
            this.userProfile.classList.add('element-hidden')
            this.userCart.classList.add('element-hidden')
        }
    }
}