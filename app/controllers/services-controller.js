import { ApiServices } from "../api/services-routes.js"
import { UserController } from "./user-controller.js"
import { CartController } from "./cart-controller.js"

import { alertMessage } from "../helpers/alert-helper.js"
 
export class ServicesController {
    constructor(){
        this.userController = new UserController()
        this.cartController = new CartController()
    }

    checkUser() {
        return this.userController.checkUser()
    }

    async retrieveSingles() {
        let singleList = await ApiServices.single()
        this.singleList = singleList.list
        return this.singleList
    }

    async uniqueNames() {
        let uniqueList = await this.retrieveSingles()
        uniqueList = [].concat(...new Set(this.singleList.map(e => e.name)))
        return uniqueList
    }

    uniqueProfessionals(name) {
        let uniqueList = [].concat(...new Set(this.singleList.filter(e => name == e.name).map(o => o.professionalName)))
        return uniqueList
    }

    uniqueLocations(name, professionalName) {
        let uniqueList = [].concat(...new Set(this.singleList.filter(e => (name == e.name && professionalName == e.professionalName)).map(o => o.location)))
        return uniqueList
    }

    async retrievePackages() {
        let packageList = await ApiServices.package()
        this.packageList = packageList.list
        return this.packageList
    }

    async uniquePackageLotcations() {
        let uniqueList = await this.retrievePackages()
        uniqueList = [].concat(...new Set(this.packageList.map(e => e.location)))
        return uniqueList
    }

    addSingleToCart(name, professionalName, location) {
        const singleItem = this.singleList.find(e => (
            e.name == name 
            && e.professionalName == professionalName 
            && e.location == location
        ))
        this.cartController.addSingleToCart(singleItem.serviceId)
    }

    addPackageToCart(packageId) {
        const packageItem = this.packageList.find(e => (e.packageId == packageId))
        this.cartController.addPackageToCart(packageItem.packageId)
    }
}