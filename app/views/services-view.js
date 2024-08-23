import { ServicesController } from "../controllers/services-controller.js"
import { UserController } from "../controllers/user-controller.js"

export class ServicesView {
    constructor() {
        this.singleList = []
        this.packageList = []

        this.servicesController = new ServicesController()
        this.userController = new UserController()

        this.userLoggedMessage = document.getElementById('userLoggedMessage')
        
        this.inputSingleServiceName = document.getElementById('inputSingleServiceName')
        this.inputSingleServiceProfessional = document.getElementById('inputSingleServiceProfessional')
        this.inputSingleServiceLocation = document.getElementById('inputSingleServiceLocation')
        
        this.buttonSingleService = document.getElementById('buttonSingleService')
        this.singleServiceForm = document.getElementById('singleServiceForm')
        this.singleServiceCard = document.getElementById('singleServiceCard')

        this.servicesPackageList = document.getElementById('servicesPackageList')
        this.inputPackageLocationFilter = document.getElementById('inputPackageLocationFilter')
        
        this.singleServiceForm.addEventListener('submit', event => {
            event.preventDefault()
            this.servicesController.addSingleToCart(
                this.inputSingleServiceName.value, 
                this.inputSingleServiceProfessional.value, 
                this.inputSingleServiceLocation.value
            )
            this.updateView()    
        })

        this.inputPackageLocationFilter.addEventListener('change', () => {
            this.updateView()
        })
    
        this.updateView()
    }
    
    updateView() {
        this.clearSingle()
        this.updateName()
        this.startPackageFilterSelector()
        this.showPackageList()
        this.checkLoggedUser()
    }

    checkLoggedUser() {
        this.loggedUser = this.userController.checkUser()
        let serviceItemAddToCart = document.getElementsByName('serviceItemAddToCart')
        if (!this.loggedUser) {
            serviceItemAddToCart.forEach(e => e.disabled = true)
            this.userLoggedMessage.classList.remove('element-hidden')
            return false
        } else {
            serviceItemAddToCart.forEach(e => e.disabled = false)
            this.userLoggedMessage.classList.add('element-hidden')
            return true
        }
    }

    async updateName() {
        this.inputSingleServiceName.innerHTML = ''
        let names = await this.servicesController.uniqueNames()
        for (let name in names) 
            this.inputSingleServiceName.innerHTML += `<option value="${names[name]}">
                                                            ${names[name]}</option>`
        this.inputSingleServiceName.value = ''                                                    
        this.inputSingleServiceName.addEventListener('change', () => {
            this.updateProfessional()
            this.enableSingleButton()
        })
        this.inputSingleServiceProfessional.value = ''
    }

    updateProfessional() {
        this.inputSingleServiceProfessional.innerHTML = ''
        let professionals = this.servicesController.uniqueProfessionals(this.inputSingleServiceName.value)
        for (let professional in professionals) {
            this.inputSingleServiceProfessional.innerHTML += `<option value="${professionals[professional]}">
                                                            ${professionals[professional]}</option>`
            if (professional == 0)
                this.inputSingleServiceProfessional.value = professionals[professional]
        }
        if (professionals.length > 1)
            this.inputSingleServiceProfessional.value = ''
        this.inputSingleServiceProfessional.addEventListener('change', () => {
            this.updateLocation()
            this.enableSingleButton()
        })
        this.inputSingleServiceLocation.value = ''    
    }

    updateLocation() {
        this.inputSingleServiceLocation.innerHTML = ''
        let locations = this.servicesController.uniqueLocations(this.inputSingleServiceName.value, this.inputSingleServiceProfessional.value)
        for (let location in locations) {
            this.inputSingleServiceLocation.innerHTML += `<option value="${locations[location]}">
                                                            ${locations[location]}</option>`
            if (location == 0)
                this.inputSingleServiceLocation.value = locations[location]
        }
        if (locations.length > 1)
            this.inputSingleServiceLocation.value = ''
        this.inputSingleServiceLocation.addEventListener('change', () => this.enableSingleButton())  
    }

    clearSingle() {
        this.singleServiceForm.reset()
        this.enableSingleButton()
    }

    async enableSingleButton() {
        if (this.inputSingleServiceName.value && this.inputSingleServiceProfessional.value && this.inputSingleServiceLocation.value)
            if (this.loggedUser) {
                let service = await this.showSingleCard()
                console.log(service)
                if (service) {
                    this.buttonSingleService.disabled = false
                    this.singleServiceCard.classList.remove('element-hidden')
                    return null 
                }
            }
        this.buttonSingleService.disabled = true
        this.singleServiceCard.classList.add('element-hidden')
    }

    async showSingleCard() {
        let singlesList = await this.servicesController.retrieveSingles()
        let service = singlesList.filter(e => (
            e.serviceName == this.inputSingleServiceName.value 
            && e.professionalName == this.inputSingleServiceProfessional.value 
            && e.location == this.inputSingleServiceLocation.value
        ))[0]
        if (service) {
            this.singleServiceCard.innerHTML = `<div class="row g-0"><div class="col-md-4">
                                                <img src="../assets/services/${service.photo}.jpeg" class="img-fluid rounded-start" alt="${service.serviceName} ${service.professionalName}">
                                                </div><div class="col-md-8"><div class="card-body"><h5 class="card-title">Adquirir serviço individual</h5>
                                                <p class="card-text">${service.serviceName} ${service.professionalName}</p>
                                                <p class="card-text"><small class="text-body-secondary">${service.location}</small></p>
                                                </div></div></div>`
            return true
        } else {
            this.buttonSingleService.disabled = true
            this.singleServiceCard.classList.add('element-hidden')
            return false
        }
    }

    async startPackageFilterSelector() {
        this.inputPackageLocationFilter.innerHTML = ''
        let locations = await this.servicesController.uniquePackageLotcations()
        for (let location in locations) 
            this.inputPackageLocationFilter.innerHTML += `<option value="${locations[location]}">
                                                            ${locations[location]}</option>`
        this.inputPackageLocationFilter.value = ''           
    }

    async showPackageList() {
        let packageList = await this.servicesController.retrievePackages()
        if (this.inputPackageLocationFilter.value != '')
            packageList = packageList.filter(e => e.location == this.inputPackageLocationFilter.value)

        this.servicesPackageList.innerHTML = ''
        for (let packageItem in packageList) {
            this.servicesPackageList.innerHTML += `<li><div class="card" style="width: 18rem;">
                                                        <img src="../assets/services/${packageList[packageItem].photo}.jpeg" class="card-img-top" alt="${packageList[packageItem].name}">
                                                        <div class="card-body packages-item--card">
                                                            <h5 class="card-title">${packageList[packageItem].name}</h5>
                                                            <p class="card-text">${packageList[packageItem].description}</p>
                                                            <button type="button" class="btn btn-primary" 
                                                            name="packageItemAddToCart" value="${packageList[packageItem].packageId}">Adquirir</a>
                                                        </div>
                                                    </div></li>`
        }
        this.setPackageActions()
    }

    setPackageActions() {
        let packageItemAddToCart = document.getElementsByName('packageItemAddToCart')
        this.checkLoggedUser()
        packageItemAddToCart.forEach(element => 
            {
                element.addEventListener('click', event => {
                event.preventDefault()           
                this.servicesController.addPackageToCart(element.value)
                this.updateView()
            })
            if (this.loggedUser) 
                element.disabled = false
            else
                element.disabled = true
        })
    }
}