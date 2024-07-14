import { AppointmentsController } from "../controllers/appointments-controller"

export class ApplicationView {
    constructor() {
        this.applicationController = new AppointmentsController
    }
}