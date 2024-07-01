import { WORKING_DAYS, WORKING_HOURS, MINUTES, SERVICES } from "./entities.js";

export class Appointment {
    constructor(user_id, date_time, service) {
        this.user_id = user_id;
        if (service in SERVICES)
            this.service = service;
        else
            throw Error('Service not provided');

        let date = new Date(date_time);
        
        let year = date.getFullYear();
        let month = date.getMonth();  
        let day = date.getDay();      
        let hour = date.getHours();
        let minute = date.getMinutes();

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

    get getDay() {
        let schedule_date = new Date(this.year, this.month, this.day);
        return schedule_date.toDateString;
    }

    get getTime() {
        let schedule_date = new Date(this.year, this.month, this.day, this.hour, this.minute);
        return schedule_date.toTimeString;
    }
}