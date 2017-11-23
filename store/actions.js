import * as types from './mutations-type'

export const insertUser = function ({commit, state}, {username, password}) {
  commit(types.SET_USERNAME, username)
  commit(types.SET_PASSWORD, password)
}
