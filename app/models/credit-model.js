import { Services } from "./services-model.js"

export class Credit {
    constructor(creditId, userId, serviceId, status = 'active') {
        this.creditId = creditId
        this.userId = userId
        
        let services = new Services()
        if (services.getById(serviceId))
            this.serviceId = serviceId;
        else
            throw Error('Service not provided')

        this.status = status
    }

    get getCreditId() {
        return this.creditId
    }

    get getUserId() {
        return this.userId
    }

    get getStatus() {
        return this.status
    }

    set setStatus(status) {
        if (status == 'active' ||
            status == 'inactive') {
                this.status = status
                return true
            }
        return false;
    }

    get getServiceString() {
        let services = new Services()
        let serviceString = services.getById(this.serviceId).name
        return serviceString
    }
}
