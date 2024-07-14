import { Appointment } from "../models/appointment-model.js"
import { Appointments } from "../models/appointments-model.js"
import { Credit } from "../models/credit-model.js"
import { Credits } from "../models/credits-model.js"
import { Availability } from "../models/availability-model.js"
import { Availabilities } from "../models/availabilities-model.js"

import { routes } from "../api/routes.js"

import { createCookie, getCookie } from "./cookie-controller.js"

import { SERVICES } from "../helpers/entities-helper.js"

export class AppointmentsController  {
    constructor() {
        this.appointments = new Appointments()
        this.credits = new Credits()

        this.updateCredits()
        this.updateAppointments()
    }

    updateCredits() {
        let getUserCredits = []
        // if (!getCookie('userCredits')) {
            getUserCredits = routes.getCreditsServer()
        //     createCookie('userCredits', JSON.stringify(getUserCredits))
        // } else
        //     getUserCredits.push(JSON.parse(getCookie('userCredits')))
        getUserCredits.map(e => {
            let newCredit = new Credit(e.creditId, e.userId, e.serviceId, e.status)
            this.credits.insertCredit(newCredit)
        })
    }

    retrieveCredits() {
        return this.credits.getCredits
    }

    retrieveShortCredits() {
        return this.credits.getShortCredits
    }

    updateAppointments() {    
        let getUserAppointments = []
        // if (!getCookie('userAppointments')) {
            let serverUserAppointments = routes.getAppointmentsServer()
            getUserAppointments.concat(serverUserAppointments)
        //     createCookie('userAppointments', JSON.stringify(getUserAppointments))
        // } else
        // getUserAppointments.push(JSON.parse(getCookie('userAppointments')))
        getUserAppointments.map(e => {
            let newAppointment = new Appointment(e.appointmentId, e.userId, e.date, e.time, e.serviceId)
            this.appointments.insertAppointment(newAppointment)
        })
    }

    retrieveAppointments() {
        return this.appointments.getAppointments
    }

    newAppointment(inputDate, inputTime, inputService) { 
        let userId = 1 // TEMPORARY
        let year = inputDate.slice(0, 4)
        let month = inputDate.slice(5, 7)
        let day = inputDate.slice(8, 10)
        let hour = inputTime.slice(0, 2)
        let minute = inputTime.slice(3, 5)
        let serviceId = SERVICES.indexOf(e => e.name == inputService)
        let appointmentId = routes.nextAppointmentId()

        let creditId = findAvailableCredit(serviceId)
        if (creditId <= 0) {
            return false
        }
        let appointment = new Appointment(appointmentId, userId, {year, month, day}, {hour, minute}, serviceId)
        routes.newAppointment(appointment)
        routes.changeCreditStatus(creditId, 'inactive')
        
        this.updateCredits()
        this.updateAppointments()
        return true
    }

    deleteAppointment(appointmentId) {
        let userAppointments = getCookie('userAppointments')
        const index = userAppointments.indexOf(object)
        if (index > -1) {
            // #### PENDING -- remove from server
            userAppointments.splice(index, 1)
            createCookie('userAppointments', userAppointments)
            this.updateCredits()
            this.updateAppointments()
            return true
        }
        return false
    }

    retrieveAvailabilities(inputDate, inputService) {
        let year = inputDate.slice(0, 4)
        let month = inputDate.slice(5, 7)
        let day = inputDate.slice(8, 10)
        let serviceId = SERVICES.indexOf(e => e.name == inputService)

        let avaliabilityList = new Availabilities()
        let serverAvailabilityList = routes.getAvailabilityServer({year, month, day}, serviceId)
        serverAvailabilityList.map(e => {
            let availability = new Availability(e.date, e.time, e.serviceId)
            avaliabilityList.insertAvailability(availability)
        })
        return avaliabilityList.getAvailabilities
    }

}