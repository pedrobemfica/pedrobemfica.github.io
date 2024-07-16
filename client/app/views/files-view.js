import { FilesController } from "../controllers/file-controller.js"

export class FilesView {
    constructor() {
        this.filesList = []

        this.filesController = new FilesController()

        this.allSections = document.getElementsByTagName('section')
        this.filesTable = document.getElementById('filesTable')
        this.filesCompleteList = document.getElementById('filesCompleteList')
        
        this.inputUploadFileSelect = document.getElementById('inputUploadFileSelect')
        this.inputUploadFileLabel = document.getElementById('inputUploadFileLabel')
        
        this.userLoggedMessage = document.getElementById('userLoggedMessage')
        this.filesListMessage = document.getElementById('filesListMessage')
        
        this.uploadFileForm = document.getElementById('uploadFileForm')
        
        this.uploadFileForm.addEventListener('submit', event => {
            event.preventDefault()
            this.filesController.uploadFile(
                this.inputUploadFileSelect,
                this.inputUploadFileLabel
            )
            this.updateView()
        })

        this.updateView()
    }

    updateView() {
        this.checkLoggedUser()
        this.showFilesList()
    }

    checkLoggedUser() {
        this.loggedUser = this.Controller.checkLoggedser()
        if (!this.loggedUser) {
            Array.from(this.allSections).forEach(e => e.classList.add('element-hidden'))
            this.userLoggedMessage.classList.remove('element-hidden')
        } else {
            Array.from(this.allSections).forEach(e => e.classList.remove('element-hidden'))
            this.userLoggedMessage.classList.add('element-hidden')
        }
    }

    showFilesList() {
        this.filesList = this.filesController.retrieveFiles()
        if (this.filesList.length <= 0) {
            this.filesListMessage.classList.remove('element-hidden')
            this.filesTable.classList.add('element-hidden')
        } else {
            this.filesListMessage.classList.add('element-hidden')
            this.filesTable.classList.remove('element-hidden')
            this.filesCompleteList.innerHTML = ''
            for (let file in this.filesList) {
                this.filesCompleteList.innerHTML += `<td>${this.filesList[file].getDateString}</td>
                                                    <td>${this.filesList[file].getLabel}</td>
                                                    <td><form id="fileItemForm${this.filesList[file].getfileId}">
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="fileItemRemoveAction"
                                                    value="${this.filesList[file].getfileId}"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="Remove o arquivo">
                                                    <i class="fa-solid fa-trash-can"></i></button>
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="fileItemDownloadAction"
                                                    value="${this.filesList[file].getfileId}"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    data-bs-custom-class="custom-tooltip"
                                                    data-bs-title="Download do arquivo">
                                                    <i class="fa-solid fa-download"></i></button>
                                                    </form></td>`
            }
            this.setFilesActions()
        }
    }

    setFilesActions() {
        let fileItemRemoveAction = document.getElementsByName('fileItemRemoveAction')
        let fileItemDownloadAction = document.getElementsByName('fileItemDownloadAction')
        
        fileItemRemoveAction.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.filesController.deleteFile(element.value)
            this.updateView()
        }))
        fileItemDownloadAction.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.filesController.downloadFile(element.value)
            this.updateView()
        }))

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
}