import { Appointment } from "../models/appointment-model.js";
import { Appointments } from "../models/appointments-model.js";
import { Credit } from "../models/credit-model.js";
import { Credits } from "../models/credits-model.js";
import { routes } from "../api/routes.js";
import { AppointmentsView } from "../views/appointments-view.js";

import { createCookie, getCookie } from "./cookie-controller.js";

export const AppointmentsController = {
    openAppointmentsView: async function() {   
        let userId = ''; // #### PENDING -- Get logged
        let credits = await this.retrieveCredits(userId);
        let appointments = await this.retrieveAppointments(userId);
        new AppointmentsView(credits, appointments);
    },   

    retrieveCredits: async function(userId) {
        let userId = ''; // #### PENDING -- Get logged
        let userCredits = [];
        let getUserCredits = [];
        if (!getCookie('userCredits')) {
            let serverCreditList = await routes.getCreditsServer(userId);
            getUserCredits.push(...serverCreditList);
            createCookie('userCredits', JSON.stringify(getUserCredits));
        } else
            getUserCredits.push(JSON.parse(getCookie('userCredits')));
        userCredits = getUserCredits.map(e => new Credit(e.user_id, e.date_time, e.service_id));
        return userCredits;
    },

    retrieveAppointments: async function(userId) {    
        let userId = ''; // #### PENDING -- Get logged
        let userAppointments = [];
        let getUserAppointments = [];
        if (!getCookie('userAppointments')) {
            let serverUserAppointments = routes.getAppointmentsServer(userId);
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
        year = inputDate.slice(0, 4);
        month = inputDate.slice(5, 7);
        day = inputDate.slice(8, 10);
        serviceId = SERVICES.indexOf(e => e.name == inputService);
        let availableList = [];
        let avaliabilityList = routes.getAvailabilityServer({year, month, day}, serviceId);
        availableList.push(avaliabilityList);
        return availableList;
    }

}