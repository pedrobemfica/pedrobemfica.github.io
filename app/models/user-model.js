import { dateHelper } from "../helpers/date-helper.js"

export class User {
    constructor(userId, username) {
        this.userId = userId
        this.username = username
        this.jwt = ''
        this.logged = false

        this.name = '',
        this.email = '',
        this.cellPhone = '',
        this.gender = '',
        this.birth = null
    }

    get getUserId() {
        return this.userId
    }

    get getUsername() {
        return this.username
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
        this.name = name
    }

    setEmail(email) {
        this.email = email
    }

    setCellPhone(cellPhone) {
        this.cellPhone = cellPhone
    }

    setGender(gender) {
        this.gender = gender
    }

    setBirth(birth) {     
        this.birth = dateHelper.InputtoUTC(birth)
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
    
    get getBirth() {
        return dateHelper.UTCtoString(this.birth)
    }
}