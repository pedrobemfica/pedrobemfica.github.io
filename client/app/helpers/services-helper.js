export const Services = {
    list: [
        {
            id: 1, name: "Consulta Online: Dra Cintia", credit: true,
            description: 'Consulta com médica especialista com foco em emagrecimento, performance esportiva e bem estar. Online através de aplicativo de teleconferência.', 
            image: './assets/services/consulta.jpeg'
        }, 
        {
            id: 2, name: "Consulta Vitória: Dra Cintia", credit: true,
            description: 'Consulta com médica especialista com foco em emagrecimento, performance esportiva e bem estar. Presencial em Vitória/ES.', 
            image: './assets/services/consulta.jpeg'
        }, 
        {
            id: 3, name: "Consulta Belo Horizonte: Dra Cintia", credit: true,
            description: 'Consulta com médica especialista com foco em emagrecimento, performance esportiva e bem estar. Presencial em Belo Horizonte/MG.', 
            image: './assets/services/consulta.jpeg'
        }, 
        {
            id: 11, name: "Retorno Online: Dra Cintia", credit: false,
            description: 'Retorno de consulta. Possível marcar apenas após consulta. Online através de aplicativo de teleconferência.', 
            image: './assets/services/consulta.jpeg'
        }, 
        {
            id: 12, name: "Retorno Vitória: Dra Cintia", credit: false,
            description: 'Retorno de consulta. Possível marcar apenas após consulta. Presencial em Vitória/ES.', 
            image: './assets/services/consulta.jpeg'
        }, 
        {
            id: 13, name: "Retorno Belo Horizonte: Dra Cintia", credit: false,
            description: 'Retorno de consulta. Possível marcar apenas após consulta. Presencial em Belo Horizonte/MG.', 
            image: './assets/services/consulta.jpeg'
        }, 
        {
            id: 21, name: "Consulta Online: Nutricionista", credit: true,
            description: 'Consulta com nutricionista para orientar e complementar o tratamento. Online através de aplicativo de teleconferência.', 
            image: './assets/services/nutricionista.jpeg'
        }, 
        {
            id: 22, name: "Consulta Vitória: Nutricionista", credit: true,
            description: 'Consulta com nutricionista para orientar e complementar o tratamento. Presencial em Vitória/ES.', 
            image: './assets/services/nutricionista.jpeg'
        }, 
        {
            id: 23, name: "Consulta Belo Horizonte: Nutricionista", credit: true,
            description: 'Consulta com nutricionista para orientar e complementar o tratamento. Presencial em Belo Horizonte/MG.', 
            image: './assets/services/nutricionista.jpeg'
        }, 
        {
            id: 31, name: "Exame de Bioimpedância: Vitória", credit: true,
            description: 'Exame de bioimpedância para detectar o percentual de gordura corporal e acompanhar a evolução. Presencial em Vitória/ES', 
            image: './assets/services/bioimpedancia.jpeg'
        }, 
        {
            id: 32, name: "Exame de Bioimpedância: Belo Horizonte", credit: true,
            description: 'Exame de bioimpedância para detectar o percentual de gordura corporal e acompanhar a evolução. Presencial em Belo Horizonte/MG', 
            image: './assets/services/bioimpedancia.jpeg'
        }, 
        {
            id: 41, name: "Aplicação Vitória: Acelerador metabólico", credit: true,
            description: 'Aplicação de aceleradores metabólicos. Presencial em Vitória/ES.', 
            image: './assets/services/medicamento.jpeg'
        },
        {
            id: 42, name: "Aplicação Belo Horizonte: Acelerador metabólico", credit: true,
            description: 'Aplicação de aceleradores metabólicos. Presencial em Belo Horizonte/MG.', 
            image: './assets/services/medicamento.jpeg'
        },
        {
            id: 43, name: "Aplicação Vitória: Vitaminas", credit: true,
            description: '(Obrigatória prescrição médica) Aplicação de vitaminas. Presencial em Vitória/ES.', 
            image: './assets/services/medicamento.jpeg'
        },
        {
            id: 44, name: "Aplicação Belo Horizonte: Vitaminas", credit: true,
            description: '(Obrigatória prescrição médica) Aplicação de vitaminas. Presencial em Belo Horizonte/MG.', 
            image: './assets/services/medicamento.jpeg'
        },
        {
            id: 45, name: "Aplicação Vitória: Reposição hormonal", credit: true,
            description: '(Obrigatória prescrição médica) Aplicação de reposições hormonais. Presencial em Vitória/ES.', 
            image: './assets/services/medicamento.jpeg'
        },
        {
            id: 46, name: "Aplicação Belo Horizonte: Reposição hormonal", credit: true,
            description: '(Obrigatória prescrição médica) Aplicação de reposições hormonais. Presencial em Belo Horizonte/MG.', 
            image: './assets/services/medicamento.jpeg'
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