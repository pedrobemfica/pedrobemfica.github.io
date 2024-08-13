import { BACKEND } from "./routes.js"
import { Cookies } from "../helpers/cookie-helper.js"

const BASE_ROUTE = '/files'
export class ApiFiles {
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

    static async download(fileId) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/download`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ fileId })
            })
    
            const file = await response.blob()
            const data = await response.json()
    
            if (!file || !data)
                return {result: false, message: 'Não foi possível conectar com o servidor'}
            
            if (response.ok) 
                return {result: true, file: file, fileName: data.fileName}
            else 
                return {result: false, message: data.message}
            
        } catch {
            return {result: false, message: 'Não foi possível conectar com o servidor'}
        }
    }

    static async upload(label, formData) {
        const token = Cookies.getCookie('jwt')
        try {
            const response = await fetch(`${BACKEND}${BASE_ROUTE}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ label, formData })
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