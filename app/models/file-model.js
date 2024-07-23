export class File {
    constructor(fileId, userId, {year, month, day}, label, path) {
        this.fileId = fileId
        this.userId = userId

        this.year = year
        this.month = month
        this.day = day

        this.label = label
        this.path = path 
    }

    get getFileId() {
        return this.fileId
    }

    get getUserId() {
        return this.userId
    }

    get getDateString() {
        let dateString = `${("0" + this.day).slice(-2)}/${("0" + this.month).slice(-2)}/${("000" + this.year).slice(-4)}`
        return dateString
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