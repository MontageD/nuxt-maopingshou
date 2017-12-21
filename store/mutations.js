import * as types from './mutations-type'

const mutations = {
  [types.SET_LOGIN] (state, loginState) {
    state.loginState = loginState
  },
  [types.SET_MODEDATA] (state, modeData) {
    state.modeData = modeData
  },
  [types.SET_PASSWORD] (state, password) {
    state.password = password
  },
  [types.SET_USERNAME] (state, username) {
    state.username = username
  },
  [types.SET_SEARCHLIST] (state, searchList) {
    state.searchList = searchList
  },
  [types.SET_ORDERID] (state, orderId) {
    state.orderId = orderId
  }
}

export default mutations
