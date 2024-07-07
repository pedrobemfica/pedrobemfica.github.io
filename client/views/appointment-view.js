import { SERVICES } from "../models/entities.js";
import { retrieveAvailableDateTime, newAppointment } from '../controllers/appointment-controller.js';
import { getCookie } from "../controllers/cookie-handler.js";

export class AppointmentView {
    constructor() {
        this.initializeElements();
        this.updateCredits();
        this.updateList();
    }

    initializeElements() {

        const inputService = document.getElementById('inputService');
        const appointmentParamsForm = document.getElementById('appointmentParamsForm');
        const appointmentNewForm = document.getElementById('appointmentNewForm');
        const appointmentNewButton = document.getElementById('appointmentNewButton');

        inputService.innerHTML = '';
        for (let service in SERVICES) {
            let selected = '';
            if (!service)
                selected = 'selected';
            inputService.innerHTML += `<option ${selected} value="${SERVICES[service].id}">${SERVICES[service].name}</option>`;
        }

        appointmentParamsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.listAvailability(inputDate.value, inputService.value);
        });

        appointmentNewForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let radioValue;
            let radioElements = document.getElementsByTagName('input');
            for (let i = 0, length = radioElements.length; i < length; i++)
                if (radioElements[i].type = "radio")
                    if (radioElements[i].checked)
                        radioValue = radioElements[i].value;
            this.newAppointment(inputDate.value, radioValue, inputService.value);
        });

        appointmentNewButton.classList.add("buthidden");
    }

    updateCredits() {
        const creditsDisplay = document.getElementById('creditsDisplay');
        
        let userCredits = []
        userCredits.push(...JSON.parse(getCookie('userCredits')));

        creditsDisplay.innerHTML = '';
        for (let credit in userCredits) {
            let service = SERVICES.find(e => e.id == userCredits[credit].service);
            creditsDisplay.innerHTML += `<button type="button" class="btn btn-primary">
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
            let showDate = ("0" + userAppointments[appointment].day).slice(-2) + "/" + ("0" + userAppointments[appointment].month + 1).slice(-2) + "/" + ("000" + userAppointments[appointment].year).slice(-4);
            let showTime = ("0" + userAppointments[appointment].hour).slice(-2) + ":" + ("0" + userAppointments[appointment].minute).slice(-2);
            appointmentList.innerHTML += `<td>${showDate}</td>
                                        <td>${showTime}</td>
                                        <td>${showService}</td>
                                        <td><button type="button" class="btn btn-outline-primary">
                                            <i class="fa-solid fa-trash-can"></i></button>
                                            <button type="button" class="btn btn-outline-primary">
                                            <i class="fa-solid fa-download"></i></button>
                                        </td>`
        }
    }

    listAvailability(input_date, service) {
        const appointmentNewList = document.getElementById('appointmentNewList');
        const appointmentNewButton = document.getElementById('appointmentNewButton');
        const noAvailabilityMessage = document.getElementById('noAvailabilityMessage');

        let date_year = input_date.substring(0, 4);
        let date_month = input_date.substring(5, 7);
        let date_day = input_date.substring(8, 10);

        let getAvailabilityList = retrieveAvailableDateTime(date_year, date_month, date_day, service);

        appointmentNewList.innerHTML = '';
        for (let availability in getAvailabilityList) {
            let timeString = ("0" + getAvailabilityList[availability].hour).slice(-2) + ":" + ("0" + getAvailabilityList[availability].minute).slice(-2);
            appointmentNewList.innerHTML += `<div class="form-check">
                                                <input class="form-check-input" type="radio" name="inputTimeRadio" id="inputTimeRadio" value="${timeString}">
                                                <label class="form-check-label" for="inputTimeRadio">
                                                    ${timeString}
                                                </label>
                                            </div>`
        }
        
        if (getAvailabilityList.length != 0) {
            appointmentNewButton.classList.remove('buthidden');
            noAvailabilityMessage.classList.add('buthidden');
        }
        else {
            appointmentNewButton.classList.add("buthidden");
            noAvailabilityMessage.classList.remove('buthidden');
        }
    }

    newAppointment(input_date, input_time, service) {
        let date_year = input_date.substring(0, 4);
        let date_month = input_date.substring(5, 7);
        let date_day = input_date.substring(8, 10);

        let date_hour = input_time.substring(0, 2);
        let date_minute = input_time.substring(3, 4);

        let date_time = new Date(date_year, date_month, date_day, date_hour, date_minute);
        let service_id = service; 

        newAppointment(date_time, service_id);
        this.updateList();
    }
}
