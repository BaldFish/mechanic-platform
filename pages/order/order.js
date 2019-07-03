// pages/queryHistory/queryHistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    limit: 5,
    userId: "",
    token: "",
    ordrList: [],
  },
  turnRead(e) {
    app.data.manualId = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: `/pages/read/read`
    })
  },
  //跳转开通VIP
  turnOpenVip(e) {
    wx.navigateTo({
      url: `/pages/openVip/openVip?open=false`
    })
  },
  getOrderList() {
    app.util.request('GET', `/v1/rrd-wx-app/order/list/${app.data.userId}?start=${this.data.start}&limit=${this.data.limit}`, 'application/json', '', `${app.data.token}`, (res) => {
      if (res.data.data.res_list.length !== 0) {
        res.data.data.res_list.forEach((item) => {
          item.created_at = app.util.formatTime(new Date(item.created_at))
          switch (item.type) {
            case 3: item.typeName = "电路图"; item.url = "/images/dianlu2.png"
              break;
            case 5: item.typeName = "维修手册"; item.url = "/images/weixiu2.png"
              break;
          }
        })
        this.setData({
          ordrList: res.data.data.res_list
        })
      } else {
        wx.showToast({
          title: '全部订单加载完成',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.data.userId = wx.getStorageSync('userId')
    app.data.token = wx.getStorageSync('token')
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
    this.getOrderList();
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
    this.getOrderList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    app.util.request('GET', `/v1/rrd-wx-app/order/list/${app.data.userId}?start=${this.data.ordrList.length}&limit=${this.data.limit}`, 'application/json', '', `${app.data.token}`, (res) => {
      if (res.data.data.res_list.length !== 0) {
        res.data.data.res_list.forEach((item) => {
          item.created_at = app.util.formatTime(new Date(item.created_at))
          switch (item.type) {
            case 3: item.typeName = "电路图"; item.url = "/images/dianlu2.png"
              break;
            case 5: item.typeName = "维修手册"; item.url = "/images/weixiu2.png"
              break;
          }
        })
        this.setData({
          ordrList: this.data.ordrList.concat(res.data.data.res_list)
        })
      } else {
        wx.showToast({
          title: '没有更多数据',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})