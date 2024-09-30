export class Credit {
    constructor(creditId, serviceId, status) {
        this._creditId = creditId
        this._serviceId = serviceId
        this._status = status
    }

    get creditId() {
        return this._creditId
    }

    get serviceId() {
        return this._serviceId
    }

    get status() {
        return this._status
    }

    set setStatus(status) {
        if (status == 'active' || 'inactive') {
                this._status = status
                return true
            }
        return false
    }
}
