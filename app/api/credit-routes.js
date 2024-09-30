import { BACKEND } from "./routes.js"
import { Cookies } from "../helpers/cookie-helper.js"

const BASE_ROUTE = '/credits'
export class ApiCredits {

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
}