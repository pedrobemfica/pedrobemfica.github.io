import { mockAvailability, mockAppointments, mockCredits, mockFiles, mockCart } from "../../mockServer.js"

export const routes = {
    getAppointmentsServer() {
        return [].concat(mockAppointments)
    },

    nextAppointmentId() {
        let nextAppointmentId = Math.max(...mockAppointments.map(e => e.appointmentId)) + 1
        if (nextAppointmentId == -Infinity)
            nextAppointmentId = 1
        return nextAppointmentId
    },

    newAppointment(appointment) {
        let dateObj = {year: appointment.year, month: appointment.month, day: appointment.day}
        let timeObj = {hour: appointment.hour, minute: appointment.minute}
        let newObj = {
            appointmentId: appointment.appointmentId,
            userId: appointment.userId,
            date: dateObj,
            time: timeObj,
            serviceId: appointment.serviceId
        };
        mockAppointments.push(newObj)
        return true
    },

    deleteAppointment(appointmentId) {
        let index = mockAppointments.findIndex(e => e.appointmentId == appointmentId)
        mockAppointments.splice(index, 1)
        return true
    },

    getCreditsServer() {
        return mockCredits.filter(e => e.status == 'active')
    },

    nextCreditId() {
        let nextCreditId = Math.max(...mockCredits.map(e => e.creditId)) + 1
        if (nextCreditId == -Infinity)
            nextCreditId = 1
        return nextCreditId
    },

    newCredit(credit) {
        let newObj = {
            creditId: credit.creditId, 
            userId: credit.userId,
            serviceId: credit.serviceId,
            status: credit.status
        };
        mockCredits.push(newObj)
        return true
    },

    changeCreditStatus(creditId, newStatus) {
        let index = mockCredits.findIndex(e => e.creditId == creditId)
        mockCredits[index].status = newStatus
        return true
    },

    getAvailabilityServer({year, month, day}, serviceId) {
        return mockAvailability.filter(e => e.date.year == year && e.date.month == month && e.date.day == day && e.serviceId == serviceId)
    },

    getFilesServer() {
        return [].concat(mockFiles)
    },

    nextFileId() {
        let nextFileId = Math.max(...mockFiles.map(e => e.fileId)) + 1
        if (nextFileId == -Infinity)
            nextFileId = 1
        return nextFileId
    },

    newFile(file) {
        let dateObj = {year: file.year, month: file.month, day: file.day}
        let newObj = {
            fileId: file.fileId,
            userId: file.userId,
            date: dateObj,
            label: file.label,
            path: file.path
        };
        mockFiles.push(newObj)
        return true
    },

    deleteFile(fileId) {
        let index = mockFiles.findIndex(e => e.fileId == fileId)
        mockFiles.splice(index, 1)
        return true
    },

    addToCart(serviceId) {
        let newObj = {serviceId: serviceId}
        mockCart.push(newObj)
        console.log(mockCart)
        return true
    }
}