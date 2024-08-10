export const validateHelper = {
    checkUsername(username) {
        // 4 a 15 characters
        // Accepts uppercase, lowercase and number
        let regex = /^[a-zA-Z0-9]{4,15}$/
        return regex.test(username)
    },

    checkPassword(password) {
        // At least 6 characters
        // At least one uppercase, one lowercase, one digit and one special character
        // Accepts uppercase, lowercase, number and characters @$!%*?&
        let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        return regex.test(password)
    },

    checkEmail(email) {
        // At least 2 characters
        // Accepts lowercase, uppercase, number and characters ._%+- before the @ character
        // One character @ 
        // Accepts lowercase, uppercase, number and characters .- after the @ character and before dot
        // One dot
        // Accepts lowercase and uppercase after the last dot
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    },

    checkPhone(phone) {
        // Optionally an opening parenthesis
        // Exactly two numbers
        // Optionally a closing parenthesis
        // Optionally a space or hyphen
        // Optionally a '9'
        // Optionally a space or hyphen
        // Exactly four numbers
        // Optionally a space or hyphen
        // Exactly four numbers
        let regex = /^\(?\d{2}\)?[\s-]?9?[\s-]?\d{4}[\s-]?\d{4}$/
        return regex.test(phone)
    },

    checkName(name) {
        // Must start with uppercase, lowercase or accented letter
        // Accepts one or more uppercase, lowercase, accented letter, space, hyphen or apostrophe
        let regex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/
        return regex.test(name)
    },

    checkGender(gender) {
        // Only one option or the other
        let regex = /masculino|feminino/
        return regex.test(gender)
    },

    checkDate(date) {
        const validation = new Date(date)
        return !isNaN(validation.getTime())
    }
}