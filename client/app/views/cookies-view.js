import { Cookies } from "../helpers/cookie-helper.js"

export class CookiesView {
    constructor() {
        let cookieConsent = document.getElementById('cookieConsent')
        let cookieAccept = document.getElementById('acceptCookies')
        Cookies.cookieConsent(cookieConsent, cookieAccept)
    }
}