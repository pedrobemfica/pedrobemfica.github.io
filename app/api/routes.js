import { mockAvailability, mockAppointments, mockCredits, mockFiles, mockCart, mockUser } from "../../mockServer.js"

export const BACKEND = 'https://backend-olimpo.azurewebsites.net'

export const routes = {
    getAppointmentsServer(userId, jwt) {
        return [].concat(mockAppointments)
    },

    nextAppointmentId(userId, jwt) {
        let nextAppointmentId = Math.max(...mockAppointments.map(e => e.appointmentId)) + 1
        if (nextAppointmentId == -Infinity)
            nextAppointmentId = 1
        return nextAppointmentId
    },

    newAppointment(appointment, userId, jwt) {
        let dateObj = {year: appointment.year, month: appointment.month, day: appointment.day}
        let timeObj = {hour: appointment.hour, minute: appointment.minute}
        let newObj = {
            appointmentId: appointment.appointmentId,
            userId: appointment.userId,
            date: dateObj,
            time: timeObj,
            serviceId: appointment.serviceId
        };
        mockAppointments.push(newObj)
        return true
    },

    deleteAppointment(appointmentId, userId, jwt) {
        let index = mockAppointments.findIndex(e => e.appointmentId == appointmentId)
        mockAppointments.splice(index, 1)
        return true
    },

    getCreditsServer(userId, jwt) {
        return mockCredits.filter(e => e.status == 'active')
    },

    nextCreditId(userId, jwt) {
        let nextCreditId = Math.max(...mockCredits.map(e => e.creditId)) + 1
        if (nextCreditId == -Infinity)
            nextCreditId = 1
        return nextCreditId
    },

    newCredit(credit, userId, jwt) {
        let newObj = {
            creditId: credit.creditId, 
            userId: credit.userId,
            serviceId: credit.serviceId,
            status: credit.status
        };
        mockCredits.push(newObj)
        return true
    },

    changeCreditStatus(creditId, newStatus, userId, jwt) {
        let index = mockCredits.findIndex(e => e.creditId == creditId)
        mockCredits[index].status = newStatus
        return true
    },

    getAvailabilityServer({year, month, day}, serviceId, userId, jwt) {
        return mockAvailability.filter(e => e.date.year == year && e.date.month == month && e.date.day == day && e.serviceId == serviceId)
    },

    getFilesServer(userId, jwt) {
        return [].concat(mockFiles)
    },

    nextFileId(userId, jwt) {
        let nextFileId = Math.max(...mockFiles.map(e => e.fileId)) + 1
        if (nextFileId == -Infinity)
            nextFileId = 1
        return nextFileId
    },

    newFile(file, userId, jwt) {
        let dateObj = {year: file.year, month: file.month, day: file.day}
        let newObj = {
            fileId: file.fileId,
            userId: file.userId,
            date: dateObj,
            label: file.label,
            path: file.path
        };
        mockFiles.push(newObj)
        return true
    },

    deleteFile(fileId, userId, jwt) {
        let index = mockFiles.findIndex(e => e.fileId == fileId)
        mockFiles.splice(index, 1)
        return true
    },

    addToCart(product, userId, jwt) {
        let productIndex = mockCart.findIndex(e => e.product.name == product.name && e.product.description == product.description)
        if (productIndex == -1)
            mockCart.push({product: product, quantity: 1})
        else
            mockCart[productIndex].quantity += 1
        return true
    },

    getCartServer(userId, jwt) {
        return [].concat(mockCart)
    },

    deleteFomCart(index, userId, jwt) {
        mockCart.splice(index, 1)
        return true   
    },

    clearCart(userId, jwt) {
        mockCart.splice(0, mockCart.length)
        return true
    },

    loginUser(userName, password) {
        let data = mockUser.find(e => e.userName == userName && e.password == password)
        if (data) {
            let userId = data.userId
            let userName = data.userName
            let jwt = data.jwt
            let preferences = data.preferences
            return {userId: userId, userName: userName, jwt: jwt, preferences: preferences}
        }
        return false
    },

    changeUserPassword(userName, password, newPassword, userId, jwt) {
        let userIndex = mockUser.findIndex(e => e.userName == userName && e.password == password && e.userId == userId && e.jwt == jwt)
        if (userIndex != -1) {
            mockUser[userIndex].password = newPassword
            return true
        }
        return false

    },

    updateUserPreferences(userProfileEmail, userProfilePhone, userProfileName, userProfileGender, userProfileBirth, userId, jwt) {
        let userIndex = mockUser.findIndex(e => e.userId == userId && e.jwt == jwt)
        if (userIndex != -1) {
            let date = new Date(userProfileBirth)
            let birthYear = date.getFullYear()
            let birthMonth = date.getMonth()
            let birthDay = date.getDate()
            let preferences = {
                    name: userProfileName, 
                    email: userProfileEmail, 
                    cellPhone: userProfilePhone, 
                    gender: userProfileGender, 
                    birthYear: birthYear, 
                    birthMonth: birthMonth, 
                    birthDay: birthDay
                }     
            mockUser[userIndex].preferences = preferences
            return true
        }
        return false
    }, 

    registerUser(userName, password, confirmPassword, email, cellPhone) {
        if (password == confirmPassword) {
            let userId = this.nextUserId()
            let newObj = {
                userId: userId, 
                userName: userName, 
                password: password,
                jwt: '1',
                preferences: {
                    name: '', 
                    email: email, 
                    cellPhone: cellPhone, 
                    gender: '', 
                    birthYear: null, 
                    birthMonth: null, 
                    birthDay: null
                }
            }
            mockUser.push(newObj)
            return true
        }
        return false
    },

    nextUserId() {
        let nextUserId = Math.max(...mockUser.map(e => e.userId)) + 1
        if (nextUserId == -Infinity)
            nextUserId = 1
        return nextUserId
    },
}