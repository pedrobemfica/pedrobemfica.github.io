import { Appointment } from "../models/appointment-model.js"
import { Appointments } from "../models/appointments-model.js"
import { Credit } from "../models/credit-model.js"
import { Credits } from "../models/credits-model.js"
import { Availability } from "../models/availability-model.js"
import { Availabilities } from "../models/availabilities-model.js"
import { ApiCredits } from "../api/credit-routes.js"
import { ApiAppointments } from "../api/appointment-routes.js"
import { UserController } from "./user-controller.js"
import { ServicesController } from "./services-controller.js"

import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"

export class AppointmentsController  {
    constructor() {
        this.appointments = new Appointments()
        this.credits = new Credits()
        this.userController = new UserController()
        this.servicesController = new ServicesController()
    }

    checkUser() {
        return this.userController.checkUser()
    }

    async updateCredits() {    
        try {
            const data = await ApiCredits.list()
            if (data.result) {
                if (data.list.length <= 0) 
                    this.credits.clearCredits()
                else {
                    this.credits.clearCredits()
                    data.list.map(e => {
                        let newCredit = new Credit(e.creditId, e.serviceId, e.status)
                        this.credits.insertCredit(newCredit)
                    })
                }
            } else
                alertMessage('Falha ao recuperar os créditos', data.message)  
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao recuperar os créditos', err)
        }
        return false
    }

    async retrieveCredits() {
        await this.updateCredits()
        return this.credits.list
    }

    async retrieveShortCredits() {
        await this.updateCredits()
        let viewList = []
        this.credits.shortList.forEach(async e => {
            let serviceName = await this.servicesController.nameService(serviceId)
            viewList.push({name: serviceName, quantity: e.quantity})
        })
        return viewList
    }

    async updateAppointments() {
        try {
            const data = await ApiAppointments.list()
            if (data.result) {
                if (data.list.length <= 0) 
                    this.appointments.clearAppointments()
                else {
                    this.appointments.clearAppointments()
                    data.list.map(e => {
                        let newAppointment = new Appointment(e.appointmentId, e.creditId, e.dateString, e.timeString, e.status)
                        this.appointments.insertAppointment(newAppointment)
                    })
                }
            } else
                alertMessage('Falha ao recuperar os agendamentos', data.message)  
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao recuperar os agendamentos', err)
        }
        return false
    }

    async retrieveAppointments() {
        await this.updateAppointments()
        return this.appointments.list 
    }

    async newAppointment(inputDate, inputTime, inputService) { 
        try {
            const data = await ApiAppointments.create(inputDate, inputTime, inputService)
            if (data.result) {
                alertMessage('Agendamento criado', data.message)
                return true
            } else 
                alertMessage('Falha no agendamento', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no agendamento', err)
        }
        return false
    }

    async deleteAppointment(appointmentId) {
        try {
            const data = await ApiAppointments.delete(appointmentId)
            if (data.result) {
                alertMessage('Agendamento removido', data.message)
                return true
            } else 
                alertMessage('Falha ao deletar agendamento', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao deletar agendamento', err)
        }
        return false
    }

    generateCalendar(appointmentId) {
        
    }

    async retrieveAvailabilities(inputDate, inputService) {
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
}