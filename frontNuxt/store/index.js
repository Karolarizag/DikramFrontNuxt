// export const getters = {
//   role(state) {
//     return state.auth.role
//   }
// }

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      async getUser (state, { axios, user }) {
        const userData = await axios.$get(`/users/${user._id}`)
        state.auth.user = userData
      }
    }
  })
}

export default createStore
