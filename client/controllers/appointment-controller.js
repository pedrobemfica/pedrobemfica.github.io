import { Appointment } from "../models/appointment-model.js";
import { AppointmentView } from "../views/appointment-view.js";
import { createCookie, getCookie } from "../controllers/cookie-handler.js";
import { mockAvailability, mockAppointments, mockCredits } from "../mockServer.js"; // ### TEMPORARY

export function openAppointmentView() {
    
    let userId = ''; // #### PENDING -- Retrieve logged user
    
    let userCredits = [];
    if (!getCookie('userCredits')) {
        let serverCreditList = mockCredits; // #### TEMPORARY -- Get list of credits from server
        userCredits += serverCreditList;
        createCookie('userCredits', userCredits);
    } else
        userCredits += getCookie('userCredits');
        
    let userAppointments = [];
    let serverAppointmentList;
    if (!getCookie('userAppointments')) {
        serverAppointmentList = mockAppointments // #### TEMPORARY -- Get list of appointments from server
        for (let appointment in serverAppointmentList) {
            let user_id = userId;
            let date_time = new Date(
                serverAppointmentList[appointment].year,
                serverAppointmentList[appointment].month,
                serverAppointmentList[appointment].day,
                serverAppointmentList[appointment].hour,
                serverAppointmentList[appointment].minute
            );
            let service_id = serverAppointmentList[appointment].service;
            userAppointments.push(new Appointment(user_id, date_time, service_id));
        }
        createCookie('userAppointments', userAppointments);
    } else 
        userAppointments += getCookie('userAppointments');

    createCookie('appointmentPage', new AppointmentView(userId));
}

export function newAppointment(user_id, date_time, service_id) {
    let appointment = new Appointment(user_id, date_time, service_id);
    // #### PENDING -- Add to server and to cookie session
    userAppointments.push(appointment);
    AppointmentView.updateList();
    return true;
}

export function deleteAppointment(object) {
    const index = array.indexOf(object);
    if (index > -1) {
        // #### PENDING -- remove from server and from cookie session
        userAppointments.splice(index, 1);
        return true;
    }
    return false;
}

export function retrieveAvailableDateTime(date_year, date_month, date_day, service) {
    let dates = [];
    
    // ### TEMPORARY -- Get dates from server
    let avaliabilityList = mockAvailability.filter(e => (e.year == date_year && e.month == date_month && e.day == date_day && e.service == service));
    
    dates += avaliabilityList;
    return dates;
}