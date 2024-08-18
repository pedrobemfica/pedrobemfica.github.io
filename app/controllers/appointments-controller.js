import { Appointment } from "../models/appointment-model.js"
import { Appointments } from "../models/appointments-model.js"
import { Credit } from "../models/credit-model.js"
import { Credits } from "../models/credits-model.js"
import { Availability } from "../models/availability-model.js"
import { Availabilities } from "../models/availabilities-model.js"
import { UserController } from "./user-controller.js"

import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"

export class AppointmentsController  {
    constructor() {
        this.userController = new UserController()
        this.user = this.userController.checkUser()
        this.appointments = new Appointments()
        this.credits = new Credits()

        this.updateCredits()
        this.updateAppointments()
    }

    updateCredits() {
        let getUserCredits = []
        this.credits.clearCredits()
        getUserCredits = routes.getCreditsServer(this.user.userId, this.user.jwt)
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
        this.appointments.clearAppointments()
        getUserAppointments = routes.getAppointmentsServer(this.user.userId, this.user.jwt)
        getUserAppointments.map(e => {
            let newAppointment = new Appointment(e.appointmentId, e.userId, e.date, e.time, e.serviceId)
            this.appointments.insertAppointment(newAppointment)
        })
    }

    retrieveAppointments() {
        return this.appointments.getAppointments
    }

    newAppointment(inputDate, inputTime, inputService) { 
        let userId = this.checkLoggedser().id
        let date = {year: inputDate.slice(0, 4), month: inputDate.slice(5, 7), day: inputDate.slice(8, 10)}
        let time = {hour: inputTime.slice(0, 2), minute: inputTime.slice(3, 5)}
        let serviceId = inputService
        let appointmentId = routes.nextAppointmentId(this.user.userId, this.user.jwt)
        
        let creditId = this.credits.checkCredit(serviceId)
        if (creditId) {
            let appointment = new Appointment(appointmentId, userId, date, time, serviceId)
            routes.newAppointment(appointment, this.user.userId, this.user.jwt)
            routes.changeCreditStatus(creditId, 'inactive', this.user.userId, this.user.jwt)
            alertMessage('Agendamento confirmado', 'O crédito foi debitado da carteira e o serviço inserido na agenda.')
        } else
            alertMessage('Não foi possível o agendamento', 'Você não possui crédito para realizar esse agendamento. Adquira novos créditos e tente novamente.')
        
        this.updateCredits()
        this.updateAppointments()
    }

    deleteAppointment(appointmentId) {
        let confirm = routes.deleteAppointment(appointmentId, this.user.userId, this.user.jwt)
        if (confirm) {
            let userId = this.checkLoggedser().id
            let serviceId = this.appointments.getAppointmentById(appointmentId).serviceId
            let creditId = routes.nextCreditId(this.user.userId, this.user.jwt)
            let credit = new Credit(creditId, userId, serviceId, 'active')
            routes.newCredit(credit, this.user.userId, this.user.jwt)
            alertMessage('Agendamento removido', 'O crédito foi devolvido para a carteira e o serviço removido da agenda.')
        } else
            alertMessage('Não foi possível apagar', 'Algum erro ocorreu e a ação não foi concluída.')
        
        this.updateCredits()
        this.updateAppointments()
    }

    generateCalendar(appointmentId) {
        
    }

    retrieveAvailabilities(inputDate, inputService) {
        let year = inputDate.slice(0, 4)
        let month = inputDate.slice(5, 7)
        let day = inputDate.slice(8, 10)
        let serviceId = inputService

        let avaliabilityList = new Availabilities()
        let serverAvailabilityList = routes.getAvailabilityServer({year, month, day}, serviceId, this.user.userId, this.user.jwt)
        serverAvailabilityList.map(e => {
            let availability = new Availability(e.date, e.time, e.serviceId)
            avaliabilityList.insertAvailability(availability)
        })
        return avaliabilityList.getAvailabilities
    }

    checkLoggedUser() {
        if (this.user)
            if (this.user.logged)
                return this.user
        return false
    }
}