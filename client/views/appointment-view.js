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
        creditsDisplay.innerHTML = '';
        for (let credit in mockCredits) {
            let service = SERVICES.find(e => e.id == mockCredits[credit].service);
            creditsDisplay.innerHTML += `<button type="button" class="btn btn-primary">
                                            ${service.name} <span class="badge text-bg-secondary">${mockCredits[credit].quantity}</span>
                                        </button>`
        }
    }

    listAvailability(date_year, date_month, date_day, service) {
        const appointmentNewForm = document.getElementById('appointmentNewForm');
        const appointmentNewButton = document.getElementById('appointmentNewButton');

        let availabilityList = mockAvailability.filter(e => (e.year == date_year && e.month == date_month && e.day == date_day && e.service == service));
        console.log('hi');
        appointmentNewForm.innerHTML = '';
        for (let availability in availabilityList) {
            let timeString = ("0" + availabilityList[availability].hour).slice(-2) + ":" + ("0" + availabilityList[availability].minute).slice(-2);
            appointmentNewForm.innerHTML += `<div class="form-check">
                                                <input class="form-check-input" type="radio" name="inputTimeRadio" value="${timeString}">
                                                <label class="form-check-label" for="inputTimeRadio">
                                                    ${timeString}
                                                </label>
                                            </div>`
        }
        
        if (availabilityList.length != 0) {
            console.log('show');
            appointmentNewButton.classList.remove("hidden");
        } else {
            console.log('hide');
            appointmentNewButton.classList.add("hidden");
        }
    }

    updateList(user_id) {
        const appointmentList = document.getElementById('appointmentList');
    }
}
