export class Services {
    constructor() {
        this.list =  [
            {id: 1, name: "Consulta"}, 
            {id: 2, name: "Retorno Consulta"}, 
            {id: 3, name: "Exame de Bioimpedância"}, 
            {id: 4, name: "Aplicação de Medicamento"}
        ]
    }

    get getServiceList() {
        return [].concat(this.list)
    }

    getNameById(serviceId) {
        return this.list.find(e => e.id == serviceId).name
    }

    getIdByName(serviceName) {
        return this.list.find(e => e.name == serviceName).id
    }
}