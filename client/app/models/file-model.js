export class File {
    constructor(fileId, userId, label, path) {
        this.fileId = fileId
        this.userId = userId
        this.label = label
        this.path = path
    }

    get getFileId() {
        return this.fileId
    }

    get getUserId() {
        return this.userId
    }

    set setLabel(label) {
        this.label = label
        return true
    }

    get getLabel() {
        return this.label
    }

    get getPath() {
        return this.path
    }
}