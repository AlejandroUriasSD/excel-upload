import  {UPDATE_INFO_USER}  from "./mutations-types"

export const mutations = {
    [UPDATE_INFO_USER](state, userInfo){
        state.datosUsuario = {
            ...userInfo
        }
    }
}