import { ApplicationController } from "../controllers/application-controller.js"

export class ApplicationView {
    constructor() {
        this.applicationController = new ApplicationController()
        this.openFirstPages()
    }

    openFirstPages() {
        this.applicationController.loadContent('footer')
        this.applicationController.loadContent('navigation')
        this.applicationController.loadContent('home')
        this.applicationController.loadContent('cookies')
        this.applicationController.loadContent('cart')
    }
}