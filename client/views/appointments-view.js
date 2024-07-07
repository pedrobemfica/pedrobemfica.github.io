import { SERVICES } from "../models/entities.js";
import { retrieveAvailableDateTime, newAppointment } from '../controllers/appointment-controller.js';
import { getCookie } from "../controllers/cookie-controller.js";

export class AppointmentsView {
    constructor() {
        this.initializeElements();
        this.updateCredits();
        this.updateList();
    }

    initializeElements() {

        const inputService = document.getElementById('inputService');
        const inputDate = document.getElementById('inputDate');
        const appointmentParamsForm = document.getElementById('appointmentParamsForm');
        const appointmentNewForm = document.getElementById('appointmentNewForm');

        inputService.innerHTML = '';
        for (let service in SERVICES) {
            let selected = '';
            if (!service)
                selected = 'selected';
            inputService.innerHTML += `<option ${selected} value="${SERVICES[service].id}">${SERVICES[service].name}</option>`;
        }

        let current_date = new Date();
        let current_year = current_date.getFullYear();
        let current_month = current_date.getMonth() + 1;
        let current_day = current_date.getDate();
        let show_date = `${current_year}-${("0" + current_month).slice(-2)}-${("0" + current_day).slice(-2)}`;
        inputDate.value = show_date;

        appointmentParamsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.listAvailability(inputDate.value, inputService.value);
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
        
        inputDate.addEventListener('input', () => this.clearAvailability());
        inputService.addEventListener('input', () => this.clearAvailability());
        this.clearAvailability();
    }

    updateCredits() {
        const creditsDisplay = document.getElementById('creditsDisplay');
        
        let userCredits = []
        userCredits.push(...JSON.parse(getCookie('userCredits')));

        creditsDisplay.innerHTML = '';
        for (let credit in userCredits) {
            let service = SERVICES.find(e => e.id == userCredits[credit].service);
            creditsDisplay.innerHTML += `<button type="button" class="btn btn-primary appointments-credits--badge">
                                            ${service.name} <span class="badge text-bg-secondary">${userCredits[credit].quantity}</span>
                                        </button>`
        }
    }
    
    updateList() {
        const appointmentList = document.getElementById('appointmentList');
        
        let userAppointments = [];
        userAppointments.push(...JSON.parse(getCookie('userAppointments')));

        appointmentList.innerHTML = '';
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

    listAvailability(input_date, service) {
        const appointmentNewList = document.getElementById('appointmentNewList');
        const appointmentNewButton = document.getElementById('appointmentNewButton');
        const availabilityMessage = document.getElementById('availabilityMessage');

        let date_year = input_date.substring(0, 4);
        let date_month = input_date.substring(5, 7);
        let date_day = input_date.substring(8, 10);

        let getAvailabilityList = retrieveAvailableDateTime(date_year, date_month, date_day, service);

        appointmentNewList.innerHTML = '';
        for (let availability in getAvailabilityList) {
            let timeString = ("0" + getAvailabilityList[availability].hour).slice(-2) + ":" + ("0" + getAvailabilityList[availability].minute).slice(-2);
            appointmentNewList.innerHTML += `<div class="form-check">
                                                <input class="form-check-input" type="radio" name="inputTimeRadio" id="inputTimeRadio${availability}" value="${timeString}">
                                                <label class="form-check-label" for="inputTimeRadio${availability}">
                                                    ${timeString}
                                                </label>
                                            </div>`
        }
        
        if (getAvailabilityList.length != 0) {
            appointmentNewButton.classList.remove('buthidden');
            availabilityMessage.classList.add('buthidden');
        }
        else {
            appointmentNewButton.classList.add("buthidden");
            availabilityMessage.classList.remove('buthidden');
        }
    }

    newAppointment(input_date, input_time, service) {
        let date_year = input_date.substring(0, 4);
        let date_month = input_date.substring(5, 7) - 1;
        let date_day = input_date.substring(8, 10);

        let date_hour = input_time.substring(0, 2);
        let date_minute = input_time.substring(3, 5);

        let date_time = new Date(date_year, date_month, date_day, date_hour, date_minute);
        let service_id = service; 

        newAppointment(date_time, service_id);
        this.updateCredits();
        this.updateList();
        this.clearAvailability();
    }

    clearAvailability() {
        const appointmentNewList = document.getElementById('appointmentNewList');
        const appointmentNewButton = document.getElementById('appointmentNewButton');
        const availabilityMessage = document.getElementById('availabilityMessage');

        appointmentNewList.innerHTML = '';
        appointmentNewButton.classList.add('buthidden');
        availabilityMessage.classList.add('buthidden');
    }
}
