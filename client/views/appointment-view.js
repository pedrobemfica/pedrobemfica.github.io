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
        const inputDate = document.getElementById('inputDate');
        const appointmentParamsForm = document.getElementById('appointmentParamsForm');

        inputService.innerHTML = '';
        for (let service in SERVICES) {
            let seleted = '';
            if (!service)
                seleted = 'selected';
            inputService.innerHTML += `<option ${seleted} value="${SERVICES[service].id}">${SERVICES[service].name}</option>`;
        }

        const currentDate = new Date();
        const today = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDay();
        inputDate.setAttribute('value', today);
        inputDate.value = today;

        appointmentParamsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.listAvailability(inputDate.value.substring(0, 4), inputDate.value.substring(5, 7), inputDate.value.substring(8, 10), inputService.value);
        })
    }

    updateCredits(user_id) {
        const creditsDisplay = document.getElementById('creditsDisplay');
        creditsDisplay.innerHTML = '';
        for (let credit in mockCredits) {
            let service = SERVICES.find(e => e.id == mockCredits[credit].service);
            creditsDisplay.innerHTML += `<button type="button" class="btn btn-primary">
                                            ${service.name} <span class="badge text-bg-secondary">${mockCredits[credit].quantity}</span>
                                        </button>`
        }
    }

    updateList(user_id) {
        const appointmentList = document.getElementById('appointmentList');
    }

    listAvailability(date_year, date_month, date_day, service) {
        const appointmentNewForm = document.getElementById('appointmentNewForm');

        let availabilityList = mockAvailability.filter(e => (e.year == date_year && e.month == date_month && e.day == date_day && e.service == service));

        appointmentNewForm.innerHTML = '';
        for (let availability in availabilityList) {
                            appointmentNewForm.innerHTML += `<div class="form-check">
                                        <input class="form-check-input" type="radio" name="inputTimeRadio">
                                        <label class="form-check-label" for="inputTimeRadio">
                                            ${availabilityList[availability].hour} : ${availabilityList[availability].minute}
                                        </label>
                                        </div>`
        }
        if (availabilityList.length != 0) {
            appointmentNewForm.innerHTML += `<button type="submit" class="btn btn-primary " id="appointmentNewButton">Agendar</button>`
            const appointmentNewButton = document.getElementById('appointmentNewButton');
            appointmentNewButton.addEventListener('submit', (event) => {
                event.preventDefault();
            })
        }
    }
}
