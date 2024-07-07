import { openHomeView } from '../controllers/home-controller.js';
import { openServicesView } from '../controllers/service-controller.js';
import { openAppointmentsView } from '../controllers/appointment-controller.js';
import { openFilesView } from '../controllers/file-controller.js';
import { openContactView } from '../controllers/contact-controller.js';
import { openLoginView, openProfileView, openRegistrationView } from '../controllers/user-controller.js';
import { openCartView, openPaymentView } from '../controllers/purchase-controller.js';

export function initializeRender() {

    // Loag initial page when first connect
    window.addEventListener('DOMContentLoaded', () =>{
        loadContent(window.location.pathname);
    });

    // Guarantee historical navigation
    window.addEventListener('popstate', () => {
        let normalizedPage = window.location.pathname.replace('/client/', '');
        loadContent(normalizedPage);
    });
    window.addEventListener('hashchange', loadContent(window.location.pathname));

    // Setup menu navigation
    let navPageList = document.getElementsByClassName("nav-page");
    [...navPageList].forEach(page => {
        let path = page.getAttribute('data-nav-target');
        page.addEventListener('click', event => {
            event.preventDefault();
            navigateTo(path);
        });
    });

    // Set menu for logged or not logged user
}

function navigateTo(path) {
    history.pushState({}, '', path);
    loadContent(path);
}

function loadContent(path) {
    const contentArea = document.getElementById('content');
        if(path == '/client/' || path == '')
            path = 'home';
        fetch(`./pages/${path}.html`)
            .then(response => response.text())
            .then(html => contentArea.innerHTML = html)
            .then(() => {
                switch(path) {
                    case 'home':
                        openHomeView();
                        break;
                    case 'registration':
                        openRegistrationView();
                        break;
                    case 'login':
                        openLoginView();
                        break;
                    case 'profile':
                        openProfileView();
                        break;
                    case 'cart':
                        openCartView();
                        break;
                    case 'payment':
                        openPaymentView();
                        break;
                    case 'services':
                        openServicesView();
                        break;
                    case 'appointments':
                        openAppointmentsView();
                        break; 
                    case 'files':
                        openFilesView();
                        break; 
                    case 'contact':
                        openContactView();
                        break; 
                    case 'terms':
                        break; 
                    default:
                        throw Error('Page not found');
                }
            })
            .catch(error => console.error(`Error loading ${path}:`, error));
    }
