import { initialize as initializeRender } from './views/render.js';
import { initialize as initializeCookie } from './controllers/cookie-consent.js';
import { initializeCalendar } from './views/calendar.js';

initializeRender();
initializeCookie();
