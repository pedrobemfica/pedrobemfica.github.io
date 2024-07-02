import { SERVICES, WORKING_HOURS, MINUTES } from "../models/entities.js";

export function initializeAvailability() {

    const serviceList = document.getElementById('service-list');
    const serviceHour = document.getElementById('service-hour');
    const serviceMinute = document.getElementById('service-minute');

    for (let service in SERVICES) {
        let listItem = document.createElement('li')
        listItem.innerHTML = `<a class="dropdown-item" href="#">${SERVICES[service]}</a>`;
        serviceList.appendChild(listItem);
    }

    for (let hour in WORKING_HOURS) {
        let listItem = document.createElement('li')
        listItem.innerHTML = `<a class="dropdown-item" href="#">${WORKING_HOURS[hour]}</a>`;
        serviceHour.appendChild(listItem);
    }

    for (let minute in MINUTES) {
        let listItem = document.createElement('li')
        listItem.innerHTML = `<a class="dropdown-item" href="#">${MINUTES[minute]}</a>`;
        serviceMinute.appendChild(listItem);
    }
}