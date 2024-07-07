import { Appointment } from "../models/appointment-model.js";
import { AppointmentView } from "../views/appointment-view.js";
import { createCookie, getCookie } from "../controllers/cookie-handler.js";
import { mockAvailability, mockAppointments, mockCredits } from "../mockServer.js"; // ### TEMPORARY

export function openAppointmentView() {
    
    let userId = ''; // #### PENDING -- Retrieve logged user

    let userCredits = [];
    if (!getCookie('userCredits')) {
        let serverCreditList = mockCredits; // #### TEMPORARY -- Get list of credits from server
        userCredits.push(...serverCreditList);
        createCookie('userCredits', JSON.stringify(userCredits));
    } else
        userCredits.push(...JSON.parse(getCookie('userCredits')));

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
        createCookie('userAppointments', JSON.stringify(userAppointments));
    } else 
        userAppointments.push(...JSON.parse(getCookie('userAppointments')));
    
    let page = new AppointmentView(userId);
    createCookie('appointmentPage', page);
}

export function newAppointment(date_time, service_id) {
    
    let user_id = '';  // #### PENDING -- Retrieve logged user
    let appointment = new Appointment(user_id, date_time, service_id);
    // #### PENDING -- Add to server
    let userAppointments = JSON.parse(getCookie('userAppointments'));
    userAppointments.push(appointment);
    createCookie('userAppointments', JSON.stringify(userAppointments));

    return true;
}

export function deleteAppointment(object) {
    let userAppointments = getCookie('userAppointments');
    const index = userAppointments.indexOf(object);
    if (index > -1) {
        // #### PENDING -- remove from server
        userAppointments.splice(index, 1);
        createCookie('userAppointments', userAppointments);
        return true;
    }
    return false;
}

export function retrieveAvailableDateTime(date_year, date_month, date_day, service) {
    let dates = [];
    
    // ### TEMPORARY -- Get dates from server
    let avaliabilityList = mockAvailability.filter(e => (e.year == date_year && e.month == date_month && e.day == date_day && e.service == service));

    dates.push(...avaliabilityList);
    return dates;
}