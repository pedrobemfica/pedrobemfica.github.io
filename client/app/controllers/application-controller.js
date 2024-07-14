import { User } from "../models/user-model.js"

export class ApplicationController {
    constructor() {
        // Loag initial page when first connect
        window.addEventListener('DOMContentLoaded', () => this.loadContent(window.location.pathname))

        // Guarantee historical navigation
        window.addEventListener('popstate', () => {
            let normalizedPage = window.location.pathname.replace('/client/', '')
            this.loadContent(normalizedPage)
        })
        window.addEventListener('hashchange', this.loadContent(window.location.pathname))

        // Setup menu navigation
        let navPageList = [...document.getElementsByClassName("nav-page")]
        navPageList.forEach(page => {
            let path = page.getAttribute('data-nav-target')
            page.addEventListener('click', event => {
                event.preventDefault()
                this.navigateTo(path)
            })
        })

        // Setup authentication menu
        let userRegistration = document.getElementById("userRegistration")
        let userLogin = document.getElementById("userLogin")
        let userProfile = document.getElementById("userProfile")
        let userCart = document.getElementById("userCart")
        const isAuthenticated = false // #### PENDING -- Update based on authentication status
        const username = "User" // #### PENDING -- Update with actual username
        if (isAuthenticated) {
            userRegistration.classList.add('element-hidden')
            userLogin.classList.add('element-hidden')
            userProfile.classList.remove('element-hidden')
            userCart.classList.remove('element-hidden')
        } else {
            userRegistration.classList.remove('element-hidden')
            userLogin.classList.remove('element-hidden')
            userProfile.classList.add('element-hidden')
            userCart.classList.add('element-hidden')
        }
    }

    navigateTo(path) {
        history.pushState({}, '', path)
        this.loadContent(path)
    }
    
    loadContent(path) {
        const contentArea = document.getElementById('content')
        if(path == '/client/' || path == '')
            path = 'home'
        fetch(`./pages/${path}.html`)
            .then(response => response.text())
            .then(html => contentArea.innerHTML = html)
            .then(() => {
                switch(path) {
                    case 'home':
                        openHomeView()
                        break
                    case 'registration':
                        openRegistrationView()
                        break
                    case 'login':
                        openLoginView()
                        break
                    case 'profile':
                        openProfileView()
                        break
                    case 'cart':
                        openCartView()
                        break
                    case 'payment':
                        openPaymentView()
                        break
                    case 'services':
                        openServicesView()
                        break
                    case 'appointments':
                        openAppointmentsView()
                        break 
                    case 'files':
                        openFilesView()
                        break 
                    case 'contact':
                        openContactView()
                        break 
                    case 'terms':
                        break 
                    default:
                        throw Error('Page not found')
                }
            })
            .catch(error => console.error(`Error loading ${path}:`, error))
        }
    
}