import * as types from './mutations-type'

export const insertUser = function ({commit, state}, {username, password}) {
  commit(types.SET_USERNAME, username)
  commit(types.SET_PASSWORD, password)
}

export const insertOrderId = function ({commit, state}, {orderId}) {
  commit(types.SET_ORDERID, orderId)
}

export const insertPostList = function ({commit, state}, {postList}) {
  commit(types.SET_POSTLIST, postList)
}

export const insertDetaiList = function ({commit, state}, {detaiList}) {
  commit(types.SET_POSTLIST, detaiList)
}
