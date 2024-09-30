import { Appointment } from "./appointment-model.js"

export class Appointments {
    constructor() {
        this._list = []
    }

    get list() {
        return [].concat(this._list)
    }
    
    insertAppointment(appointmentObject) {
        if (appointmentObject instanceof Appointment) {
            this._list.push(appointmentObject)
            return true
        }
        return false
    }

    clearAppointments() {
        this._list = []
    }
}