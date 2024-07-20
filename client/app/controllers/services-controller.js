import { Products } from "../models/products-model.js"
import { Services } from "../models/services-model.js"

import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.products = new Products()
        this.services = new Services()
    }

    retrieveCombo() {
        return this.products.getComboProducts
    }

    retrieveSingleNames() {
        return this.products.getSingleNames
    }

    addToCart(product) {
        let confirm = routes.addToCart(product)
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