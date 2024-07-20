import { AppointmentsController } from "../controllers/appointments-controller.js"
import { Services } from "../models/services-model.js"

export class AppointmentsView {
    constructor() {
        this.creditsList = []
        this.appointmentsList = []

        this.appointmentsController = new AppointmentsController()

        this.allSections = document.getElementsByTagName('section')
        this.creditsShortList = document.getElementById('creditsShortList')
        this.availabilitiesListTitle = document.getElementById('availabilitiesListTitle')
        this.availabilitiesListButton = document.getElementById('availabilitiesListButton')
        this.availabilitiesList = document.getElementById('availabilitiesList')
        this.appointmentsTable = document.getElementById('appointmentsTable')
        this.appointmentsCompleteList = document.getElementById('appointmentsCompleteList')
        
        this.inputServicesAppointmentFilter = document.getElementById('inputServicesAppointmentFilter')
        this.inputDateAppointmentFilter = document.getElementById('inputDateAppointmentFilter')
        
        this.userLoggedMessage = document.getElementById('userLoggedMessage')
        this.creditsShortListMessage = document.getElementById('creditsShortListMessage')
        this.availabilitiesListMessage = document.getElementById('availabilitiesListMessage')
        this.appointmentsListMessage = document.getElementById('appointmentsListMessage')

        this.newAppointmentFilterForm = document.getElementById('newAppointmentFilterForm')
        this.newAppointmentListForm = document.getElementById('newAppointmentListForm')
        
        this.newAppointmentFilterForm.addEventListener('submit', event => {
            event.preventDefault()
            let getList = this.appointmentsController.retrieveAvailabilities(
                this.inputDateAppointmentFilter.value, 
                this.inputServicesAppointmentFilter.value
            )
            this.showAvailabilitiesList(getList)
        })

        this.newAppointmentListForm.addEventListener('submit', event => {
            event.preventDefault()           
            let inputTimeAppointment = this.getRadioTime()
            this.appointmentsController.newAppointment(
                this.inputDateAppointmentFilter.value, 
                inputTimeAppointment, 
                this.inputServicesAppointmentFilter.value
            )
            this.updateView()
        })
        this.updateView()
    }
    
    updateView() {
        this.checkLoggedUser()
        this.showCreditsShortList()
        this.showAppointmentsList()
        
        this.startServicesSelector()
        this.startInitialDateInput()
        this.clearAvailabilitiesList()
    }
    
    checkLoggedUser() {
        this.loggedUser = this.appointmentsController.checkLoggedser()
        if (!this.loggedUser) {
            Array.from(this.allSections).forEach(e => e.classList.add('element-hidden'))
            this.userLoggedMessage.classList.remove('element-hidden')
        } else {
            Array.from(this.allSections).forEach(e => e.classList.remove('element-hidden'))
            this.userLoggedMessage.classList.add('element-hidden')
        }
    }
    
    showCreditsShortList() { 
        this.creditsList = this.appointmentsController.retrieveShortCredits()
        let services = new Services()
        if (this.creditsList.length <= 0) {
            this.creditsShortListMessage.classList.remove('element-hidden')
            this.creditsShortList.classList.add('element-hidden')
        } else {
            this.creditsShortListMessage.classList.add('element-hidden')
            this.creditsShortList.classList.remove('element-hidden')
            this.creditsShortList.innerHTML = ''
            for (let credit in this.creditsList) {
                let serviceName = services.getStringById(this.creditsList[credit].serviceId)
                this.creditsShortList.innerHTML += `<button type="button" class="btn btn-primary credit-appointment--badge">
                                        ${serviceName}<span class="badge text-bg-secondary">
                                        ${this.creditsList[credit].quantity}</span></button>`
            }
        }
    }

