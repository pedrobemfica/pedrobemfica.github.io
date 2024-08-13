import { File } from './file-model.js'

export class Files {
    constructor() {
        this._list = []
    }

    get list() {
        return [].concat(this._list)
    }

    insertFile(fileObject) {
        if (fileObject instanceof File) {
            this._list.push(fileObject)
            return true
        }
        return false
    }

    removeFile(fileId) {
        let fileIndex = this._list.findIndex(e => e.fileId == fileId)
        if (fileIndex != -1) {
            this._list.splice(fileIndex, 1)
            return true
        }
        return false
    }

    findFileById(fileId) {
        return this._list.find(e => e.fileId == fileId)
    }

    clearFiles() {
        this._list = []
    }
}