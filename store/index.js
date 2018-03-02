import Service from '~/plugins/axios'
import UaParse from '~/utils/ua-parse'
import axios from 'axios'

export const actions = {
  nuxtServerInit (store, {params, route, req}) {
    if (req.session && req.session.authUser) {
      store.commit('option/SET_USER', req.session.authUser)
    }
    // 检查设备类型
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
    const {isMobile, isIE, isSafari, isEdge, isFF, isBB, isMaxthon, isIos} = UaParse(userAgent)
    const mustJpg = (isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge)
    store.commit('option/SET_IMG_EXT', mustJpg ? 'jpeg' : 'webp')
    store.commit('option/SET_MOBILE_LAYOUT', isMobile)
    store.commit('option/SET_USER_AGENT', userAgent)
    let start = {
      'num': 10
    }
    const initAppData = [
      //   // 配置数据
      store.dispatch('loadListInfo', start),
      store.dispatch('loadTag')
      //   store.dispatch('loadGlobalOption'),
      //   // 内容数据
      //   store.dispatch('loadTagList'),
      //   store.dispatch('loadCategories')
    ]
    // // 如果不是移动端的话，则请求热门文章
    if (!isMobile) {
      // console.log('这不是移动端....')
    }
    return Promise.all(initAppData)
  },
  // 加载主页的新闻数据
  loadListInfo ({commit}, params = {}) {
    return Service.get(`http://data.maopingshou.com/list?start=${params.num}`)
      .then(res => {
        res.data.forEach((currentValue, index, array) => {
          res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
          res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
          res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
        })
        commit('option/SET_LISTINFO', res.data)
      })
  },
  //  加载主页标签数据
  loadTag ({commit}) {
    return Service.get(`http://data.maopingshou.com/oftenTag?num=13`)
      .then(res => {
        let tagList = {}
        for (let key in res.data) {
          tagList[key] = {}
          tagList[key].number = res.data[key].type
          tagList[key].id = key
          tagList[key].ids = res.data[key].id
        }
        commit('option/SET_CELLS', tagList)
      })
  },
  loadArticleDetail ({commit}, params = {}) {
    return Service.get(`http://data.maopingshou.com/recommend?uid= ${params.detail_id} `)
      .then(res => {
        res.data[0].img = 'http://data.maopingshou.com/images/' + res.data[0].img
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
  // 登陆 //退出
  login ({commit}, {username, password}) {
    try {
      axios.get(`/api/login?username=${username}&&password=${password}`)
        .then((res) => {
          console.log(res)
          console.log(res.data)
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
