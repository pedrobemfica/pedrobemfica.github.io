export class Appointment {
    constructor(user_id, date_time) {
        this.user_id = user_id;
        
        try {
            let date = new Date(date_time);
            this.year = date.getFullYear;
            this.month = date.getMonth;  
            this.day = date.getDay;      
            this.hour = date.getHours;
            this.minute = date.getMinutes;
        } catch {
            throw Error('Invalid date and time');
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