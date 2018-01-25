let filters = {}
filters.prototype = {
  required: (data, message, _this) => {
    if (!data) {
      let obj = {
        message: message
      }
      _this.alertNow.push(obj)
      setTimeout(() => {
        _this.alertNow.splice(_this.alertNow.length - 1, 1)
      }, 2000)
    }
  },
  username: (data, message, _this) => {
  }
}
window.utils = window.utils || {}
window.utils.filter = filters
