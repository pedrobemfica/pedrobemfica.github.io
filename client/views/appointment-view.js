import { SERVICES, MONTHS, WORKING_HOURS, MINUTES } from "../models/entities.js";
import { mockAppointments, mockAvailability, mockCredits, mockFiles, mockUser } from "../mockServer.js";

export class AppointmentView {
    constructor(user_id) {
        this.initializeElements();
        this.updateCredits(user_id);
        this.updateList(user_id);
    }

    initializeElements() {

        const inputService = document.getElementById('inputService');
        const appointmentParamsForm = document.getElementById('appointmentParamsForm');
        const appointmentNewButton = document.getElementById('appointmentNewButton');

        inputService.innerHTML = '';
        for (let service in SERVICES) {
            let seleted = '';
            if (!service)
                seleted = 'selected';
            inputService.innerHTML += `<option ${seleted} value="${SERVICES[service].id}">${SERVICES[service].name}</option>`;
        }

        appointmentParamsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.listAvailability(inputDate.value.substring(0, 4), inputDate.value.substring(5, 7), inputDate.value.substring(8, 10), inputService.value);
        })

        appointmentNewButton.addEventListener('submit', (event) => {
            event.preventDefault();
        })
    }

    updateCredits(user_id) {
        const creditsDisplay = document.getElementById('creditsDisplay');
        
        // #### Update to get from server
        getCreditList = mockCredits;
        
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
        
        // #### Update to get from server
        let getAvailabilityList = mockAvailability.filter(e => (e.year == date_year && e.month == date_month && e.day == date_day && e.service == service));
        
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
        
        if (getAvailabilityList.length != 0) 
            appointmentNewButton.classList.remove("hidden");
        else 
            appointmentNewButton.classList.add("hidden");
    }

    updateList(user_id) {
        const appointmentList = document.getElementById('appointmentList');
        
        // #### Update to get from server
        getAppointmentList = mockAppointments;
        
        appointmentList.innerHTML = '';
        for (let appointment in getAppointmentList) {
            let showService = SERVICES.find(e => e.id == getAppointmentList[appointment].service);
            let showDate = getAppointmentList[appointment].day + "/" + getAppointmentList[appointment].month + "/" + getAppointmentList[appointment].year;
            let showTime = getAppointmentList[appointment].hour + ":" + getAppointmentList[appointment].minute;
            appointmentList.innerHTML += `<td>${showDate}</td><td>${showTime}</td><td>${showService}</td><td>apagar donwload</td>`
        }
    }
}
