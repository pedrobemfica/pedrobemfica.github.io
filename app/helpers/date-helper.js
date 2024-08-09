export const dateHelper = {
    UTCtoString(utcDateString) {
        const utcDate = new Date(utcDateString)
        const options = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZoneName: 'short'
        }
    
        const formatter = new Intl.DateTimeFormat('pt-BR', options)
        const localDateString = formatter.format(utcDate)
    
        return localDateString
    },

    InputtoUTC(localDateStr) {
        if (!localDateStr)
            return undefined
        const localDate = new Date(localDateStr)
        const utcDate = new Date(localDate.toUTCString())
        const utcDateString = utcDate.toISOString()
    
        return utcDateString
    },

    UTCtoInput(utcDateString) {
        const date = new Date(utcDateString)

        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, '0')
        const day = String(date.getUTCDate()).padStart(2, '0');

        const dateInputValue = `${year}-${month}-${day}`

        return dateInputValue
    }
}