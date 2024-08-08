import { ApplicationController } from "../controllers/application-controller.js"

export class ApplicationView {
    constructor() {
        this.applicationController = new ApplicationController()
        this.openFirstPages()
    }

    async openFirstPages() {
        await this.applicationController.loadContent('home')
        await this.applicationController.loadContent('footer')
        await this.applicationController.loadContent('navigation')
        await this.applicationController.loadContent('cookies')
        await this.applicationController.loadContent('cart')
    }
}