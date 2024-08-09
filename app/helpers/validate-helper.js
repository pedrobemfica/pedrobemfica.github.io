export const validateHelper = {
    checkUsername(username) {
        let regex = /^[a-zA-Z0-9]{4,15}$/
        return regex.test(username)
    },

    checkPassword(password) {
        let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        return regex.test(password)
    },

    checkEmail(email) {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    },

    checkPhone(phone) {
        let regex = /^\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}$/
        return regex.test(phone)
    },

    checkName(name) {
        let regex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/
        return regex.test(name)
    },

    checkGender(gender) {
        let regex = /masculino|feminino/
        return regex.test(gender)
    },

    checkDate(date) {
        const validation = new Date(date)
        return !isNaN(validation.getTime())
    }
}