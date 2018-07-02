import Service from '~/plugins/axios'
import UaParse from '~/utils/ua-parse'
import axios from 'axios'

export const strict = false
export const actions = {
  nuxtServerInit (store, {params, route, req}) {
    if (req.session && req.session.authUser) {
      store.commit('option/SET_USER', req.session.authUser)
    }
    // 检查设备类型
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
    const {isMobile, isIE, isSafari, isEdge, isFF, isBB, isMaxthon, isIos} = UaParse(userAgent)
    const mustJpg = (isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge)
    let start = {
      'num': 20
    }
    let startheme = {
      'num': 100
    }
    let initAppData = []
    if (!isMobile) {
      initAppData = [
        //   // 配置数据
        store.dispatch('loadListInfo', start),

        store.dispatch('loadTag'),
        store.dispatch('loadListTheme', startheme),
        store.dispatch('loadSideList')
        // store.dispatch('loadFocusInfo', start),
        // store.dispatch('loadHotInfo', start),

        //   store.dispatch('loadGlobalOption'),
        //   // 内容数据
        //   store.dispatch('loadTagList'),
        //   store.dispatch('loadCategories')
      ]
    } else {
      initAppData = [
        //   // 配置数据
        store.dispatch('loadListInfo', start),
        store.dispatch('loadListTheme', startheme),
        store.dispatch('loadSideList')
        // store.dispatch('loadFocusInfo', start),
        // store.dispatch('loadHotInfo', start),
      ]
    }
    // store.commit('option/SET_IMG_EXT', mustJpg ? 'jpeg' : 'webp')
    // store.commit('option/SET_MOBILE_LAYOUT', isMobile)
    // store.commit('option/SET_USER_AGENT', userAgent)

    // // 如果不是移动端的话，则请求热门文章
    return Promise.all(initAppData)
  },
  // 加载主页侧边栏文章
  async loadSideList ({commit}, params = {}) {
    return Service.get(`/api/mainSide?start=3`)
      .then(res => {
        commit('option/SET_SIDELIST', res.data)
        return Promise.resolve(res.data)
      }, err => {
        commit('article/SET_SIDELIST', err)
        return Promise.reject(err)
      })
  },
  // 加载主页的推荐新闻数据
  async loadListInfo ({commit}, params = {}) {
    return Service.get(`/api/list?start=${params.num}`)
      .then(res => {
        res.data.forEach((currentValue, index, array) => {
          res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
          res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
          res.data[index].content = res.data[index].content === null ? res.data[index].content : res.data[index].content.replace(/<.*?>/ig, '')
          if (parseInt(res.data[index].showType) === 2) {
            res.data[index].imgArr = []
            let imgList = res.data[index].img.split(',')
            imgList = cleanArray(imgList)
            res.data[index].imgArr = imgList
          }
        })
        commit('option/SET_LISTINFO', res.data)
        return Promise.resolve(res.data)
      }, err => {
        commit('article/SET_LISTINFO', err)
        return Promise.reject(err)
      })
  },
  // 加载主页的关注新闻数据
  async loadFocusInfo ({commit}, params = {}) {
    return Service.get(`/news/focus?start=${params.num}`)
      .then(res => {
        res.data.forEach((currentValue, index, array) => {
          res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
          res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
          res.data[index].content = res.data[index].content === null ? res.data[index].content : res.data[index].content.replace(/<.*?>/ig, '')
        })
        commit('option/SET_FOCUSINFO', res.data)
      })
  },
  // 加载主页的热门新闻数据
  async loadHotInfo ({commit}, params = {}) {
    return Service.get(`/news/hot?start=${params.num}`)
      .then(res => {
        res.data.forEach((currentValue, index, array) => {
          res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
          res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
          res.data[index].content = res.data[index].content === null ? res.data[index].content : res.data[index].content.replace(/<.*?>/ig, '')
          if (parseInt(res.data[index].showType) === 2) {
            res.data[index].imgArr = []
            let imgList = res.data[index].img.split(',')
            imgList = cleanArray(imgList)
            res.data[index].imgArr = imgList
          }
        })
        commit('option/SET_HOTINFO', res.data)
      })
  },
  // 加载主页主题图片和数据
  loadListTheme ({commit}, params = {}) {
    return Service.get(`/api/getTheme?num=${params.num}`)
      .then(res => {
        commit('option/SET_THEME', res.data)
      })
  },
  //  加载主页标签数据
  loadTag ({commit}) {
    return Service.get(`/api/oftenTag?num=3`)
      .then(res => {
        let tagList = {}
        // for (let key in res.data) {
        //   tagList[key] = {}
        //   tagList[key].number = res.data[key].types
        //   tagList[key].id = key
        //   tagList[key].ids = res.data[key].id
        // }
        commit('option/SET_CELLS', res.data)
      })
  },
  async loadArticleDetail ({commit}, params = {}) {
    console.log(params)
    return Service.get(`/api/recommend?uid=${params.detail_id} `)
      .then(res => {
        // res.data[0].img =  res.data[0].img
        let pathname = (res.data[0].img).split('/')
        if (pathname[pathname.length - 1] === '') {
          res.data[0].img = pathname[pathname.length - 1]
        }
        commit('article/SET_DETAILLIST', res.data)
        return Promise.resolve(res.data)
      }, err => {
        commit('article/SET_DETAILLIST', err)
        return Promise.reject(err)
      })
  },
  // 加载主题信息
  async loadThemeDetail ({commit}, params = {}) {
    return Service.get(`/api/theme?uid= ${params.theme_id} `)
      .then(res => {
        let result = res.data[0].aList
        result.forEach((currentValue, index, array) => {
          if (parseInt(result[index].showType) === 2) {
            result[index].imgArr = []
            let imgList = result[index].img.split(',')
            imgList = cleanArray(imgList)
            result[index].imgArr = imgList
          }
        })
        res.data[0].aList = result
        console.log(res.data[0])
        commit('option/SET_THEMELIST', res.data[0])
        return Promise.resolve(res.data)
      })
  },
  async loadThemeDetail2 ({commit}, params = {}) {
    return Service.get(`/api/theme2?uid= ${params.theme_id}&&limit=${params.limit} `)
      .then(res => {
        commit('option/SET_THEMELIST', res.data[0])
        return Promise.resolve(res.data)
      })
  },
  loadLoginState ({commit}, params) {
    commit('option/SET_LOGINSTATE', params)
  },
  loadUsername ({commit}, username) {
    commit('option/SET_USERNAME', username)
  },
  loadAvator ({commit}, avator) {
    commit('option/SET_AVATOR', avator)
  },
  loadUserData ({commit}, userData) {
    commit('option/SET_USERDATA', userData)
  },
  async logining ({commit}, data) {
    commit('option/SET_USER', data)
  },
  // 登陆 //退出
  async login ({commit}, {username, password}) {
    try {
      axios.get(`/api/login?username=${username}&&password=${password}`)
        .then((res) => {
          commit('option/SET_USER', res.data)
        })
      // const {data} = axios.post(`http://data.maopingshou.com/login`, {username, password})
      // commit('option/SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout ({commit}) {
    axios.post(`/api/logout`)
    commit('option/SET_USER', null)
  }
}

// 清除数组中的空元素
function cleanArray (actual) {
  let newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
