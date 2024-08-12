import axios from "axios"
import { env } from '../constants'

/* GET */
export const get = data => {
    const uri = `${env.startpoint}review/list`
    return axios.get(uri, { params: data }).then(response => response).catch(error => error.response)
}

/* GET MY REVIEWS */
export const my_reviews = () => {
    const uri = `${env.startpoint}review/my-reviews`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.get(uri, {}, headers).then(response => response).catch(error => error.response)
}


/* CREATE */
export const create = (token, data) => {
    const uri = `${env.startpoint}review/create`
    const headers = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}

/* EDIT */
export const edit = (token, data) => {
    const uri = `${env.startpoint}review/edit`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}

/* REMOVE */
export const remove = (token, data) => {
    const uri = `${env.startpoint}review/remove`
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    return axios.post(uri, data, headers).then(response => response).catch(error => error.response)
}