import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import $ from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
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
    // getlogStatus (state, userID) {
    //   const api = `${process.env.VUE_APP_MEMBER}`
    //   let data = { 'userID': userID }
    //   if (userID !== '') {
    //     $.ajax({
    //       type: 'get',
    //       url: api,
    //       data: data,
    //       success: response => {
    //         response = JSON.parse(response)
    //         console.log(response)
    //       },
    //       error: response => {
    //         console.log(response)
    //       }
    //     })
    //   } else {
    //     console.log('尚未登入')
    //   }
    // }
  },
  modules: {

  }
})
