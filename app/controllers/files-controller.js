import { File } from "../models/file-model.js"
import { Files } from "../models/files-model.js"
import { ApiFiles } from "../api/files-routes.js"
import { UserController } from "../controllers/user-controller.js"

import { alertMessage } from "../helpers/alert-helper.js"
 
export class FilesController {
    constructor(){
        this.files = new Files()
        this.userController = new UserController()
    }

    checkUser() {
        return this.userController.checkUser()
    }

    async updateFiles() {
        try {
            const data = await ApiFiles.list()
            if (data.result) {
                if (data.list.length <= 0) 
                    this.files.clearFiles()
                else {
                    this.files.clearFiles()
                    data.list.map(e => {
                        let newFile = new File(e.fileId, e.userId, e.dateString, e.label)
                        this.files.insertFile(newFile)
                    })
                }
            } else
                alertMessage('Falha ao listar arquivos', data.message)  
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao listar arquivos', err)
        }
        return false
    }

    async retrieveFiles() {
        await this.updateFiles()
        return this.files.list
    }

    async downloadFile(fileId){
        try {
            const data = await ApiFiles.download(fileId)
            if (data.result) {
                // Create temporary link element
                const link = document.createElement('a')
                const url = window.URL.createObjectURL(data.file)
                link.href = url
                let fileName = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(link)

                alertMessage('Download de arquivo', 'Arquivo baixado com sucesso')
                return true
            } else
                alertMessage('Falha no download', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no download', err)
        }
        return false
    }

    async uploadFile(fileSelect, label){
        const fileSelected = fileSelect.files[0]
        const formData = new FormData()
        formData.append('file', fileSelected)
        formData.append('label', label)
        // Client side check - TBD

        // Server side check
        try {
            const data = await ApiFiles.upload(formData)
            if (data.result) {
                alertMessage('Upload de arquivo', data.message)
                return true
            } else
                alertMessage('Falha no upload', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha no upload', err)
        }
        return false
    }

    async deleteFile(fileId) {
        // Server side check
        try {
            const data = await ApiFiles.delete(fileId)
            if (data.result) {
                alertMessage('Arquivo deletado', data.message)
                return true
            } else
                alertMessage('Falha ao deletar', data.message)
        } catch(err) {
            console.log(err)
            alertMessage('Falha ao deletar', err)
        }
        return false
    }
}