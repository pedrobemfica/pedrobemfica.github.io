import { AppointmentsView } from "../views/appointments-view.js"
import { CartView } from "../views/cart-view.js"
import { FilesView } from "../views/files-view.js"
import { ServicesView } from "../views/services-view.js"
import { NavigationView } from "../views/navigation-view.js"
import { CookiesView } from "../views/cookies-view.js"
import { LoginView } from "../views/login-view.js"
import { RegisterView } from "../views/register-view.js"
import { ProfileView } from "../views/profile-view.js"
import { UserController } from "./user-controller.js"

export class ApplicationController {
    constructor() {
        let headerArea = document.getElementById('headerArea')
        let contentArea = document.getElementById('contentArea')
        let offCanvasArea = document.getElementById('offCanvasArea')
        let staticModalArea = document.getElementById('staticModalArea')
        let footerArea = document.getElementById('footerArea')
        let cookieConsent = document.getElementById('cookieConsent')

        this.routes = [
            {path: 'navigation', page: './pages/navigation.html', view: NavigationView, target: headerArea, hash: false},
            {path: 'footer', page: './pages/footer.html', view: '', target: footerArea, hash: false},
            {path: 'home', page: './pages/home.html', view: '', target: contentArea, hash: true},
            {path: 'services', page: './pages/services.html', view: ServicesView, target: contentArea, hash: true},
            {path: 'appointments', page: './pages/appointments.html', view: AppointmentsView, target: contentArea, hash: true},
            {path: 'files', page: './pages/files.html', view: FilesView, target: contentArea, hash: true},
            {path: 'contact', page: './pages/contact.html', view: '', target: contentArea, hash: true},
            {path: 'terms', page: './pages/terms.html', view: '', target: contentArea, hash: true},
            {path: 'profile', page: './pages/profile.html', view: ProfileView, target: staticModalArea, hash: false},
            {path: 'cart', page: './pages/cart.html', view: CartView, target: offCanvasArea, hash: false},
            {path: 'payment', page: './pages/payment.html', view: '', target: staticModalArea, hash: false},
            {path: 'login', page: './pages/login.html', view: LoginView, target: staticModalArea, hash: false},
            {path: 'register', page: './pages/register.html', view: RegisterView, target: staticModalArea, hash: false},
            {path: 'newpassword', page: './pages/newpassword.html', view: '', target: staticModalArea, hash: false},
            {path: 'forgotpassword', page: './pages/forgotpassword.html', view: '', target: staticModalArea, hash: false},
            {path: 'deleteuser', page: './pages/deleteuser.html', view: '', target: staticModalArea, hash: false},
            {path: 'cookies', page: './pages/cookies.html', view: CookiesView, target: cookieConsent, hash: false}
        ]
    }

    initiate() {
        this.userController = new UserController()
        this.user = null
        this.checkLoggedUser()

        window.addEventListener('DOMContentLoaded', () => {
            let normalizedPage = window.location.pathname.replace('/client/', '')
            this.loadContent(normalizedPage)})
        window.addEventListener('popstate', () => {
            let normalizedPage = window.location.pathname.replace('/client/', '')
            this.loadContent(normalizedPage)})
        window.addEventListener('hashchange', () => {
            let normalizedPage = window.location.pathname.replace('/client/', '')
            this.loadContent(normalizedPage)})
    }
    
    loadContent(path) {
        if(path == '')
            path = 'home'
        let page = (this.routes.find(e => e.path == path)) ? this.routes.find(e => e.path == path).page : this.routes.find(e => e.path == 'home').page
        let target = (this.routes.find(e => e.path == path)) ? this.routes.find(e => e.path == path).target : this.routes.find(e => e.path == 'home').target
        let hash = (this.routes.find(e => e.path == path)) ? this.routes.find(e => e.path == path).hash : this.routes.find(e => e.path == 'home').hash
        let view = (this.routes.find(e => e.path == path)) ? this.routes.find(e => e.path == path).view : this.routes.find(e => e.path == 'home').view
        if (hash)
            history.pushState({}, '', path)

        fetch(page)
        .then(response => response.text())
        .then(html => target.innerHTML = html)
        .then(() => {
            if (view != '')
                new view()
        })
        .catch(error => console.error(`Error loading ${path}:`, error))
    }

    checkLoggedUser() {
        this.user = this.userController.checkUser()
        if (this.user)
            if (this.user.logged)
                return this.user
        return false
    }
}