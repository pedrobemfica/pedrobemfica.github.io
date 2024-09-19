import { ApplicationController } from "../controllers/application-controller.js"

export class ApplicationView {
    constructor() {
        this.applicationController = new ApplicationController()
        this.applicationController.initiate()
        this.openFirstPages()
    }

    async openFirstPages() {
        let page = await this.applicationController.loadContent('footer')
        page = await this.applicationController.loadContent('navigation')
        page = await this.applicationController.loadContent('home')
        page = await this.applicationController.loadContent('cookies')
        page = await this.applicationController.loadContent('cart')
    }
}