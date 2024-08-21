import { BACKEND } from "./routes.js"

const BASE_ROUTE = '/services'
export class ApiServices {
    static async single() {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/single`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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

    static async package() {
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/package`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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
}