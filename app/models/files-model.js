import { File } from './file-model.js'

export class Files {
    constructor() {
        this.list = []
    }

    get getFiles() {
        return [].concat(this.list)
    }

    insertFile(fileObject) {
        if (fileObject instanceof File) {
            this.list.push(fileObject)
            return true
        }
        return false
    }

    removeFile(fileId) {
        let fileIndex = this.list.findIndex(e => e.fileId == fileId)
        if (fileIndex != -1) {
            this.list.splice(fileIndex, 1)
            return true
        }
        return false
    }

    findFileById(fileId) {
        return this.list.find(e => e.fileId == fileId)
    }

    clearFiles() {
        this.list = []
    }
}