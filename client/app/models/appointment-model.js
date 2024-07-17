import { Services } from "../helpers/services-helper.js"

export class Appointment {
    constructor(appointmentId, userId, {year, month, day}, {hour, minute}, serviceId) {
        this.appointmentId = appointmentId
        this.userId = userId
        
        this.year = year
        this.month = month
        this.day = day
        this.hour = hour
        this.minute = minute
        
        if (Services.getNameById(serviceId))
            this.serviceId = serviceId;
        else
            throw Error('Service not provided');
    }

    get getAppointmentId() {
        return this.appointmentId
    }

    get getUserId() {
        return this.userId
    }

    get getDateString() {
        let dateString = `${("0" + this.day).slice(-2)}/${("0" + this.month).slice(-2)}/${("000" + this.year).slice(-4)}`
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