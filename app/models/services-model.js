import { ApiServices } from "../api/services-routes.js"

export class Services {
    constructor() {
        this._single = ApiServices.single()
        this._package = ApiServices.package()
    }

    get single() {
        return [].concat(this._single)
    }

    get package() {
        return [].concat(this._package)
    }
}