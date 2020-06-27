import { UPDATE_INFO_USER } from "./mutations-types"

export const actions = {
    updateUserInfo({ commit }, payload) {
        commit(UPDATE_INFO_USER, payload)
    }
}