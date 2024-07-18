import { Services } from "../helpers/services-helper.js"

import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.services = Services.getServiceList()
    }

    retrieveServices() {
        return [].concat(this.services)
    }

    addToCart(serviceId) {
        let confirm = routes.addToCart(serviceId)
        if (confirm)
            alertMessage('Serviço adicionado', 'O serviço foi adicionado ao seu carrinho de compras.')
        else
            alertMessage('Erro ao adicionar', 'Algum erro ocorreu e a ação não foi concluída.')
    }

    checkLoggedser() {
        let user = {id: 1, name: 'Pedro'}
        return user
        return false
    }
}