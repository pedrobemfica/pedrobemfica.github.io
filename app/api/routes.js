import { mockAvailability, mockAppointments, mockCredits, mockCart } from "../../mockServer.js"

export const BACKEND = 'https://backend-olimpo.azurewebsites.net'
// export const BACKEND = 'http://localhost:8080'

export const routes = {
    getAppointmentsServer(userId, jwt) {
        return [].concat(mockAppointments)
    },

    nextAppointmentId(userId, jwt) {
        let nextAppointmentId = Math.max(...mockAppointments.map(e => e.appointmentId)) + 1
        if (nextAppointmentId == -Infinity)
            nextAppointmentId = 1
        return nextAppointmentId
    },

    newAppointment(appointment, userId, jwt) {
        let dateObj = { year: appointment.year, month: appointment.month, day: appointment.day }
        let timeObj = { hour: appointment.hour, minute: appointment.minute }
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

    deleteAppointment(appointmentId, userId, jwt) {
        let index = mockAppointments.findIndex(e => e.appointmentId == appointmentId)
        mockAppointments.splice(index, 1)
        return true
    },

    getCreditsServer(userId, jwt) {
        return mockCredits.filter(e => e.status == 'active')
    },

    nextCreditId(userId, jwt) {
        let nextCreditId = Math.max(...mockCredits.map(e => e.creditId)) + 1
        if (nextCreditId == -Infinity)
            nextCreditId = 1
        return nextCreditId
    },

    newCredit(credit, userId, jwt) {
        let newObj = {
            creditId: credit.creditId,
            userId: credit.userId,
            serviceId: credit.serviceId,
            status: credit.status
        };
        mockCredits.push(newObj)
        return true
    },

    changeCreditStatus(creditId, newStatus, userId, jwt) {
        let index = mockCredits.findIndex(e => e.creditId == creditId)
        mockCredits[index].status = newStatus
        return true
    },

    getAvailabilityServer({ year, month, day }, serviceId, userId, jwt) {
        return mockAvailability.filter(e => e.date.year == year && e.date.month == month && e.date.day == day && e.serviceId == serviceId)
    },

    addToCart(product, userId, jwt) {
        let productIndex = mockCart.findIndex(e => e.product.name == product.name && e.product.description == product.description)
        if (productIndex == -1)
            mockCart.push({ product: product, quantity: 1 })
        else
            mockCart[productIndex].quantity += 1
        return true
    },

    getCartServer(userId, jwt) {
        return [].concat(mockCart)
    },

    deleteFomCart(index, userId, jwt) {
        mockCart.splice(index, 1)
        return true
    },

    clearCart(userId, jwt) {
        mockCart.splice(0, mockCart.length)
        return true
    }
}