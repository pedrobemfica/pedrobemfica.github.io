import { ServicesController } from "../controllers/services-controller.js"

export class ServicesView {
    constructor() {
        this.servicesList = []

        this.servicesController = new ServicesController()

        this.servicesCompleteList = document.getElementById('servicesCompleteList')
        this.userLoggedMessage = document.getElementById('userLoggedMessage')
    
        this.updateView()
    }

    updateView() {
        this.showServicesList()
        this.checkLoggedUser()
    }

    checkLoggedUser() {
        this.loggedUser = this.servicesController.checkLoggedser()
        let serviceItemAddToCart = document.getElementsByName('serviceItemAddToCart')
        if (!this.loggedUser) {
            serviceItemAddToCart.forEach(e => e.disabled = true)
            this.userLoggedMessage.classList.remove('element-hidden')
        } else {
            serviceItemAddToCart.forEach(e => e.disabled = false)
            this.userLoggedMessage.classList.add('element-hidden')
        }
    }

    showServicesList() {
        this.servicesList = this.servicesController.retrieveServices()
        this.servicesCompleteList.innerHTML = ''
        for (let service in this.servicesList) {
            this.servicesCompleteList.innerHTML += `<li><div class="card" style="width: 18rem;">
                                                        <img src="${this.servicesList[service].image}" class="card-img-top" alt="${this.servicesList[service].name}">
                                                        <div class="card-body services-item--card">
                                                            <h5 class="card-title">${this.servicesList[service].name}</h5>
                                                            <p class="card-text">${this.servicesList[service].description}</p>
                                                            <button type="button" class="btn btn-primary" 
                                                            name="serviceItemAddToCart" value="${this.servicesList[service].id}">Adquirir</a>
                                                        </div>
                                                    </div></li>`
        }
        this.setServicesActions()
    }

    setServicesActions() {
        let serviceItemAddToCart = document.getElementsByName('serviceItemAddToCart')
        
        serviceItemAddToCart.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.servicesController.addToCart(element.value)
            this.updateView()
        }))
    }
}