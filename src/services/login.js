import api from './api'
let service = {}
service.login = function(user, password){
    return api.post('api/login', {user,password}).then(res => res.data)
}

export default service