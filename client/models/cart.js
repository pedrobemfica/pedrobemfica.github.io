import { SERVICES } from "./entities.js";

export class Cart {
    constructor(user_id) {
        this.user_id = user_id;
        this.service_list = [];
    }

    get getList() {
        return this.service_list;
    }

    addToCart(service) {
        if (service in SERVICES) {
            let targetObj = this.service_list.find(obj => obj.service === service);
            if (!targetObj) {
                newObj = {service: service, quantity: 1};
                this.service_list.push(newObj);
            } else
                targetObj += 1;
            return true;
        } else
            throw Error('Not a valid service');
    }

    reduceFromCart(service) {
        if (service in SERVICES) {
            let targetObj = this.service_list.find(obj => obj.service === service);
            if (targetObj)
                targetObj.quantity -= 1;
            if (targetObj.quantity === 0) {
                let index = this.service_list.findIndex(obj => obj.service === service);
                this.service_list.splice(index, 1);
            }
        } else
            throw Error('Not a valid service');
    }

    removeFromCart(service) {
        if (service in SERVICES) {
            let targetObj = this.service_list.find(obj => obj.service === service);
            if (targetObj) {
                let index = this.service_list.findIndex(obj => obj.service === service);
                this.service_list.splice(index, 1);
            }
        } else
            throw Error('Not a valid service');
    }
}