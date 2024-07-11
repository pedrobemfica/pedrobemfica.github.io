import { Credit } from './credit-model.js';

export class Credits {
    constructor() {
        this.list = [];
    }

    get getCredits() {
        return this.list;
    }

    insertCredit(creditObject) {
        if (creditObject instanceof Credit) {
            this.list.push(creditObject);
            return true;
        }
        return false;
    }

    removeCredit(creditId) {
        let creditIndex = this.list.findIndex(e => e.creditId == creditId);
        if (creditIndex != -1) {
            this.list.splice(creditIndex, 1);
            return true;
        }
        return false;
    }

    findCreditById(creditId) {
        return this.list.find(e => e.creditId == creditId);
    }
}