import { WORKING_DAYS, WORKING_HOURS, MINUTES, SERVICES } from "./entities.js";

export class Appointment {
    constructor(user_id, date_time, service_id) {
        this.user_id = user_id;
        if (service_id in SERVICES)
            this.service_id = service_id;
        else
            throw Error('Service not provided');

        let date = new Date(date_time);
        
        if (!isNaN(date)) {
            let year = date.getFullYear();
            let month = date.getMonth();  
            let day = date.getDay();      
            let hour = date.getHours();
            let minute = date.getMinutes();
        } else
            throw Error('Date not valid');

        let current_date = new Date(date_time);
        let current_year = current_date.getFullYear();
        let current_month = current_date.getMonth();  
        let current_day = current_date.getDay();      

        if ((year < current_year) || (year == current_year && month < current_month) || ((year == current_year && month == current_month && day <= current_day)))
            throw Error('Current day or in the past');
        else if (!(day in WORKING_DAYS))
            throw Error('Not a working day');
        else {
            this.year = year;
            this.month = month;
            this.day = day;
        }

        if (!(hour in WORKING_HOURS) || !(minute in MINUTES))
            throw Error('Not a valid working hour')
        else {
            this.hour = hour;
            this.minute = minute;
        }
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