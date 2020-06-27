import Vue from 'vue';
import Vuex from 'vuex';
import index from './index'
import uploadExcel from "./modules/uploadExcel"

Vue.use(Vuex);

export default new Vuex.Store({
    ...index,
    modules: {
        uploadExcel:{
            namespaced:true,
            ...uploadExcel
        }
    }
});