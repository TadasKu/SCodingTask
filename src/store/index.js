import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    issues: []
  },
  mutations: {
    AddIssue (state, newIssue) {
      state.issues.push(newIssue)
    },
    ChangeIssue(state, issue){
      state.issues[issue.index]= issue
    }
  },
  actions: {
    AddIssueAction (context, newIssue) {
      context.commit('AddIssue', newIssue)
    },
    ChangeIssueStatusAction (context, issue) {
      context.commit('ChangeIssue', issue)
    },
    ChangeTrashStatusAction(context, issue) {
      context.commit('ChangeIssue', issue)
    },
    ChangeIssueAction(context, issue) {
      context.commit('ChangeIssue', issue)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
