import { openAppointmentView } from '../controllers/appointment-controller.js'
import { openHomeView } from '../controllers/home-controller.js';

export function initialize() {
    window.addEventListener('DOMContentLoaded', () =>{
        loadContent(window.location.pathname);
    });


    window.addEventListener('popstate', () => {
        let normalizedPage = window.location.pathname.replace('/client/', '');
        loadContent(normalizedPage);
    });

    window.addEventListener('hashchange', loadContent(window.location.pathname));


    let navPageList = document.getElementsByClassName("nav-page");
    [...navPageList].forEach(page => {
        let path = page.getAttribute('data-nav-target');
        page.addEventListener('click', event => {
            event.preventDefault();
            navigateTo(path);
        });
    });
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
                        break;
                    case 'login':
                        break;
                    case 'profile':
                        break;
                    case 'cart':
                        break;
                    case 'payment':
                        break;
                    case 'services':
                        break;
                    case 'appointments':
                        openAppointmentView()
                        break; 
                    case 'files':
                        break; 
                    case 'contact':
                        break; 
                    case 'terms':
                        break; 
                    default:
                        throw Error('No page found');
                }
            })
            .catch(error => console.error(`Error loading ${path}:`, error));
    }
