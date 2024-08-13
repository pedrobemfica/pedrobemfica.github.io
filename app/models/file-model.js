export class File {
    constructor(fileId, userId, dateString, label) {
        this._fileId = fileId
        this._userId = userId
        this._dateString = dateString
        this._label = label
    }

    get FileId() {
        return this._fileId
    }

    get UserId() {
        return this._userId
    }

    get DateString() {
        return this._dateString
    }

    set setLabel(label) {
        this._label = label
        return true
    }

    get Label() {
        return this._label
    }
}