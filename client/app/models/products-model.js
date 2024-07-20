import { Services } from "./services-model.js"

export class Products {
    constructor() {
        this.services = new Services()

        this.singleProducts = [
            {name: 'Consulta', price: 700},
            {name: 'Exame', price: 100},
            {name: 'Aplicação de medicamento', price: 150},
            {name: 'Nutricionista', price: 400}
        ]

        this.comboProducts = [
            {productId: 1, name: 'Assinatura anual Vitória', price: 2.380, image: './assets/services/consulta.jpeg',
            description: 'Acompanhamento anual. Consultas com nutrólogo e nutricionista semestrais, exames mensais. 30% de desconto. Local: Vitória/ES', 
            credits: [{serviceId: 1, quantity: 2}, {serviceId: 4, quantity: 2}, {serviceId: 15, quantity: 2}, {serviceId: 7, quantity: 12}]},

            {productId: 2, name: 'Assinatura anual Belo Horizonte', price: 2.380, image: './assets/services/consulta.jpeg',
            description: 'Acompanhamento anual. Consultas com nutrólogo e nutricionista semestrais, exames mensais. 30% de desconto. Local: Belo Horizonte/MG', 
            credits: [{serviceId: 2, quantity: 2}, {serviceId: 5, quantity: 2}, {serviceId: 16, quantity: 2}, {serviceId: 8, quantity: 12}]},

            {productId: 3, name: 'Assinatura anual Online', price: 1.650, image: './assets/services/consulta.jpeg',
            description: 'Acompanhamento anual. Consultas com nutrólogo e nutricionista semestrais. 25% de desconto. Online.', 
            credits: [{serviceId: 1, quantity: 2}, {serviceId: 4, quantity: 2}, {serviceId: 15, quantity: 2}]},

            {productId: 4, name: 'Pacote aceleradores e vitaminas Vitória', price: 1.800, image: './assets/services/medicamento.jpeg',
            description: '10 aplicações de aceleradores metabólicos e 10 aplicações de vitaminas. 40% de desconto. Local: Vitória/ES', 
            credits: [{serviceId: 9, quantity: 10}, {serviceId: 11, quantity: 10}]},

            {productId: 5, name: 'Pacote aceleradores e vitaminas Belo Horizonte', price: 1.800, image: './assets/services/medicamento.jpeg',
            description: '10 aplicações de aceleradores metabólicos e 10 aplicações de vitaminas. 40% de desconto. Local: Belo Horizonte/MG', 
            credits: [{serviceId: 12, quantity: 10}, {serviceId: 14, quantity: 10}]},

            {productId: 6, name: 'Pacote bioimpedância Vitória', price: 650, image: './assets/services/bioimpedancia.jpeg',
            description: '10 exames de bioimpedância. 35% de desconto. Local: Vitória/ES', 
            credits: [{serviceId: 7, quantity: 10}]},

            {productId: 7, name: 'Pacote bioimpedância Belo Horizonte', price: 650, image: './assets/services/bioimpedancia.jpeg',
            description: '10 exames de bioimpedância. 35% de desconto. Local: Belo Horizonte/MG', 
            credits: [{serviceId: 8, quantity: 10}]}
        ]
    }

    get getComboProducts() {
        return [].concat(this.comboProducts)
    }

    get getSingleNames() {
        let nameList = []
        this.singleProducts.forEach(e => {nameList.push(e.name)})
        return [].concat(nameList)
    }

    singleProduct(name, complement, location) {
        let service = this.services.find(e => e.name == name && e.complement == complement && e.location == location)
        let retorno = ''
        let singleProduct = this.singleProducts.find(e => e.name == name)
        
        let product = {
            productId: 'NA',
            name: 'Serviço individual',
            price: singleProduct.price,
            image: 'NA',
            description: this.services.getStringById(service.serviceId),
            credits: [{
                    serviceId: service.serviceId,
                    quantity: 1
                }]
        }
        if (name == consulta) {
            retorno = this.services.find(e => e.name == 'Retorno' && e.complement == complement && e.location == location)
            product.credits.push({
                serviceId: retorno.serviceId,
                quantity: 1
            })
        }
        return product
    }

    comboProduct(productId) {
        return this.comboProducts.find(e => e.productId == productId)
    }
}