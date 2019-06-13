// pages/queryHistory/queryHistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    limit: 10,
    userId: "",
    token: "",
    ordrList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userId = wx.getStorageSync('userId')
    this.data.token = wx.getStorageSync('token')
    app.util.request('GET', `/v1/rrd-wx-app/order/list/${this.data.userId}?start=${this.data.ordrList.length}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
      if (res.data.data.res_list !== []) {
        res.data.data.res_list.forEach((item) => {
          item.created_at = app.util.formatTime(new Date(item.created_at))
          switch (item.type) {
            case 3: item.typeName = "电路图";item.url="/images/dianlu2.png"
              break;
            case 5: item.typeName = "维修手册"; item.url = "/images/weixiu2.png"
              break;
          }
        })
      }
      this.setData({
        ordrList: res.data.data.res_list
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