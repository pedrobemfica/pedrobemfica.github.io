import { SERVICES } from "./entities.js";

export class Cart {
    constructor(userId, serviceList = []) {
        this.userId = userId;
        this.serviceList = serviceList;
    }

    get getUserId() {
        return this.userId;
    }

    get getList() {
        return this.serviceList;
    }

    addToCart(service) {
        if (service in SERVICES) {
            let targetObj = this.serviceList.find(obj => obj.service === service);
            if (!targetObj) {
                newObj = {service: service, quantity: 1};
                this.serviceList.push(newObj);
            } else
                targetObj += 1;
            return true;
        } 
        return false;
    }

    reduceFromCart(service) {
        if (service in SERVICES) {
            let targetObj = this.serviceList.find(obj => obj.service === service);
            if (targetObj)
                targetObj.quantity -= 1;
            if (targetObj.quantity === 0) {
                let index = this.serviceList.findIndex(obj => obj.service === service);
                this.serviceList.splice(index, 1);
            }
            return true;
        } 
        return false;
    }

    removeFromCart(service) {
        if (service in SERVICES) {
            let targetObj = this.serviceList.find(obj => obj.service === service);
            if (targetObj) {
                let index = this.serviceList.findIndex(obj => obj.service === service);
                this.serviceList.splice(index, 1);
            }
            return true;
        } 
        return false;
    }
}