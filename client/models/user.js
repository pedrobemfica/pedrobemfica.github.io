export class User {
    constructor(username, password) {
        
        let id = this.generateId();
        this.id = id
        this.username = username;
        this.password = password;

        this.name;
        this.email;
        this.cell_phone;

        this.gender;
        this.birth_year;
        this.birth_month;
        this.birth_day;
    }

    generateId() {}

    set setName(name) {
        const regex_validation = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if (regex_validation.test(name))
            this.name = name;
        else
            throw Error('Invalid name');
    }

    get getName() {
        return this.name;
    }

    set setEmail(email) {
        const regex_validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (regex_validation.test(email))
            this.email = email;
        else
            throw Error('Invalid e-mail');
    }

    get getEmail() {
        return this.email;
    }

    set setCellPhone(cell_phone) {
        const regex_validation = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
        if (regex_validation.test(cell_phone))
            this.cell_phone = cell_phone;
        else
            throw Error('Invalid cell phone');
    }

    get getCellPhone() {
        return this.cell_phone;
    }

    set setGender(gender) {
        const regex_validation = /masculino|feminino/;
        if (regex_validation.test(gender))
            this.gender = gender;
        else
            throw Error('Invalid gender');
    }

    get getGender() {
        return this.gender;
    }

    set setBirth(date) {
        try {
            let birth_date = new Date(date);
            this.birth_year = birth_date.getFullYear;
            this.birth_month = birth_date.getMonth;
            this.birth_day = birth_date.getDay;
        } catch {
            throw Error('Invalid birth date')
        }
    }

    get getBirth() {
        let birth_date = new Date(this.birth_year, this.birth_month, this.birth_day);
        return birth_date.toDateString;
    }

    checkCredentials(username, password) {
        if (username == this.username && password == this.password)
            return true;
        else
            return false;
    }

    changePassword(username, password, new_password) {
        if (username == this.username && password == this.password) {
            this.password = new_password;
            return true;
        }
        else
            throw Error('Invalid username or password');
        
    }
}