    showAppointmentsList() {  
        this.appointmentsList = this.appointmentsController.retrieveAppointments()
        if (this.appointmentsList.length <= 0) {
            this.appointmentsListMessage.classList.remove('element-hidden')
            this.appointmentsTable.classList.add('element-hidden')
        } else {
            this.appointmentsListMessage.classList.add('element-hidden')
            this.appointmentsTable.classList.remove('element-hidden')
            this.appointmentsCompleteList.innerHTML = ''
            for (let appointment in this.appointmentsList) {
                this.appointmentsCompleteList.innerHTML += `<td>${this.appointmentsList[appointment].getDateString}</td>
                                                    <td>${this.appointmentsList[appointment].getTimeString}</td>
                                                    <td>${this.appointmentsList[appointment].getServiceString}</td>
                                                    <td><form id="appointmentItemForm${this.appointmentsList[appointment].getAppointmentId}">
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="appointmentItemRemoveAction"
                                                    value="${this.appointmentsList[appointment].getAppointmentId}"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="Remove o agendamento">
                                                    <i class="fa-solid fa-trash-can"></i></button>
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="appointmentDownloadCalendarAction"
                                                    value="${this.appointmentsList[appointment].getAppointmentId}"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="Exportar agenda para calendário (ICS)">
                                                    <i class="fa-solid fa-download"></i></button>
                                                    </form></td>`
            }
            this.setAppointmentsActions()
        }
    }
                                
    showAvailabilitiesList(availabilitiesList) {
        if (availabilitiesList.length <= 0) {
            this.availabilitiesListMessage.classList.remove('element-hidden')
            this.newAppointmentListForm.classList.add('element-hidden')
            this.availabilitiesListTitle.classList.add('element-hidden')
            this.availabilitiesListButton.classList.add('element-hidden')
        } else {
            this.availabilitiesListMessage.classList.add('element-hidden')
            this.newAppointmentListForm.classList.remove('element-hidden')
            this.availabilitiesListTitle.classList.remove('element-hidden')
            this.availabilitiesListButton.classList.remove('element-hidden')
            this.availabilitiesList.innerHTML = ''
            for (let availability in availabilitiesList) {
                let timeString = ("0" + availabilitiesList[availability].hour).slice(-2) + ":" + ("0" + availabilitiesList[availability].minute).slice(-2)
                this.availabilitiesList.innerHTML += `<div class="form-check appointments-new--item">
                                                        <input class="form-check-input" type="radio" name="inputTimeAppointmentFilter" 
                                                        id="inputTimeRadio${availability}" value="${timeString}">
                                                        <label class="form-check-label" for="inputTimeRadio${availability}">
                                                        ${timeString}</label></div>`
            }
        }
    }

    clearAvailabilitiesList() {
        this.availabilitiesList.innerHTML = ''
        this.newAppointmentListForm.classList.add('element-hidden')
        this.availabilitiesListMessage.classList.add('element-hidden')
        this.availabilitiesListTitle.classList.add('element-hidden')
        this.availabilitiesListButton.classList.add('element-hidden')
    }
     
    getRadioTime() {
        let inputTimeAppointmentFilter = document.getElementsByName('inputTimeAppointmentFilter')
        let inputTimeAppointment = ''
        inputTimeAppointmentFilter.forEach(e => {
            if (e.checked)
                inputTimeAppointment = e.value
        })
        return inputTimeAppointment
    }

    startServicesSelector() {

        let services = new Services()
        this.inputServicesAppointmentFilter.innerHTML = ''
        for (let credit in this.creditsList) {
            let selected = ''
            if (!credit)
                selected = 'selected'
            this.inputServicesAppointmentFilter.innerHTML += `<option ${selected} value="${this.creditsList[credit].serviceId}">
                                                            ${services.getStringById(this.creditsList[credit].serviceId)}</option>`
        }
        this.inputServicesAppointmentFilter.addEventListener('input', () => this.clearAvailabilitiesList())
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
    
    setAppointmentsActions() {
        let appointmentItemRemoveAction = document.getElementsByName('appointmentItemRemoveAction')
        let appointmentDownloadCalendarAction = document.getElementsByName('appointmentDownloadCalendarAction')
        
        appointmentItemRemoveAction.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.appointmentsController.deleteAppointment(element.value)
            this.updateView()
        }))
        appointmentDownloadCalendarAction.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.appointmentsController.generateCalendar(element.value)
            this.updateView()
        }))

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
}
