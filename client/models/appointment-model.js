import { WORKING_DAYS, WORKING_HOURS, MINUTES, SERVICES } from "./entities.js";

export class Appointment {
    constructor(user_id, date_time, service_id) {
        this.user_id = user_id;
        if (SERVICES.find(e => e.id == service_id))
            this.service_id = service_id;
        else
            throw Error('Service not provided');

        let date = new Date(date_time);


        this.year = date.getFullYear();
        this.month = date.getMonth();  
        this.day = date.getDay();      
        this.hour = date.getHours();
        this.minute = date.getMinutes();
    }

    get getDateString() {
        let dateString = ("0" + this.day).slice(-2) + "/" + ("0" + this.month).slice(-2) + "/" + this.year;
        return dateString;
    }

    get getTimeString() {
        let timeString = ("0" + this.hour).slice(-2) + ":" + ("0" + this.minute).slice(-2);
        return timeString;
    }

    get getServiceString() {
        serviceString = SERVICES.find(e => e.id == this.service_id).name;
        return serviceString;

    }
    
    deleteAppointment() {
        // Delete in service
        // If success delete local
    }
}