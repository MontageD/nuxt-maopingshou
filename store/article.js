/*
*
* 全局设置数据状态
*
*/
export const state = () => {
  return {
    // 主页新闻数据
    detailList: {}
    // 主页标签数据
  }
}

export const getters = {
  getDetailList: state => state.detailList
}

export const mutations = {
  SET_DETAILLIST (state, action) {
    state.detailList = action
  }
}
