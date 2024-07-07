import { COOKIE_EXPIRES } from "../models/entities.js";

export function createCookie(name, value) {
    var expires;
    if (COOKIE_EXPIRES) {
        var date = new Date();
        date.setTime(date.getTime() + (COOKIE_EXPIRES * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(name + "=");
        if (start != -1) {
            start = start + name.length + 1;
            let end = document.cookie.indexOf(";", start);
            if (end == -1) {
                end = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(start, end));
        }
    }
    return false;
}