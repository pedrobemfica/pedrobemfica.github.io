import { Credit } from './credit-model.js'
import { SERVICES } from '../helpers/entities-helper.js'

export class Credits {
    constructor() {
        this.list = []
    }

    get getCredits() {
        return [].concat(this.list)
    }

    get getShortCredits() {
        let shortList =[]
        this.list.map(e => {
            let creditName = SERVICES.find(eservice => eservice.id == e.serviceId).name
            let creditIndex = shortList.findIndex(o => o.name == creditName)
            if (creditIndex != -1) 
                shortList[creditIndex].quantity += 1
            else {
                shortList.push({name: creditName, quantity: 1})
            }
        })
        return [].concat(shortList)
    }

    insertCredit(creditObject) {
        if (creditObject instanceof Credit) {
            this.list.push(creditObject)
            return true;
        }
        return false;
    }

    removeCredit(creditId) {
        let creditIndex = this.list.findIndex(e => e.creditId == creditId)
        if (creditIndex != -1) {
            this.list.splice(creditIndex, 1)
            return true
        }
        return false
    }

    checkCredit(serviceId) {
        let creditIndex = this.list.findIndex(e => e.serviceId == serviceId && e.status == 'active')
        if (creditIndex >= 0)
            return this.list[creditIndex].creditId
        else
            return false
    }

    clearCredits() {
        this.list = []
    }
}