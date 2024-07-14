import { User } from "../models/user-model.js"
import { AppointmentsView } from "../views/appointments-view.js"

export class ApplicationController {
    constructor() {
        // Loag initial page when first connect, guarantee historical navigation and setup menu navigation
        window.addEventListener('DOMContentLoaded', () => this.loadContent(window.location.pathname))
        window.addEventListener('popstate', () => {
            let normalizedPage = window.location.pathname.replace('/client/', '')
            this.loadContent(normalizedPage)
        })
        window.addEventListener('hashchange', this.loadContent(window.location.pathname))

        this.contentArea = document.getElementById('content')
    }
    
    navigateTo(path) {
        history.pushState({}, '', path)
        this.loadContent(path)
    }
    
    loadContent(path) {
        if(path == '/client/' || path == '')
            path = 'home'
        fetch(`./pages/${path}.html`)
        .then(response => response.text())
        .then(html => this.contentArea.innerHTML = html)
        .then(() => {this.routes(path)})
            .catch(error => console.error(`Error loading ${path}:`, error))
        }
    
    routes(path) {
        let view;
        switch(path) {
            case 'home':
                break
                case 'registration':
                break
            case 'login':
                break
            case 'profile':
                break
                case 'cart':
                break
            case 'payment':
                break
            case 'services':
                break
            case 'appointments':
                view = new AppointmentsView()
                break 
            case 'files':
                break 
            case 'contact':
                break 
            case 'terms':
                break 
            default:
                throw Error('Page not found')
        }
    }
    
    loginUser() {}
}