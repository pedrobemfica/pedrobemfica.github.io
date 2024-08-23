import { ApiServices } from "../api/services-routes.js"
import { UserController } from "./user-controller.js"
import { CartController } from "./cart-controller.js"

import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.userController = new UserController()
        this.cartController = new CartController()
    }

    checkUser() {
        return this.userController.checkUser()
    }

    async retrieveSingles() {
        let singleList = await ApiServices.single()
        this.singleList = singleList.list
        return this.singleList
    }

    async uniqueNames() {
        let uniqueList = await this.retrieveSingles()
        uniqueList = [].concat(...new Set(this.singleList.map(e => e.serviceName)))
        return uniqueList
    }

    uniqueProfessionals(serviceName) {
        let uniqueList = [].concat(...new Set(this.singleList.filter(e => serviceName == e.serviceName).map(o => o.professionalName)))
        return uniqueList
    }

    uniqueLocations(serviceName, professionalName) {
        let uniqueList = [].concat(...new Set(this.singleList.filter(e => (serviceName == e.serviceName && professionalName == e.professionalName)).map(o => o.location)))
        return uniqueList
    }

    async retrievePackages() {
        let packageList = await ApiServices.package()
        this.packageList = packageList.list
        return this.packageList
    }

    async uniquePackageLotcations() {
        let uniqueList = await this.retrievePackages()
        uniqueList = [].concat(...new Set(this.packageList.map(e => e.location)))
        return uniqueList
    }

    addSingleToCart(serviceName, professionalName, location) {
        const singleItem = this.singleList.find(e => (
            e.serviceName == serviceName 
            && e.professionalName == professionalName 
            && e.location == location
        ))
        let confirm = this.cartController.addSingleToCart(singleItem)
        if (confirm)
            alertMessage('Serviço adicionado', 'O serviço foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }

    addPackageToCart(packageId) {
        const packageItem = this.packageList.find(e => (e.packageId == packageId))
        let confirm = this.cartController.addPackageToCart(packageItem)
        if (confirm)
            alertMessage('Pacote adicionado', 'O pacote foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }
}