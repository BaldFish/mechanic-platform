// pages/myAsset/myAsset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        url_dj: "/images/jiaoyi_dj.png",
        url_mr: "/images/jiaoyi_mr.png",
        text: "交易记录"
      },
      {
        id: 1,
        url_dj: "/images/tixian_dj.png",
        url_mr: "/images/tixian_mr.png",
        text: "提现记录"
      }
    ],
    nowIndex: 0,
  },
  tabs(e) {
    let index = e.currentTarget.dataset.index;
    if (index === this.data.nowIndex) {
      return
    } else {
      this.setData({
        nowIndex: index
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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