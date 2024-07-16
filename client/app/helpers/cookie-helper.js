const COOKIE_EXPIRES = 1

export const Cookies = {
    createCookie: function(name, value) {
        let expires
        if (COOKIE_EXPIRES) {
            let date = new Date()
            date.setTime(date.getTime() + (COOKIE_EXPIRES * 24 * 60 * 60 * 1000))
            expires = "; expires=" + date.toGMTString()
        } else 
            expires = ""
        document.cookie = name + "=" + value + expires + "; path=/"
    },

    getCookie: function(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + "=")
            if (start != -1) {
                start = start + name.length + 1
                let end = document.cookie.indexOf(";", start)
                if (end == -1)
                    end = document.cookie.length
                return decodeURI(document.cookie.substring(start, end))
            }
        }
        return false
    },

    cookieConsent: function(elementConsent, elementAccept) {
        if (!this.getCookie('cookiesAccepted')) {
            elementConsent.style.display = 'block'
            elementAccept.addEventListener('click', () => {
                createCookie('cookiesAccepted', JSON.stringify('true'))
                elementConsent.style.display = 'none'
            })
        } else 
            elementConsent.style.display = 'none'
    }
}