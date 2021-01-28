import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    issues: []
  },
  mutations: {
    add_issue (state, newIssue) {
      state.issues.push(newIssue)
    }
  },
  actions: {
    add_issueAction (context, newIssue) {
      context.commit('add_issue', newIssue)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
