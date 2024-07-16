import { Availability } from "./availability-model.js"

export class Availabilities {
    constructor() {
        this.list = []
    }

    get getAvailabilities() {
        return [].concat(this.list)
    }

    insertAvailability(availabilityObject) {
        if (availabilityObject instanceof Availability) {
            this.list.push(availabilityObject)
            return true
        }
        return false
    }
}