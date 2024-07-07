import { getCookie, createCookie } from "./cookie-controller.js";

export function openTermsView() {}

export function initializeCookies () {
    document.addEventListener('DOMContentLoaded', function() {
    // Check if the user has already accepted cookies
    if (!getCookie('cookiesAccepted')) {
        document.getElementById('cookieConsent').style.display = 'block';
    }

    document.getElementById('acceptCookies').addEventListener('click', function() {
        // Set a cookie to remember the user's acceptance
        createCookie('cookiesAccepted', 'true');
        document.getElementById('cookieConsent').style.display = 'none';
    });
})};