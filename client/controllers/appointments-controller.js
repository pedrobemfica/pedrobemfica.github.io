import { Appointment } from "../models/appointment-model.js";
import { Appointments } from "../models/appointments-model.js";
import { Credit } from "../models/credit-model.js";
import { Credits } from "../models/credits-model.js";
import { AppointmentsView } from "../views/appointments-view.js";

import { createCookie, getCookie } from "./cookie-controller.js";

export const AppointmentsController = {
    openAppointmentsView: function() {   
        let userId = ''; // #### PENDING -- Get logged
        let credits = this.retrieveCredits(userId);
        let appointments = this.retrieveAppointments(userId);
        new AppointmentsView(credits, appointments);
    },   

    retrieveCredits: function(userId) {
        let userCredits = [];
        let getUserCredits = [];
        if (!getCookie('userCredits')) {
            let serverCreditList = mockCredits; // #### TEMPORARY -- Get list of credits from server
            getUserCredits.push(...serverCreditList);
            createCookie('userCredits', JSON.stringify(getUserCredits));
        } else
            getUserCredits.push(JSON.parse(getCookie('userCredits')));
        userCredits = getUserCredits.map(e => new Credit(e.user_id, e.date_time, e.service_id));
        return userCredits;
    },

    retrieveAppointments: function(userId) {    
        let userAppointments = [];
        let getUserAppointments = [];
        if (!getCookie('userAppointments')) {
            let serverUserAppointments = mockAppointments // #### TEMPORARY -- Get list of appointments from server
            createCookie('userAppointments', JSON.stringify(serverUserAppointments));
        }
        getUserAppointments.push(...JSON.parse(getCookie('userAppointments')));
        userAppointments = getUserAppointments.map(e => new Appointment(e.user_id, e.date_time, e.service_id));
        return userAppointments;
    },

    newAppointment: function() {
        // #### PENDING -- Discount credit
        let user_id = '';  // #### PENDING -- Retrieve logged user
        let appointment = new Appointment(user_id, date_time, service_id);
        // #### PENDING -- Add to server
        let userAppointments = JSON.parse(getCookie('userAppointments'));
        userAppointments.push(appointment);
        createCookie('userAppointments', JSON.stringify(userAppointments));
        return true;
    },

    deleteAppointment: function(appointmentId) {
        let userAppointments = getCookie('userAppointments');
        const index = userAppointments.indexOf(object);
        if (index > -1) {
            // #### PENDING -- remove from server
            userAppointments.splice(index, 1);
            createCookie('userAppointments', userAppointments);
            return true;
        }
        return false;
    }, 

    retrieveAvailableDateTime: async function(inputDate, inputService) {
        let availableList = [];
        
        // ### TEMPORARY -- Get dates from server
        let avaliabilityList = mockAvailability.filter(e => (e.year == dateYear && e.month == dateMonth && e.day == dateDay && e.serviceId == serviceId));
    
        availableList.push(...avaliabilityList);
        return availableList;
    }

}