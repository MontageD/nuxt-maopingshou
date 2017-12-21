import * as types from './mutations-type'

export const insertUser = function ({commit, state}, {username, password}) {
  commit(types.SET_USERNAME, username)
  commit(types.SET_PASSWORD, password)
}

export const insertOrderId = function ({commit, state}, {orderId}) {
  commit(types.SET_ORDERID, orderId)
}
