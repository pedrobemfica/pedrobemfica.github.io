import { AppointmentsController } from "../controllers/appointments-controller"
import { SERVICES } from "../helpers/entities-helper.js"

export class AppointmentsView {
    constructor() {
        this.creditsShortList = []
        this.appointmentsList = []

        this.appointmentsController = new AppointmentsController()
        
        this.creditsShortList = document.getElementById('creditsShortList')
        this.availabilitiesList = document.getElementById('availabilitiesList')
        this.appointmentsList = document.getElementById('appointmentsList')
        
        this.inputServicesAppointmentFilter = document.getElementById('inputServicesListAppointmentFilter')
        this.inputDateAppointmentFilter = document.getElementById('inputDateAppointmentFilter')
        this.inputTimeAppointmentFilter = document.getElementById('this.inputTimeAppointmentFilter')
        
        this.newAppointmentFilterForm = document.getElementById('newAppointmentFilterForm')
        this.newAppointmentFilterForm.addEventListener('submit', event => {
            event.preventDefault()
            showAvailabilitiesList(this.appointmentsController.retrieveAvailableDateTime(
                this.inputDateAppointmentFilter.value, 
                this.inputServicesAppointmentFilter.value
            ))
        })

        this.newAppointmentListForm = document.getElementById('newAppointmentListForm')
        this.newAppointmentListForm.addEventListener('submit', event => {
            event.preventDefault()
            this.appointmentsController.newAppointment(
                this.inputDateAppointmentFilter.value, 
                this.inputTimeAppointmentFilter.value, 
                this.inputServicesAppointmentFilter.value
            )
            this.updateView()
        })

        this.creditsShortListMessage = document.getElementById('creditsShortListMessage')
        this.availabilitiesListMessage = document.getElementById('availabilitiesListMessage')
        this.appointmentsListMessage = document.getElementById('appointmentsListMessage')

        this.updateView()
    }

    updateView() {
        this.creditsShortList = this.appointmentsController.retrieveShortCredits()
        this.showCreditsShortList()
        this.appointmentsList = this.appointmentsController.retrieveAppointments()
        this.showAppointmentsList()

        this.startServicesSelector()
        this.startInitialDateInput()
        this.clearAvailabilitiesList()
    }

    showCreditsShortList() { 
        this.creditsShortList.innerHTML = ''
        for (let credit in this.creditsShortList)
            this.creditsShortList.innerHTML += `<button type="button" class="btn btn-primary">
                                    ${this.creditsShortList[credit].creditName}<span class="badge text-bg-secondary">
                                    ${this.creditsShortList[credit].quantity}</span></button>`
        }

    showAppointmentsList() {        
        this.appointmentsList.innerHTML = ''
        for (let appointment in this.appointmentsList) {
            this.appointmentsList.innerHTML += `<td>${this.appointmentsList[appointment].getDateString()}</td>
                                                <td>${this.appointmentsList[appointment].getTimeString()}</td>
                                                <td>${this.appointmentsList[appointment].getServiceString()}</td>
                                                <td><form id="appointmentItemForm${this.appointmentsList[appointment].getAppointmentId()}">
                                                <input type="hidden" name="appointmentItem" 
                                                id="appointmentItem${this.appointmentsList[appointment].getAppointmentId()}" 
                                                value="${this.appointmentsList[appointment].getAppointmentId()}">
                                                <button type="button" class="btn btn-outline-primary">
                                                <i class="fa-solid fa-trash-can"></i></button>
                                                <button type="button" class="btn btn-outline-primary">
                                                <i class="fa-solid fa-download"></i></button>
                                                </form></td>`
        }
    }
                                
    showAvailabilitiesList(availabilitiesList) {
        this.availabilitiesList.innerHTML = ''
        for (let availability in availabilitiesList) {
            let timeString = ("0" + availabilitiesList[availability].hour).slice(-2) + ":" + ("0" + availabilitiesList[availability].minute).slice(-2)
            this.availabilitiesList.innerHTML += `<div class="form-check">
                                                    <input class="form-check-input" type="radio" id="inputTimeAppointmentFilter" 
                                                    name="inputTimeRadio${availability}" value="${timeString}">
                                                    <label class="form-check-label" for="inputTimeRadio${availability}">
                                                    ${timeString}</label></div>`
                                                }
        
        if (availabilitiesList.length != 0) {
            this.newAppointmentListForm.classList.remove('element-hidden')
            this.availabilitiesListMessage.classList.add('element-hidden')
        }
        else {
            this.newAppointmentListForm.classList.add("element-hidden")
            this.availabilitiesListMessage.classList.remove('element-hidden')
        }
    }

    clearAvailabilitiesList() {
        this.availabilitiesList.innerHTML = ''
        this.newAppointmentListForm.classList.add('element-hidden')
        this.availabilitiesListMessage.classList.add('element-hidden')
    }

    startServicesSelector() {
        this.inputServicesListAppointmentFilter.innerHTML = ''
        for (let service in SERVICES) {
            let selected = ''
            if (!service)
                selected = 'selected'
            this.inputServicesListAppointmentFilter.innerHTML += `<option ${selected} value="${SERVICES[service].id}">
                                                            ${SERVICES[service].name}</option>`
        }
        this.inputServicesListAppointmentFilter.addEventListener('input', () => this.clearAvailabilitiesList())
    }

    startInitialDateInput() {
        let current_date = new Date()
        let current_year = current_date.getFullYear()
        let current_month = current_date.getMonth() + 1
        let current_day = current_date.getDate()
        let show_date = `${current_year}-${("0" + current_month).slice(-2)}-${("0" + current_day).slice(-2)}`
        this.inputDateAppointmentFilter.value = show_date
        this.inputDateAppointmentFilter.addEventListener('input', () => this.clearAvailabilitiesList())
    }      
}
