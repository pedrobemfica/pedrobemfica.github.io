import { Services } from "../helpers/services-helper.js"

export class Credit {
    constructor(creditId, userId, serviceId, status = 'active') {
        this.creditId = creditId
        this.userId = userId
        
        if (Services.getNameById(serviceId))
            this.serviceId = serviceId;
        else
            throw Error('Service not provided');

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
        let serviceId = SERVICES.find(e => e.id == this.serviceId)
        let serviceString = SERVICES[serviceId].name
        return serviceString
    }
}
