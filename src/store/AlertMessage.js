export default {
  strict: true,
  namespaced: true,
  state: {
    messages: []
  },
  actions: {
    updateMessage (context, { message, success }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('ADDMESSAGE', { message, success, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage (context, num) {
      context.commit('REMOVEMESSAGE', num)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVEMESSAGEWITHTIME', timestamp)
      }, 5000)
    }
  },
  mutations: {
    ADDMESSAGE (state, status) {
      state.messages.push(status)
    },
    REMOVEMESSAGE (state, num) {
      state.messages.splice(num, 1)
    },
    REMOVEMESSAGEWITHTIME (state, status) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === status) {
          state.messages.splice(i, 1)
        }
      })
    }
  },
  getters: {
    messages: (state) => state.messages
  }
}
