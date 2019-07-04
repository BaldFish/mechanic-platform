const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const requestGet = (url) => { }
const requestPost = () => { }
const requestPostToken = () => { }
const request = (method, url, contentType, data, token, callback) => {
  //加载动画 
  wx.showLoading({
    title: "加载中",
    mask:true
  })
  if (token) {
    //请求服务端接口
    wx.request({
      method: method,//方式
      url: 'https://wxmp-api.renrendao.net' + url,//url为地址
      header: {
        "Content-Type": contentType,//处理form表单的请求头
        "cache-control": "no-cache",//处理在回调时反应慢的问题（可不写）
        "X-Access-Token": token
      },
      data: data,//所需要传的参数
      dataType: 'json',
      responseType: 'text',
      success: function (res) {//请求成功后
        wx.hideLoading();//请求成功后加载动画结束
        return typeof callback == "function" && callback(res)//用来判断返回的是否是函数

      },
      fail: function (res) {//请求失败
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof callback == "function" && callback(false)
      },
    })
  } else { 
    //请求服务端接口
    wx.request({
      method: method,//方式
      url: 'https://wxmp-api-test.renrendao.net' + url,//url为地址
      header: {
        "Content-Type": contentType,//处理form表单的请求头
        "cache-control": "no-cache"//处理在回调时反应慢的问题（可不写）
      },
      data: data,//所需要传的参数
      dataType: 'json',
      responseType: 'text',
      success: function (res) {//请求成功后
        wx.hideLoading();  //请求成功后加载动画结束
        return typeof callback == "function" && callback(res)//用来判断返回的是否是函数

      },
      fail: function (res) {//请求失败
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof callback == "function" && callback(false)
      },
    })
  }

  
}

module.exports = {
  formatTime: formatTime,
  request: request
}
