import { mockAvailability, mockAppointments, mockCredits } from "../../mockServer.js"

export const routes = {
    getAppointmentsServer(userId) {
        let serverList = mockAppointments
        return serverList.filter(e => e.userId == userId)
    },

    nextAppointmentId() {
        return Math.max(...mockAppointments.map(e => e.appointmentId)) + 1
    },

    newAppointment(appointment) {
        mockAppointments.push(appointment)
        return true
    },

    deleteAppointment(appointmentId) {
        let index = mockAppointments.find(e => e.appointmentId == appointmentId)
        mockAppointments = mockAppointments.splice(index, 1)
        return true
    },

    getAvailabilityServer({year, month, day}, serviceId) {
        let serverList = mockAvailability
        return serverList.filter(e => e.date.year == year && e.date.month == month && e.date.day == day && e.serviceId == serviceId)
    },

    getCreditsServer() {
        let serverList = mockCredits
        return serverList.filter(e => e.status == 'active')
    },

    changeCreditStatus(creditId, newStatus) {
        let index = mockCredits.findIndex(e => e.creditId == creditId)
        mockCredits[index].status = newStatus
        return true
    }
}