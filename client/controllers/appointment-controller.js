import { Appointment } from "../models/appointment-model.js";
import { mockAvailability, mockAppointments, mockCredits } from "../mockServer.js"; // ### TEMPORARY

export const userAppointments = [];
export const userCredits = [];
let appointmentView;

export function openAppointmentView() {
    userCredits = [];
    userAppointments = [];

    let user_id = ''; // #### PENDING -- Retrieve logged user

    // #### TEMPORARY
    // Get list of credits from server
    let serverCreditList = mockCredits;

    userCredits = serverCreditList;
    
    // #### TEMPORARY
    // Get list of appointments from server
    let serverAppointmentList = mockAppointments;
    
    for (let appointment in serverAppointmentList)
        userAppointments.push(new Appointment(...appointment));
    appointmentView = new appointmentView(user_id);
}

export function newAppointment(user_id, date_time, service_id) {
    let appointment = new Appointment(user_id, date_time, service_id);
    // #### PENDING -- Add to server
    userAppointments.push(appointment);
    appointmentView.updateList();
    return true;
}

export function deleteAppointment(object) {
    const index = array.indexOf(object);
    if (index > -1) {
        // #### PENDING -- remove from server
        userAppointments.splice(index, 1);
        return true;
    }
    return false;
}

export function retrieveAvailableDateTime(date_year, date_month, date_day, service) {
    let dates = [];
    
    // ### TEMPORARY
    // Get dates from server
    let avaliabilityList = mockAvailability.filter(e => (e.year == date_year && e.month == date_month && e.day == date_day && e.service == service));
    
    dates += avaliabilityList;
    return dates;
}