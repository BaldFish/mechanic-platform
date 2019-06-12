// pages/personalCenter/personalCenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
    token: "",
    userInfo: {},
  },

  openVip(e) { 
    wx.navigateTo({
      url: `/pages/openVip/openVip?open=${e.currentTarget.dataset.userinfo.isvip}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userId = wx.getStorageSync('userId')
    this.data.token = wx.getStorageSync('token')
    //获取用户信息
    app.util.request('GET', `/v1/rrd-wx-app/user/info/${this.data.userId}`, 'application/json', '', `${this.data.token}`, (res) => {
      let userInfo = res.data.data
      if (userInfo.isvip) {
        userInfo.day = Math.ceil(789797787881 / 86400000)
      }
      userInfo.user_phone = userInfo.user_phone.slice(3)
      this.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})