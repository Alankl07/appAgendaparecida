import axios from 'axios';
import { environment } from '../environment/environment';

class ApiServe {
    private baseUrl = environment.url;

    getNoites(endPoint: string){
        return axios.get(`${this.baseUrl}${endPoint}`)
    }

    post(endPoint: string, data: {}){
        console.log(data);
        return axios.post(`${environment.url}${endPoint}`, data)
    }

    get(endPoint: string, data: {}){
        return axios.get(`${environment.url}${endPoint}`, data)
    }

    getAgendamento(endPoint: string, id: string){
        console.log(`${environment.url}${endPoint}${id}`)
        return axios.get(`${environment.url}${endPoint}${id}`)
    }

    cancelarAgendamento(endPoint: string, ids: {}){
        console.log(`${environment.url}${endPoint}`, ids)
        return axios.post(`${environment.url}${endPoint}`, ids)
    }
}

export const Api = new ApiServe();