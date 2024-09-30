import { BACKEND } from "./routes.js"
import { Cookies } from "../helpers/cookie-helper.js"

const BASE_ROUTE = '/appointments'
export class ApiAppointments {

    static async list() {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/list`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, list: data.list}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async create(dateString, timeString, serviceId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/list`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ dateString, timeString, serviceId })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async delete(appointmentId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/list`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ appointmentId })
            })
    
            const data = await response.json()
    
            if (!data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, message: data.message}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }
}