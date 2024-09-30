export class Appointment {
    constructor(appointmentId, creditId, dateString, timeString, status) {
        this._appointmentId = appointmentId
        this._creditId = creditId
        this._dateString = dateString
        this._timeString = timeString
        this._status = status   
    }

    get appointmentId() {
        return this._appointmentId
    }

    get creditId() {
        return this._creditId
    }

    get dateString() {
        return this._dateString
    }

    get timeString() {
        return this._timeString
    }

    get status() {
        return this._status
    }

    set setStatus(status) {
        if (status == 'created' || 'confirmed' || 'refused' || 'used' || 'cancelled') {
                this._status = status
                return true
            }
        return false
    }
}