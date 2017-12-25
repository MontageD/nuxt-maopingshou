function getUrl () {
  let pathname = (window.location.pathname).split('/')
  let url = pathname[pathname.length - 1]
  return url
}

window.utils = window.utils || {}
window.utils.getUrl = getUrl()
