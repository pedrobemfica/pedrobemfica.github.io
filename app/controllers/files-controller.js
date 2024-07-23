import { File } from "../models/file-model.js"
import { Files } from "../models/files-model.js"
import { UserController } from "./user-controller.js"

import { routes } from "../api/routes.js"
import { alertMessage } from "../helpers/alert-helper.js"
 
export class FilesController {
    constructor(){
        this.userController = new UserController()
        this.user = this.userController.checkUser()
        this.files = new Files()
        this.updateFiles()
    }

    updateFiles() {
        let getUserFiles = []
        this.files.clearFiles()
        getUserFiles = routes.getFilesServer(this.user.userId, this.user.jwt)
        getUserFiles.map(e => {
            let newFile = new File(e.fileId, e.userId, e.date, e.label, e.path)
            this.files.insertFile(newFile)
        })
    }

    retrieveFiles() {
        return this.files.getFiles
    }

    uploadFile(fileInfo, labelInput){
        fileInfo = fileInfo // Handle upload and save file
        let userId = this.checkLoggedser().id
        let currentDate = new Date()
        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth()
        let currentDay = currentDate.getDate() 
        let date = {year: currentYear, month: currentMonth, day: currentDay}
        let label = labelInput.value
        let path = '' // Get from handling upload
        let fileId = routes.nextFileId(this.user.userId, this.user.jwt)

        let file = new File(fileId, userId, date, label, path)
        routes.newFile(file, this.user.userId, this.user.jwt)
        alertMessage('Arquivo enviado', 'O arquivo foi enviado para o servidor.')
       
        this.updateFiles()
    }

    deleteFile(fileId) {
        //let file = file // Handle remove the file in the server
        let confirm = routes.deleteFile(fileId, this.user.userId, this.user.jwt)
        if (confirm) {
            alertMessage('Arquivo removido', 'O arquivo foi removido do servidor.')
        } else
            alertMessage('Não foi possível apagar', 'Algum erro ocorreu e a ação não foi concluída.')
        
        this.updateFiles()
    }

    downloadFile(fileId) {
        fileId = fileId // Handle download the file from the server
    }

    checkLoggedser() {
        if (this.user)
            if (this.user.logged)
                return this.user
        return false
    }
}

// OLD
// export function openFilesView() {

//     document.getElementById('uploadForm').addEventListener('submit', async function(event) {
//         event.preventDefault();
    
//         const fileInput = document.getElementById('fileInput');
//         const file = fileInput.files[0];
    
//         if (!file) {
//             alert('Please select a file.');
//             return;
//         }
    
//         const formData = new FormData();
//         formData.append('file', file);
    
//         try {
//             const response = await fetch('/upload', {
//                 method: 'POST',
//                 body: formData
//             });
    
//             if (response.ok) {
//                 alert('File uploaded successfully.');
//             } else {
//                 alert('Failed to upload file.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Error uploading file.');
//         }
//     });
// }