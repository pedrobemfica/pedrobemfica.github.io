export class User {
    constructor(userId, userName, password) {
        
        let userId = userId
        this.userName = userName
        this.password = password

        this.name = ''
        this.email = ''
        this.cellPhone = ''

        this.gender = ''
        this.birthYear = null
        this.birthMonth = null
        this.birthDay = null
    }

    set setName(name) {
        const regexValidation = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (regexValidation.test(name)) {
            this.name = name
            return true
        }
        return false
    }

    get getName() {
        return this.name
    }

    set setEmail(email) {
        const regexValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (regexValidation.test(email)) {
            this.email = email
            return true
        }
        return false
    }

    get getEmail() {
        return this.email
    }

    set setCellPhone(cellPhone) {
        const regexValidation = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/
        if (regexValidation.test(cellPhone)) {
            this.cellPhone = cellPhone
            return true
        }
        return false
    }

    get getCellPhone() {
        return this.cellPhone
    }

    set setGender(gender) {
        const regexValidation = /masculino|feminino/
        if (regexValidation.test(gender)) {
            this.gender = gender
            return true
        }
        return false
    }

    get getGender() {
        return this.gender;
    }

    set setBirth({year, month, day}) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        if (
            year > 1900 &&
            year < currentYear &&
            month >= 1 &&
            month <= 12 &&
            day >= 1 &&
            day <= 31
        ) {
            this.birthYear = year;
            this.birthMonth = month;
            this.birthDay = day;
            return true;
        }
        return false;
    }

    get getBirthString() {
        let dateString = `${("0" + this.birthDay).slice(-2)}/${("0" + this.birthMonth).slice(-2)}/${("000" + this.birthYear).slice(-4)}`;
        return dateString;
    }

    checkCredentials(userName, password) {
        if (userName == this.userName && password == this.password)
            return true;
        return false;
    }

    changePassword(userName, password, newPassword) {
        if (userName == this.userName && password == this.password) {
            this.password = newPassword;
            return true;
        }
        return false;
    }
}