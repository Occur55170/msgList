import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import $ from 'jquery'
// import memberModules from './member'
import AlertMSGModules from './AlertMessage'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  namespaced: true,
  state: {
    isLoading: false
  },
  actions: {
    upadateisLoad (context, status) {
      context.commit('LOAD', status)
    }
  },
  mutations: {
    LOAD (state, status) {
      state.isLoading = status
    }
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
    // memberModules,
    AlertMSGModules
  }
})
