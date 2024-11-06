import type { IGenericObject } from "@/interfaces"

const api = {
    async get(path: string, params: IGenericObject = {}) {
        return call(path, params, 'GET')
    },

    async post(path: string, params: IGenericObject = {}) {
        return call(path, params, 'POST')
    },

    async put(path: string, params: IGenericObject = {}) {
        return call(path, params, 'PUT')
    },

    async delete(path: string, params: IGenericObject = {}) {
        return call(path, params, 'DELETE')
    }
}

const call = async (path: string, params: IGenericObject = {}, method: string) => {
    const headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    ,
    })

    const args: RequestInit = {
        headers,
        method
    }

    // Add body to the request if the method is not GET
    if (method !== 'GET') {
        args['body'] = JSON.stringify(params)
    } 
    
    // Add query parameters to the path if the method is GET
    if (method === 'GET') {
        path += '?' + new URLSearchParams(params).toString()
    }

    try {
        const response = await fetch(import.meta.env.VITE_API_URL + path, args)
        const results = await response.json()
        return {
            data: results,
            status: response.status
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}

export default api