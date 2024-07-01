import { SERVICES } from "./entities.js";

export class Cart {
    constructor(user_id, service_list = []) {
        this.user_id = user_id;
        this.service_list = service_list;
    }

    get getList() {
        return this.service_list;
    }

    addToCart(service) {
        if (service in SERVICES) {
            this.service_list.push(service);
            return true;
        }
        else {
            throw Error('Not a valid service');
        }

    }
}