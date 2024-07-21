import { ApplicationController } from "../controllers/application-controller.js"

export class ApplicationView {
    constructor() {
        this.applicationController = new ApplicationController()

        this.applicationController.loadContent('navigation')
        this.applicationController.loadContent('home')
        this.applicationController.loadContent('footer')
        this.applicationController.loadContent('cookies')
    }
}