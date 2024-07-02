import { AppointmentView } from './appointment-view.js';

export function initialize() {
    document.addEventListener('DOMContentLoaded', () =>{
    loadContent('./pages/home.html');
    const elementList = document.getElementsByClassName("nav-page");
    let element;
    for (element of elementList) {
        let target = element.getAttribute('data-nav-target');
        element.addEventListener('click', function() {loadContent(target)});
    };
})};


export function loadContent(page) {
     fetch(page)
         .then(response => response.text())
         .then(data => document.getElementById('content').innerHTML = data)
         .then(() => {
            let view;
            if (page === './pages/appointments.html')
                view = new AppointmentView();
            })
         .catch(error => console.error('Error loading content:', error));

    }
