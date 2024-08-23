import { UserController } from "./user-controller.js"
import { ApiServices } from "../api/services-routes.js"

import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.userController = new UserController()
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

    addSingleToCart(name, professional, location) {
        const singleId = this.singleList.filter(e => (e.name == name && e.professional == professional && e.location == location))[0].serviceId
        //let confirm = ApiCart...
        if (confirm)
            alertMessage('Serviço adicionado', 'O serviço foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }

    addPackageToCart(packageId) {
        //let confirm = ApiCart... 
        if (confirm)
            alertMessage('Combo adicionado', 'O combo foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }
}