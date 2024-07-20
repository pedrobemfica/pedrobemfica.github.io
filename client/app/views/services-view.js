import { ServicesController } from "../controllers/services-controller.js"

export class ServicesView {
    constructor() {
        this.comboList = []

        this.servicesController = new ServicesController()

        this.servicesComboList = document.getElementById('servicesComboList')
        this.userLoggedMessage = document.getElementById('userLoggedMessage')

        this.inputSingleServiceName = document.getElementById('inputSingleServiceName')
        this.inputSingleServiceName.addEventListener('change', () => {this.updateComplement()})
        this.inputSingleServiceComplement = document.getElementById('inputSingleServiceComplement')
        this.inputSingleServiceComplement.addEventListener('change', () => {this.updateLocation()})
        this.inputSingleServiceLocation = document.getElementById('inputSingleServiceLocation')
        this.inputSingleServiceLocation.addEventListener('change', () => {this.enableButton()})

        this.singleServiceForm = document.getElementById('singleServiceForm')
        this.singleServiceForm.addEventListener('submit', event => {
            event.preventDefault()

            this.updateView()    
        })


    
        this.updateView()
    }

    updateView() {
        this.clearSingle()
        this.updateName()
        this.showComboList()
        this.checkLoggedUser()
    }

    updateName() {
        this.inputSingleServiceName.innerHTML = ''
        let names = this.servicesController.retrieveSingleNames()
        for (let name in names) {
            let selected = ''
            if (!name)
                selected = 'selected'
            this.inputSingleServiceName.innerHTML += `<option ${selected} value="${names[name].name}">
                                                            ${names[name].name}</option>`
        }
        //this.inputServicesAppointmentFilter.addEventListener('input', () => this.clearAvailabilitiesList())
    }

    updateComplement() {
        
    }

    updateLocation() {

    }

    enableButton() {

    }

    clearSingle() {

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

    showComboList() {
        this.comboList = this.servicesController.retrieveCombo()
        this.servicesComboList.innerHTML = ''
        for (let combo in this.comboList) {
            this.servicesComboList.innerHTML += `<li><div class="card" style="width: 18rem;">
                                                        <img src="${this.comboList[combo].image}" class="card-img-top" alt="${this.comboList[combo].name}">
                                                        <div class="card-body combos-item--card">
                                                            <h5 class="card-title">${this.comboList[combo].name}</h5>
                                                            <p class="card-text">${this.comboList[combo].description}</p>
                                                            <button type="button" class="btn btn-primary" 
                                                            name="comboItemAddToCart" value="${this.comboList[combo].id}">Adquirir</a>
                                                        </div>
                                                    </div></li>`
        }
        this.setComboActions()
    }

    setComboActions() {
        let serviceItemAddToCart = document.getElementsByName('serviceItemAddToCart')
        
        serviceItemAddToCart.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.servicesController.addToCart(element.value)
            this.updateView()
        }))
    }
}