export const mockAppointments = [
    { appointmentId: 1, userId: 1, date: {year: 2024, month: 7, day: 10}, time: {hour: 8, minute: 0}, serviceId: 11 },
    { appointmentId: 2, userId: 1, date: {year: 2024, month: 8, day: 11}, time: {hour: 9, minute: 15}, serviceId: 12 },
    { appointmentId: 3, userId: 1, date: {year: 2024, month: 9, day: 12}, time: {hour: 10, minute: 30}, serviceId: 13 },
    { appointmentId: 4, userId: 1, date: {year: 2024, month: 10, day: 13}, time: {hour: 13, minute: 45}, serviceId: 17 },
    { appointmentId: 5, userId: 1, date: {year: 2024, month: 11, day: 14}, time: {hour: 14, minute: 0}, serviceId: 11 },
]

export const mockAvailability = [
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 8, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 8, minute: 30 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 9, minute: 0, }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 9, minute: 30 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 10, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 10, minute: 30 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 11, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 10 }, time: { hour: 11, minute: 30 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 11 }, time: { hour: 8, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 11 }, time: { hour: 9, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 11 }, time: { hour: 10, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 11 }, time: { hour: 11, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 11 }, time: { hour: 13, minute: 0 }, serviceId: 11 },
    { date: { year: 2024, month: 7, day: 11 }, time: { hour: 14, minute: 0 }, serviceId: 11 },
]

export const mockCredits = [

    { creditId: 1, userId: 1, serviceId: 11, status: 'active' },
    { creditId: 2, userId: 1, serviceId: 11, status: 'active' },
    { creditId: 3, userId: 1, serviceId: 12, status: 'active' },
    { creditId: 4, userId: 1, serviceId: 31, status: 'inactive' }
]

export const mockFiles = []

export const mockUser = [
    {
        userId: 1, 
        userName: 'pedrobemfica', 
        password: '123',
        jwt: 'a1',
        preferences: {
            name: 'Pedro Bemfica', 
            email: 'pedrobemfica@gmail.com', 
            cellPhone: '+55 31 99603-0423', 
            gender: 'M', 
            birthYear: 1986, 
            birthMonth: 6, 
            birthDay: 6
        }
    },
    {
        userId: 2, 
        userName: 'johndo', 
        password: 'abc', 
        preferences: {
            name: 'John Do', 
            email: 'johndo@gmail.com', 
            cellPhone: '+1 157-345-0080', 
            gender: 'M', 
            birthYear: 1990, 
            birthMonth: 2, 
            birthDay: 8
        }
    }

]

export const mockCart = []