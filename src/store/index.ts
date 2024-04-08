import { isEmpty } from 'lodash'
import { createStore } from 'vuex'

const state = () => {
  return {
    user: !isEmpty(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')!) : null,
    token: !isEmpty(localStorage.getItem('token'))
      ? JSON.parse(localStorage.getItem('token')!)
      : null
  }
}

const getters = {
  getUser(state: Record<string, any>) {
    return state.user
  },
  getToken(state: Record<string, any>) {
    return state.token
  }
}

const mutations = {
  setUser(state: Record<string, any>, data: any) {
    state.user = data
  },
  setToken(state: Record<string, any>, data: any) {
    state.token = data
  }
}

const actions = {
  async postLogin({ commit }: Record<string, any>, { user, token }: Record<string, any>) {
    commit('setUser', user)
    localStorage.setItem('user', JSON.stringify(user))

    commit('setToken', token)
    localStorage.setItem('token', JSON.stringify(token))
  },
  async logout({ commit }: Record<string, any>) {
    commit('setUser', null)
    localStorage.removeItem('user')

    commit('setToken', null)
    localStorage.removeItem('token')
  }
}

const modules = {}

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})

export default store
