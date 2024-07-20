export class Services {
    constructor() {
        this.list = [
            {serviceId: 1, name: 'Consulta', complement: 'Dra. Cíntia', location: 'Vitória', duration: '60'},
            {serviceId: 2, name: 'Consulta', complement: 'Dra. Cíntia', location: 'Belo Horizonte', duration: '60'},
            {serviceId: 3, name: 'Consulta', complement: 'Dra. Cíntia', location: 'Online', duration: '60'},

            {serviceId: 4, name: 'Retorno', complement: 'Dra. Cíntia', location: 'Vitória', duration: '30'},
            {serviceId: 5, name: 'Retorno', complement: 'Dra. Cíntia', location: 'Belo Horizonte', duration: '30'},
            {serviceId: 6, name: 'Retorno', complement: 'Dra. Cíntia', location: 'Online', duration: '30'},

            {serviceId: 7, name: 'Exame', complement: 'Bioimpedância', location: 'Vitória', duration: '30'},
            {serviceId: 8, name: 'Exame', complement: 'Bioimpedância', location: 'Belo Horizonte', duration: '30'},

            {serviceId: 9, name: 'Aplicação', complement: 'Acelerador', location: 'Vitória', duration: '15'},
            {serviceId: 10, name: 'Aplicação', complement: 'Hormônio', location: 'Vitória', duration: '15'},
            {serviceId: 11, name: 'Aplicação', complement: 'Vitamina', location: 'Vitória', duration: '15'},
            {serviceId: 12, name: 'Aplicação', complement: 'Acelerador', location: 'Belo Horizonte', duration: '15'},
            {serviceId: 13, name: 'Aplicação', complement: 'Hormônio', location: 'Belo Horizonte', duration: '15'},
            {serviceId: 14, name: 'Aplicação', complement: 'Vitamina', location: 'Belo Horizonte', duration: '15'},

            {serviceId: 15, name: 'Nutricionista', complement: 'Nome nutricionista', location: 'Vitória', duration: '60'},
            {serviceId: 16, name: 'Nutricionista', complement: 'Nome nutricionista', location: 'Belo Horizonte', duration: '60'},
            {serviceId: 17, name: 'Nutricionista', complement: 'Nome nutricionista', location: 'Online', duration: '60'}
        ]
    }

    get getList() {
        return [].concat(this.list)
    }

    getById(serviceId) {
        let obj = this.list.find(e => e.serviceId == serviceId)
        return obj
    }

    getStringById(serviceId) {
        let obj = this.list.find(e => e.serviceId == serviceId)
        return `${obj.name} ${obj.complement}: ${obj.location}`
    }
}