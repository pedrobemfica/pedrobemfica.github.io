import { SERVICES, MONTHS, WORKING_HOURS, MINUTES } from "../models/entities.js";
import { retrieveAvailableDateTime } from '../controllers/appointment-controller.js';

export class AppointmentView {
    constructor(user_id, userCredits, userAppointments) {
        this.user_id = user_id;
        this.initializeElements();
        this.updateCredits(user_id);
        this.updateList(user_id);
        this.userCredits = userCredits
        this.userAppointments = userAppointments;
    }

    initializeElements() {

        const inputService = document.getElementById('inputService');
        const appointmentParamsForm = document.getElementById('appointmentParamsForm');
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
            this.listAvailability(inputDate.value.substring(0, 4), inputDate.value.substring(5, 7), inputDate.value.substring(8, 10), inputService.value);
        });

        appointmentNewButton.classList.add("buthidden");
        appointmentNewButton.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }

    updateCredits() {
        const creditsDisplay = document.getElementById('creditsDisplay');
        
        let getCreditList = this.userCredits;
        
        creditsDisplay.innerHTML = '';
        for (let credit in getCreditList) {
            let service = SERVICES.find(e => e.id == getCreditList[credit].service);
            creditsDisplay.innerHTML += `<button type="button" class="btn btn-primary">
                                            ${service.name} <span class="badge text-bg-secondary">${getCreditList[credit].quantity}</span>
                                        </button>`
        }
    }

    listAvailability(date_year, date_month, date_day, service) {
        const appointmentNewForm = document.getElementById('appointmentNewForm');
        const appointmentNewButton = document.getElementById('appointmentNewButton');
        const noAvailabilityMessage = document.getElementById('noAvailabilityMessage');
        
        let getAvailabilityList = retrieveAvailableDateTime(date_year, date_month, date_day, service);
        
        appointmentNewForm.innerHTML = '';
        for (let availability in getAvailabilityList) {
            let timeString = ("0" + getAvailabilityList[availability].hour).slice(-2) + ":" + ("0" + getAvailabilityList[availability].minute).slice(-2);
            appointmentNewForm.innerHTML += `<div class="form-check">
                                                <input class="form-check-input" type="radio" name="inputTimeRadio" value="${timeString}">
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

    updateList() {
        const appointmentList = document.getElementById('appointmentList');
        
        let getAppointmentList = this.userAppointments;
        
        appointmentList.innerHTML = '';
        for (let appointment in getAppointmentList) {
            let showService = SERVICES.find(e => e.id == getAppointmentList[appointment].service).name;
            let showDate = ("0" + getAppointmentList[appointment].day).slice(-2) + "/" + ("0" + getAppointmentList[appointment].month).slice(-2) + "/" + ("000" + getAppointmentList[appointment].year).slice(-4);
            let showTime = ("0" + getAppointmentList[appointment].hour).slice(-2) + ":" + ("0" + getAppointmentList[appointment].minute).slice(-2);
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
}
