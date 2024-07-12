import { SERVICES } from "../models/entities.js";
import { AppointmentsController } from '../controllers/appointments-controller.js';

export class AppointmentsView {
    constructor(credits, appointments) {
        this.initializeElements();
        this.updateCredits(credits);
        this.updateList(appointments);
    }

    initializeElements() {

        const appointmentParamsForm = document.getElementById('appointmentParamsForm');
        const appointmentNewForm = document.getElementById('appointmentNewForm');
        
        // Set list of available services
        const inputService = document.getElementById('inputService');
        inputService.innerHTML = '';
        for (let service in SERVICES) {
            let selected = '';
            if (!service)
                selected = 'selected';
            inputService.innerHTML += `<option ${selected} value="${SERVICES[service].id}">${SERVICES[service].name}</option>`;
        }
       
        // Set initial date to the input
        const inputDate = document.getElementById('inputDate');
        let current_date = new Date();
        let current_year = current_date.getFullYear();
        let current_month = current_date.getMonth() + 1;
        let current_day = current_date.getDate();
        let show_date = `${current_year}-${("0" + current_month).slice(-2)}-${("0" + current_day).slice(-2)}`;
        inputDate.value = show_date;

        // Listener for forms
        appointmentParamsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            AppointmentsController.retrieveAvailableDateTime(inputDate.value, inputService.value).
            then(availableList => this.listAvailability(availableList)).
            catch(err => {throw Error('Error retrieving availability', err)});
        });

        appointmentNewForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let radioValue;
            let radioElements = document.getElementsByTagName('input');
            radioElements = [...radioElements].filter(e => e.type == 'radio');
            for (let i = 0, length = radioElements.length; i < length; i++)
                if (radioElements[i].checked)
                    radioValue = radioElements[i].value;
            this.newAppointment(inputDate.value, radioValue, inputService.value);
                });
        
        // Clear availability list on change
        inputDate.addEventListener('input', () => this.clearAvailability());
        inputService.addEventListener('input', () => this.clearAvailability());
        this.clearAvailability();
    }

    updateCredits() {
        const creditsDisplay = document.getElementById('creditsDisplay');
        const creditsMessage = document.getElementById('creditsMessage');
        
        let userCredits = []
        userCredits.push(...JSON.parse(getCookie('userCredits')));

        creditsDisplay.innerHTML = '';
        if (userCredits.length != 0) 
            creditsMessage.classList.add('element-hidden');
        
        else 
            creditsMessage.classList.remove('element-hidden');
        for (let credit in userCredits) {
            let service = SERVICES.find(e => e.id == userCredits[credit].service);
            creditsDisplay.innerHTML += `<button type="button" class="btn btn-primary appointments-credits--badge">
                                            ${service.name} <span class="badge text-bg-secondary">${userCredits[credit].quantity}</span>
                                        </button>`
        }
    }
    
    updateList() {
        const appointmentList = document.getElementById('appointmentList');
        const appointmentsMessage = document.getElementById('appointmentsMessage');
        const appointmentsTable = document.getElementById('appointmentsTable');
        
        let userAppointments = [];
        

        appointmentList.innerHTML = '';
        if (userAppointments.length != 0) {
            appointmentsMessage.classList.add('element-hidden');
            appointmentsTable.classList.remove('element-hidden');
        } 
        
        else {
            appointmentsMessage.classList.remove('element-hidden');
            appointmentsTable.classList.add('element-hidden');
        }
        
        for (let appointment in userAppointments) {
            let showService = SERVICES.find(e => e.id == userAppointments[appointment].service_id).name;
            let showDate = ("0" + userAppointments[appointment].day).slice(-2) + "/" + ("0" + userAppointments[appointment].month).slice(-2) + "/" + ("000" + userAppointments[appointment].year).slice(-4);
            let showTime = ("0" + userAppointments[appointment].hour).slice(-2) + ":" + ("0" + userAppointments[appointment].minute).slice(-2);
            appointmentList.innerHTML += `<td>${showDate}</td>
                                        <td>${showTime}</td>
                                        <td>${showService}</td>
                                        <td><button type="button" class="btn btn-outline-primary appointments-list--buttons">
                                            <i class="fa-solid fa-trash-can"></i></button>
                                            <button type="button" class="btn btn-outline-primary appointments-list--buttons">
                                            <i class="fa-solid fa-download"></i></button>
                                        </td>`
        }
    }

    listAvailability(availableList) {
        const appointmentNewList = document.getElementById('appointmentNewList');
        const appointmentNewButton = document.getElementById('appointmentNewButton');
        const availabilityMessage = document.getElementById('availabilityMessage');

        appointmentNewList.innerHTML = '';
        for (let availability in availableList) {
            let timeString = ("0" + availableList[availability].hour).slice(-2) + ":" + ("0" + availableList[availability].minute).slice(-2);
            appointmentNewList.innerHTML += `<div class="form-check">
                                                <input class="form-check-input" type="radio" name="inputTimeRadio" id="inputTimeRadio${availability}" value="${timeString}">
                                                <label class="form-check-label" for="inputTimeRadio${availability}">
                                                    ${timeString}
                                                </label>
                                            </div>`
        }
        
        if (availableList.length != 0) {
            appointmentNewButton.classList.remove('element-hidden');
            availabilityMessage.classList.add('element-hidden');
        }
        else {
            appointmentNewButton.classList.add("element-hidden");
            availabilityMessage.classList.remove('element-hidden');
        }
    }

    clearAvailability() {
        const appointmentNewList = document.getElementById('appointmentNewList');
        const appointmentNewButton = document.getElementById('appointmentNewButton');
        const availabilityMessage = document.getElementById('availabilityMessage');

        appointmentNewList.innerHTML = '';
        appointmentNewButton.classList.add('element-hidden');
        availabilityMessage.classList.add('element-hidden');
    }
}
