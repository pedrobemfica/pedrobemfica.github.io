import { ServicesController } from "../controllers/services-controller.js"

export class ServicesView {
    constructor() {
        this.comboList = []

        this.servicesController = new ServicesController()

        this.servicesComboList = document.getElementById('servicesComboList')
        this.userLoggedMessage = document.getElementById('userLoggedMessage')

        this.inputSingleServiceName = document.getElementById('inputSingleServiceName')
        this.inputSingleServiceComplement = document.getElementById('inputSingleServiceComplement')
        this.inputSingleServiceLocation = document.getElementById('inputSingleServiceLocation')

        this.buttonSingleService = document.getElementById('buttonSingleService')
        this.inputComboLocationFilter = document.getElementById('inputComboLocationFilter')
        this.inputComboLocationFilter.addEventListener('change', () => {
            this.showComboList()
        })

        this.singleServiceForm = document.getElementById('singleServiceForm')
        this.singleServiceForm.addEventListener('submit', event => {
            event.preventDefault()
            this.servicesController.addSingleToCart(
                this.inputSingleServiceName.value,
                this.inputSingleServiceComplement.value,
                this.inputSingleServiceLocation.value
            )
            this.updateView()    
        })
        this.updateView()
    }

    updateView() {
        this.clearSingle()
        this.updateName()
        this.startComboFilterSelector()
        this.showComboList()
        this.checkLoggedUser()
    }

    updateName() {
        this.inputSingleServiceName.innerHTML = ''
        let names = this.servicesController.retrieveSingleNames()
        for (let name in names) 
            this.inputSingleServiceName.innerHTML += `<option value="${names[name]}">
                                                            ${names[name]}</option>`
        this.inputSingleServiceName.value = ''                                                    
        this.inputSingleServiceName.addEventListener('change', () => this.updateComplement())
        this.inputSingleServiceComplement.value = ''
    }

    updateComplement() {
        this.inputSingleServiceComplement.innerHTML = ''
        let complements = this.servicesController.retrieveSingleComplement(this.inputSingleServiceName.value)
        for (let complement in complements) 
            this.inputSingleServiceComplement.innerHTML += `<option value="${complements[complement]}">
                                                            ${complements[complement]}</option>`
        this.inputSingleServiceComplement.value = ''
        this.inputSingleServiceComplement.addEventListener('change', () => this.updateLocation())
        this.inputSingleServiceLocation.value = ''    
    }

    updateLocation() {
        this.inputSingleServiceLocation.innerHTML = ''
        let locations = this.servicesController.retrieveSingleLocation(this.inputSingleServiceName.value, this.inputSingleServiceComplement.value)
        for (let location in locations) 
            this.inputSingleServiceLocation.innerHTML += `<option value="${locations[location]}">
                                                            ${locations[location]}</option>`
        this.inputSingleServiceLocation.value = ''
        this.inputSingleServiceLocation.addEventListener('change', () => this.enableSingleButton())
        this.inputSingleServiceLocation.value = ''  
    }

    enableSingleButton() {
        if (this.servicesController.retrieveSingleLocation(this.inputSingleServiceName.value, this.inputSingleServiceComplement.value, this.inputSingleServiceLocation.value))
            this.buttonSingleService.disabled = false
        else
            this.buttonSingleService.disabled = true
    }

    clearSingle() {
        this.inputSingleServiceName.value = ''
        this.inputSingleServiceComplement.value = ''
        this.inputSingleServiceLocation.value = ''
        this.buttonSingleService.disabled = true
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

    startComboFilterSelector() {
        this.inputComboLocationFilter.innerHTML = ''
        this.inputComboLocationFilter.innerHTML += `<option value=""></option>`
        let locations = this.servicesController.retrieveComboLocation()
        for (let location in locations) 
            this.inputComboLocationFilter.innerHTML += `<option value="${locations[location]}">
                                                            ${locations[location]}</option>`
        this.inputComboLocationFilter.value = ''           
    }

    showComboList() {
        this.comboList = this.servicesController.retrieveCombo()
        if (this.inputComboLocationFilter.value != '')
            this.comboList = this.comboList.filter(e => e.location == this.inputComboLocationFilter.value)

        this.servicesComboList.innerHTML = ''
        for (let combo in this.comboList) {
            this.servicesComboList.innerHTML += `<li><div class="card" style="width: 18rem;">
                                                        <img src="${this.comboList[combo].image}" class="card-img-top" alt="${this.comboList[combo].name}">
                                                        <div class="card-body combos-item--card">
                                                            <h5 class="card-title">${this.comboList[combo].name}</h5>
                                                            <p class="card-text">${this.comboList[combo].description}</p>
                                                            <button type="button" class="btn btn-primary" 
                                                            name="comboItemAddToCart" value="${this.comboList[combo].productId}">Adquirir</a>
                                                        </div>
                                                    </div></li>`
        }
        this.setComboActions()
    }

    setComboActions() {
        let comboItemAddToCart = document.getElementsByName('comboItemAddToCart')
        
        comboItemAddToCart.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.servicesController.addComboToCart(element.value)
            this.updateView()
        }))
    }
}