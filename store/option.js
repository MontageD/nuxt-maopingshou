/*
*
* 全局设置数据状态
*
*/
export const state = () => {
  return {
    // 登陆状态
    authUser: null,
    // 主页新闻数据
    listInfo: {},
    // 主页标签数据
    celles: {},
    // 登陆状态
    loginState: 0,
    // 登陆的用户名
    username: '',
    // 登陆头像
    avator: '',
    // 存储登陆后的所有数据
    userData: {},
    // 图片格式
    imgExt: 'webp',
    // 是否为移动端
    mobileLayout: false,
    // ua
    userAgent: '',
    // 服务端博主信息
    adminInfo: {
      fetching: false,
      data: {}
    },
    // 服务端设置的全局配置
    globalOption: {
      fetching: false,
      data: {
        meta: {
          likes: 0
        }
      }
    }
  }
}

export const getters = {
  mobileLayout: state => state.mobileLayout,
  getListInfo: (state) => state.listInfo,
  getCells: (state) => state.celles
}

export const mutations = {
  SET_USER (state, action) {
    state.authUser = action
  },
  SET_LISTINFO (state, action) {
    state.listInfo = action
  },
  SET_USERDATA (state, action) {
    state.userData = action
  },
  SET_LOGINSTATE (state, action) {
    state.loginState = action
  },
  SET_USERNAME (state, action) {
    state.username = action
  },
  SET_AVATOR (state, action) {
    state.avator = action
  },
  SET_CELLS (state, action) {
    state.celles = action
  },
  // 设置UA
  SET_USER_AGENT (state, action) {
    state.userAgent = action
  },
  // 设置图片格式
  SET_IMG_EXT (state, action) {
    state.imgExt = action
  },
  // 设置是否移动端状态
  SET_MOBILE_LAYOUT (state, action) {
    state.mobileLayout = action
  },
  // 获取服务端配置的管理员信息
  REQUEST_ADMIN_INFO (state) {
    state.adminInfo.fetching = true
  },
  REQUEST_ADMIN_INFO_SUCCESS (state, action) {
    state.adminInfo.fetching = false
    state.adminInfo.data = action.result
  },
  REQUEST_ADMIN_INFO_FAILURE (state) {
    state.adminInfo.fetching = false
    state.adminInfo.data = {}
  },
  // 获取服务端配置
  REQUEST_GLOBAL_OPTIONS (state) {
    state.globalOption.fetching = true
  },
  REQUEST_GLOBAL_OPTIONS_SUCCESS (state, action) {
    state.globalOption.fetching = false
    state.globalOption.data = action.result
  },
  REQUEST_GLOBAL_OPTIONS_FAILURE (state) {
    state.globalOption.fetching = false
  }
}
