import api from './api'
let service = {}
let config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

service.uploadFile = function (files) {
    let formData = new FormData();
    config.headers.Authorization = sessionStorage.getItem("user-token");
    files.forEach(file=>{
        formData.append('files', file)
    });
    return api.post('api/post', formData, config).then(res => res.data)
}

export default service