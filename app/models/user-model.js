export class User {
    constructor(userId, username) {
        this._userId = userId
        this._username = username
        this._name = '',
        this._email = '',
        this._phone = '',
        this._gender = '',
        this._birth = null
    }

    get userId() {
        return this._userId
    }

    get username() {
        return this._username
    }
    
    get name() {
        return this._name
    }
    
    setName(name) {
        this._name = name
    }
    
    get email() {
        return this._email
    }
    
    setEmail(email) {
        this._email = email
    }
    
    get phone() {
        return this._phone
    }
    
    setPhone(phone) {
        this._phone = phone
    }
    
    get gender() {
        return this._gender
    }
    
    setGender(gender) {
        this._gender = gender
    }
    
    get birth() {
        return this._birth
    }
    
    setBirth(birth) {   
        this._birth = birth
    }
}