import { Credit } from './credit-model.js'

export class Credits {
    constructor() {
        this.list = []
    }

    get getCredits() {
        return this.list
    }

    get getShortCredits() {
        let shortList =[]
        this.list.map(e => {
            let creditIndex = shortList.findIndex(eshort => eshort.id == e.creditId)
            if (creditIndex != -1) 
                shortList[creditIndex].quantity += 1
            else {
                let creditName = SERVICES.find(eservice => eservice.id == e.creditId).name
                shortList.push({id: e.creditId, name: creditName, quantity: 1})
            }
        })
        return shortList
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

    findCreditById(creditId) {
        return this.list.find(e => e.creditId == creditId)
    }
}