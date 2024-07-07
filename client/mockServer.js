export const mockAppointments = [
    {id: 1, minute: 45, hour: 8, day: 13, month: 1, year: 2024, service:2, status:'Concluído'}, 
    {id: 2, minute: 0, hour: 8, day: 5, month: 10, year: 2024, service: 1, status:'Agendado'}, 
    {id: 3, minute: 15, hour: 8, day: 15, month: 5, year: 2024, service: 1, status:'Concluído'}, 
    {id: 4, minute: 0, hour: 8, day: 25, month: 7, year: 2024, service: 4, status:'Agendado'}, 
    {id: 5, minute: 30, hour: 15, day: 7, month: 11, year: 2024, service: 3, status:'Agendado'}
];

export const mockAvailability = [
    {minute: 0, hour: 8, day: 10, month: 7, year: 2024, service:1},
    {minute: 30, hour: 8, day: 10, month: 7, year: 2024, service:1},
    {minute: 0, hour: 9, day: 10, month: 7, year: 2024, service:1},
    {minute: 30, hour: 9, day: 10, month: 7, year: 2024, service:1},
    {minute: 0, hour: 10, day: 10, month: 7, year: 2024, service:1},
    {minute: 30, hour: 10, day: 10, month: 7, year: 2024, service:1},
    {minute: 0, hour: 11, day: 10, month: 7, year: 2024, service:1},
    {minute: 30, hour: 11, day: 10, month: 7, year: 2024, service:1},
    {minute: 0, hour: 8, day: 11, month: 7, year: 2024, service:1},
    {minute: 0, hour: 9, day: 11, month: 7, year: 2024, service:1},
    {minute: 0, hour: 10, day: 11, month: 7, year: 2024, service:1},
    {minute: 0, hour: 11, day: 11, month: 7, year: 2024, service:1},
    {minute: 0, hour: 13, day: 11, month: 7, year: 2024, service:1},
    {minute: 0, hour: 14, day: 11, month: 7, year: 2024, service:1},


];

export const mockCredits = [
    {id: 2, service: 1, quantity: 2}, 
    {id: 6, service: 4, quantity: 1}
];

export const mockFiles = [];

export const mockUser = {
    id: 1, 
    username: 'pedrobemfica', 
    password: '123', 
    name: 'Pedro Bemfica', 
    email: 'pedrobemfica@gmail.com', 
    cell_phone: '', 
    gender: 'M', 
    birth_year: 1986, 
    birth_month: 6, 
    birth_day: 6
};