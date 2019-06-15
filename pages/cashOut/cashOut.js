// pages/cashOut/cashOut.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
    token: "",
    value: "",
    tips: "",
    balance: "0",
  },
  all(e) {
    this.setData({
      value: this.data.balance
    })
  },
  input(e) {
    this.setData({
      value: e.detail.value
    })
  },
  affirm(e) {
    let data = {
      user_id: this.data.userId,
      amount: this.data.value
    }
    if (this.data.value <= 0) {
      wx.showToast({
        title: '提取金额需大于0',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: false,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    } else if (this.data.value > this.data.balance) {
      wx.showToast({
        title: '提取金额不能超出余额',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: false,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      })
    } else {
      app.util.request('POST', `/v1/rrd-wx-app/partner/withdraw`, 'application/x-www-form-urlencoded', data, `${this.data.token}`, (res) => {
        if (res.data.code === "200") {
          wx.showToast({
            title: "提取成功",
            icon: 'none',
            image: '',
            duration: 2000,
            mask: false,
            success: (result) => { },
            fail: () => { },
            complete: () => {
              setTimeout(() => {
                wx.redirectTo({
                  url: "/pages/myAsset/myAsset"
                })
              }, 1500); 
            }
          })

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            image: '',
            duration: 2000,
            mask: false,
            success: (result) => {},
            fail: () => { },
            complete: () => { }
          })
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userId = wx.getStorageSync('userId')
    this.data.token = wx.getStorageSync('token')
    this.setData({
      tips: `本次最多可提出${options.balance}元`,
      balance: options.balance
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