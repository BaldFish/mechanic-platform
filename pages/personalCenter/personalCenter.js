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
      url: `/pages/openVip/openVip`
    })
  },
  turnPage(e) {
    let page = e.currentTarget.dataset.page;
    switch (page) {
      case "1": wx.navigateTo({
        url: `/pages/integralList/integralList`
      })
        break;
      case "2": wx.switchTab({
        url: `/pages/order/order`
      })
        break;
      case "3": wx.navigateTo({
        url: `/pages/myAsset/myAsset`
      })
        break;
      case "4": wx.navigateTo({
        url: `/pages/partner/partner`
      })
        break;
    }
  },
  //获取用户信息
  getUserInfo() { 
    app.util.request('GET', `/v1/rrd-wx-app/user/info/${app.data.userId}`, 'application/json', '', `${app.data.token}`, (res) => {
      let userInfo = res.data.data;
      if (userInfo.isvip) {
        userInfo.day = Math.ceil((userInfo.expire_time - userInfo.server_time) / 86400);
      }
      userInfo.user_phone = userInfo.user_phone.slice(3);
      wx.setStorageSync("address", userInfo.address);
      this.setData({
        userInfo: userInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.data.userId = wx.getStorageSync('userId');
    app.data.token = wx.getStorageSync('token');
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
    this.getUserInfo();
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