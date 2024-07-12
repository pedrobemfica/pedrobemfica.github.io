import { mockAvailability, mockAppointments, mockCredits } from "../../mockServer.js"; // ### TEMPORARY

export const routes = {
    async getAppointmentsServer(userId) {
        let serverList = mockAppointments; // ### TEMPORARY
        return serverList.filter(e => e.userId == userId);
    },

    async newAppointment(appointment) {
        mockAppointments.push(appointment); // ### TEMPORARY
        return true;
    },

    async deleteAppointment(appointmentId) {
        let index = mockAppointments.find(e => e.appointmentId == appointmentId);
        mockAppointments = mockAppointments.splice(index, 1);
        return true;
    },

    async getAvailabilityServer({year, month, day}, serviceId) {
        let serverList = mockAvailability; // ### TEMPORARY
        let lisTime = serverList
            .filter(e => e.date.year == year && e.date.month == month && e.date.day == day && e.serviceId == serviceId)
            .map(e =>  e.time);
        return lisTime;
    },

    async getCreditsServer(userId) {
        let serverList = mockCredits; // ### TEMPORARY
        return serverList.filter(e => e.userId == userId && e.status == 'active');
    }
}