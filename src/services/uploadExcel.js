import api from './api'
let service = {}
let config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

service.uploadFile = function (formData) {
    config.headers.Authorization = sessionStorage.getItem("user-token");
    return api.post('api/post', formData, config).then(res => res.data)
}

export default service