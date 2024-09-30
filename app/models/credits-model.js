import { Credit } from './credit-model.js'

export class Credits {
    constructor() {
        this._list = []
    }

    get list() {
        return [].concat(this._list)
    }

    get shortList() {
        let shortCreditList =[]
        this._list.map(e => {
            let creditIndex = shortCreditList.findIndex(o => o.serviceId == e.serviceId)
            if (creditIndex != -1) 
                shortCreditList[creditIndex].quantity += 1
            else {
                shortCreditList.push({serviceId: e.serviceId, quantity: 1})
            }
        })
        return [].concat(shortCreditList)
    }

    insertCredit(creditObject) {
        if (creditObject instanceof Credit) {
            this._list.push(creditObject)
            return true;
        }
        return false;
    }

    clearCredits() {
        this._list = []
    }
}