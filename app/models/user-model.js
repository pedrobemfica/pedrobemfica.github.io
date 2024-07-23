export class User {
    constructor(userId, userName) {
        this.userId = userId
        this.userName = userName
        this.jwt = ''
        this.logged = false

        this.name = '',
        this.email = '',
        this.cellPhone = '',
        this.gender = '',
        this.birthYear = null,
        this.birthMonth = null,
        this.birthDay = null
    }

    get getUserId() {
        return this.userId
    }

    get getUserName() {
        return this.userName
    }

    get getJwt() {
        return this.jwt
    }

    setJwt(jwt) {
        this.jwt = jwt
    }

    get getLogged() {
        return this.logged
    }

    setLogged(state) {
        this.logged = state
    }

    setName(name) {
        let regexValidation = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (!regexValidation.test(name))
            return false
        this.name = name
    }

    setEmail(email) {
        let regexValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!regexValidation.test(email))
            return false
        this.email = email
    }

    setCellPhone(cellPhone) {
        let regexValidation = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/
        if (!regexValidation.test(cellPhone))
            return false
        this.cellPhone = cellPhone
    }

    setGender(gender) {
        let regexValidation = /masculino|feminino/
        if (!regexValidation.test(gender)) 
            return false
        this.gender = gender
    }

    setBirthYear(birthYear) {     
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        if (birthYear < 1900 || birthYear < currentYear) 
            return false
        this.birthYear = birthYear
        return true
    }

    setBirthMonth(birthMonth) {     
        if (birthMonth < 1 || birthMonth > 12) 
            return false
        this.birthMonth = birthMonth
        return true
    }

    setBirthDay(birthDay) {     
        if (birthDay < 1 || birthDay > 31) 
            return false
        this.birthDay = birthDay
        return true
    }

    get getName() {
        return this.name
    }

    get getEmail() {
        return this.email
    }

    get getCellPhone() {
        return this.cellPhone
    }

    get getGender() {
        return this.gender
    }
    
    get getBirthYear() {
        return this.birthYear
    }

    get getBirthMonth() {
        return this.birthMonth
    }

    get getBirthDay() {
        return this.birthDay
    }
    
}