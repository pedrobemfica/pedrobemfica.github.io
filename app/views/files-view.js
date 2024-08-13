import { FilesController } from "../controllers/files-controller.js"
import { ApplicationController } from "../controllers/application-controller.js"

export class FilesView {
    constructor() {
        this.filesList = []

        this.filesController = new FilesController()
        this.applicationController = new ApplicationController()

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
                this.inputUploadFileLabel.value
            )
            this.updateView()
        })

        this.updateView()
    }

    updateView() {
        checkLoggedUser()
        this.uploadFileForm.reset()
        this.showFilesList()
    }

    checkLoggedUser() {
        this.loggedUser = this.applicationController.checkLoggedUser()
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
                this.filesCompleteList.innerHTML += `<td>${this.filesList[file].dateString}</td>
                                                    <td>${this.filesList[file].label}</td>
                                                    <td><form id="fileItemForm${this.filesList[file].fileId}">
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="fileItemRemoveAction"
                                                    value="${this.filesList[file].fileId}">
                                                    <i class="fa-solid fa-trash-can"></i></button>
                                                    <button type="button" class="btn btn-outline-primary"
                                                    name="fileItemDownloadAction"
                                                    value="${this.filesList[file].fileId}">
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
    }
}