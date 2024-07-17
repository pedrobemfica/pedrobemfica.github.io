import { Services } from "../helpers/services-helper.js"

export class Availability {
    constructor({year, month, day}, {hour, minute}, serviceId) {
        this.year = year
        this.month = month
        this.day = day
        this.hour = hour
        this.minute = minute
        this.serviceId = serviceId
    }

    get getDateString() {
        let dateString = `${("0" + this.day).slice(-2)}/${("0" + this.month).slice(-2)}/${("0" + this.year).slice(-4)}`
        return dateString
    }

    get getTimeString() {
        let timeString = `${("0" + this.hour).slice(-2)}:${("0" + this.minute).slice(-2)}`
        return timeString
    }

    get getServiceString() {
        let serviceString = Services.getNameById(this.serviceId)
        return serviceString
    }
}