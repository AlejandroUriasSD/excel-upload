export const getters = {
    getInfoUser: state => {
        return state.datosUsuario
    },
    getTokenUser: state =>{
        return state.datosUsuario.token
    }
}