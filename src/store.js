
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    
    state: {
        isAdminLogged: false
    },
    mutations: {
        loggedAdmin(state) {
            state.isAdminLogged = true;
        },
        disconnectAdmin(state) {
            state.isAdminLogged = false;
        }
    },
    actions: {
        loggedAdminAction(context) {
            context.commit('loggedAdmin')
        },
        disconnectAdminAction(context) {
            context.commit('disconnectAdmin')
        }
        
    },
    getters:{
        stateAdminLogged(state) {
            return state.isAdminLogged;
        }
    }

})