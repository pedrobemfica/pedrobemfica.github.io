import { Appointment } from "./appointment-model.js";

export class Appointments {
    constructor() {
        this.list = [];
    }

    get getAppointments() {
        return this.list;
    }

    insertAppointment(appointmentObject) {
        if (appointmentObject instanceof Appointment) {
            this.list.push(appointmentObject);
            return true;
        }
        return false;
    }

    removeAppointment(appointmentId) {
        let appointmentIndex = this.list.findIndex(e => e.appointmentId == appointmentId);
        if (appointmentIndex != -1) {
            this.list.splice(appointmentIndex, 1);
            return true;
        }
        return false;
    }

    findAppointmentById(appointmentId) {
        return this.list.find(e => e.appointmentId == appointmentId);
    }
}