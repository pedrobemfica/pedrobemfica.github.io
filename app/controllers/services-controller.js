import { Products } from "../models/products-model.js"
import { Services } from "../models/services-model.js"
import { UserController } from "./user-controller.js"

import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.userController = new UserController()
        this.user = this.userController.checkUser()
        this.products = new Products()
        this.services = new Services()
    }

    retrieveCombo() {
        return this.products.getComboProducts
    }

    retrieveSingleNames() {
        return this.products.getSingleNames
    }

    retrieveSingleComplement(serviceName) {
        let servicesList = this.services.getList.filter(e => e.name == serviceName)
        let complements = []
        servicesList.forEach(e => {
            let serviceIndex = complements.findIndex(o => o == e.complement)
            if (serviceIndex == -1) 
                complements.push(e.complement)
        })
        return complements
    }

    retrieveSingleLocation(serviceName, serviceComplement) {
        let servicesList = this.services.getList.filter(e => e.name == serviceName && e.complement == serviceComplement)
        let locations = []
        servicesList.forEach(e => {
            let serviceIndex = locations.findIndex(o => o == e.location)
            if (serviceIndex == -1) 
                locations.push(e.location)
        })
        return locations
    }

    retrieveComboLocation() {
        let locations = []
        this.products.getComboProducts.forEach(e => {
            let serviceIndex = locations.findIndex(o => o == e.location)
            if (serviceIndex == -1) 
                locations.push(e.location)
        })
        return locations
    }

    enableSingle(serviceName, serviceComplement, serviceLocation) {
        let serviceIndex = this.services.getList.findIndex(e => e.name == serviceName && e.complement == serviceComplement && e.location == serviceLocation)
        if (serviceIndex != -1)
            return true
        return false
    }

    addSingleToCart(serviceName, serviceComplement, serviceLocation) {
        let products = new Products()
        let product = products.singleProduct(serviceName, serviceComplement, serviceLocation)
        let confirm = routes.addToCart(product, this.user.userId, this.user.jwt)
        if (confirm)
            alertMessage('Serviço adicionado', 'O serviço foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }

    addComboToCart(productId) {
        let products = new Products()
        let product = products.comboProduct(productId)
        let confirm = routes.addToCart(product, this.user.userId, this.user.jwt) 
        if (confirm)
            alertMessage('Combo adicionado', 'O combo foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }

    checkLoggedser() {
        if (this.user)
            if (this.user.logged)
                return this.user
        return false
    }
}