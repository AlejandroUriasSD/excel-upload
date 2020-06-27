import axios from 'axios'
import config from './config'

let api = axios.create({
    baseURL: config.BASEURL,
})

export default api