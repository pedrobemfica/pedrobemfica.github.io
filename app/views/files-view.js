import { FilesController } from "../controllers/files-controller.js"

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
        
        this.uploadFileForm.addEventListener('submit', async event => {
            event.preventDefault()
            let confirmation = await this.filesController.uploadFile(
                this.inputUploadFileSelect,
                this.inputUploadFileLabel.value
            )
            if (confirmation)
                this.updateView()
        })

        this.updateView()
    }

    updateView() {
        this.uploadFileForm.reset()
        if(this.checkLoggedUser())  
            this.showFilesList()
    }

    checkLoggedUser() {
        this.loggedUser = this.filesController.checkUser()
        if (!this.loggedUser) {
            Array.from(this.allSections).forEach(e => e.classList.add('element-hidden'))
            this.userLoggedMessage.classList.remove('element-hidden')
            return false
        } else {
            Array.from(this.allSections).forEach(e => e.classList.remove('element-hidden'))
            this.userLoggedMessage.classList.add('element-hidden')
            return true
        }
    }

    async showFilesList() {
        this.filesList = await this.filesController.retrieveFiles()
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
        
        fileItemRemoveAction.forEach(element => element.addEventListener('click', async event => {
            event.preventDefault()           
            const confirmation = await this.filesController.deleteFile(element.value)
            if (confirmation)
                this.updateView()
        }))
        fileItemDownloadAction.forEach(element => element.addEventListener('click', event => {
            event.preventDefault()           
            this.filesController.downloadFile(element.value)
        }))
    }
}