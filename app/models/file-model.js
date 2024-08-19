export class File {
    constructor(fileId, userId, dateString, label) {
        this._fileId = fileId
        this._userId = userId
        this._dateString = dateString
        this._label = label
    }

    get fileId() {
        return this._fileId
    }

    get userId() {
        return this._userId
    }

    get dateString() {
        return this._dateString
    }

    set setLabel(label) {
        this._label = label
        return true
    }

    get label() {
        return this._label
    }
}