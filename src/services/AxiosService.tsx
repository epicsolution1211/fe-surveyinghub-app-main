import axios, {AxiosResponse} from 'axios'


const getHeaders = ((token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Credentials': true
        }
    }
})

function promise<Type>(request: Promise<AxiosResponse<Type>>): Promise<Type> {
    return new Promise((resolve, reject) => {
        request
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}

export const AxiosService = new (class {
    get<Type>(url: string): Promise<Type> {
        return promise(axios.get(url))
    }

    getAuth<Type>(url: string, userToken: string, params?: { [key: string]: any }): Promise<Type> {
        return promise(axios.get(url, {...getHeaders(userToken), params: params ?? {}}))
    }

    post<Type>(url: string): Promise<Type> {
        return promise(axios.post(url))
    }

    postAuth<Type>(url: string, userToken: string, params?: { [key: string]: any }, body?:any): Promise<Type> {
        return promise(axios.post(url, body ?? null, {...getHeaders(userToken), params: params ?? {}}))
    }

    deleteAuth<Type>(url: string, userToken: string, params?: { [key: string]: any }): Promise<Type> {
        return promise(axios.delete(url, {...getHeaders(userToken), params: params ?? {}}))
    }
})()
