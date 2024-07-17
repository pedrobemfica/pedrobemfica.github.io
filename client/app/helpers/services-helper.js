export const Services = {
    list: [
        {
            id: 1, name: "Consulta", credit: true,
            description: 'Consulta com médico especialista com foco em emagrecimento, performance esportiva e bem estar.', 
            image: '../../assets/services/consulta.jpeg'
        }, 
        {
            id: 2, name: "Retorno Consulta", credit: false,
            description: 'Retorno de consulta com médico.', 
            image: '../../assets/services/retorno.jpeg'
        }, 
        {
            id: 3, name: "Exame de Bioimpedância", credit: true,
            description: 'Exame de bioimpedância para detectar o percentual de gordura corporal e acompanhar a evolução.', 
            image: '../../assets/services/bioimpedancia.jpeg'
        }, 
        {
            id: 4, name: "Aplicação de Medicamento", credit: true,
            description: 'Aplicação de aceleradores metabólicos, reposição hormonal ou suplementação de vitaminas importantes.', 
            image: '../../assets/services/retorno.jpeg'
        }
    ],

    getServiceList: function() {
        return [].concat(this.list)
    },

    getNameById(serviceId) {
        return this.list.find(e => e.id == serviceId).name
    },

    getIdByName(serviceName) {
        return this.list.find(e => e.name == serviceName).id
    }
}