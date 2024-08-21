import { Services } from "../models/services-model.js"
import { UserController } from "./user-controller.js"

import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.services = new Services()
        this.userController = new UserController()
    }

    retrieveSingles() {
        return this.services.single
    }

    uniqueNames() {
        let uniqueList = [].concat(...new Set(this.services.single.map(e => e.name)))
        return uniqueList
    }

    uniqueProfessionals(name) {
        let uniqueList = [].concat(...new Set(this.services.single.filter(e => name == e.name).map(o => o.professional)))
        return uniqueList
    }

    uniqueLocations(name, professional) {
        let uniqueList = [].concat(...new Set(this.services.single.filter(e => (name == e.name && professional == e.professional)).map(o => o.location)))
        return uniqueList
    }

    retrievePackages() {
        return this.services.package
    }

    uniquePackageLotcations() {
        let uniqueList = [].concat(...new Set(this.services.package.map(e => e.location)))
        return uniqueList
    }

    addSingleToCart(name, professional, location) {
        const singleId = this.services.single.filter(e => (e.name == name && e.professional == professional && e.location == location))[0].serviceId
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