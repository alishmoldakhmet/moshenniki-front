import axios from "axios"
import { env } from '../constants'


/* LOGIN */
export const login = data => {
    const uri = `${env.startpoint}user/login`
    return axios.post(uri, data).then(response => response).catch(error => error.response)
}

/* REGISTER */
export const register = data => {
    const uri = `${env.startpoint}user/registration`
    return axios.post(uri, data).then(response => response).catch(error => error.response)
}

/* GET */
export const get = token => {
    const uri = `${env.startpoint}user/get`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.get(uri, headers).then(response => response).catch(error => error.response)
}

/* UPLOAD IMAGE */
export const upload = (token, data) => {
    const uri = `${env.startpoint}user/upload`
    const headers = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}

/* EDIT */
export const edit = (token, data) => {
    const uri = `${env.startpoint}user/edit`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}

/* PASSWORD */
export const changePassword = (token, data) => {
    const uri = `${env.startpoint}user/password`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}

/* CHANGE STATUS */
export const change = (token, data) => {
    const uri = `${env.startpoint}user/change`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}
