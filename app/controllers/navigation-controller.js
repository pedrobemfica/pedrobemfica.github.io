import { ApplicationController } from "../controllers/application-controller.js"
import { UserController } from "../controllers/user-controller.js"
 
export class NavigationController {
    constructor(){
        this.applicationController = new ApplicationController()
        this.userController = new UserController()
    }

    checkUser() {
        return this.userController.checkUser()
    }

    loadPage(path) {
        this.applicationController.loadContent(path)
    }
}