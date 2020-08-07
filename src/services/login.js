import api from './api'
let service = {}
let config = {
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
}
service.login = function(user, password){
    return api.post('api/login', {user,password},config).then(res => res.data)
}

export default service