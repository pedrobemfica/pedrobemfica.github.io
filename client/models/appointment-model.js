import { SERVICES } from "./entities.js";

export class Appointment {
    constructor(user_id, date_time, service_id) {
        this.user_id = user_id;
        if (SERVICES.find(e => e.id == service_id))
            this.service_id = service_id;
        else
            throw Error('Service not provided');

        this.year = date_time.getFullYear();
        this.month = date_time.getMonth() + 1;  
        this.day = date_time.getDate();      
        this.hour = date_time.getHours();
        this.minute = date_time.getMinutes();
    }
}