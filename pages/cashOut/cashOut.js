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
    let reg = /^0$|^0\.$|^0\.[0-9]{1,2}$|^[1-9]\d*$|^[1-9]\d*\.$|^[1-9]\d*\.[0-9]{1,2}$/;
    if (reg.test(e.detail.value)) {
      this.setData({
        value: e.detail.value
      })
    } else { 
      this.setData({
        value: e.detail.value.slice(0, e.detail.value.length - 1)
      })
    }
  },
  affirm(e) {
    let oldValue = this.data.value
    let newValue = (oldValue.substring(oldValue.length - 1) == '.') ? oldValue.substring(0, oldValue.length - 1) : oldValue;
    this.setData({
      value: newValue
    })
    let data = {
      user_id: app.data.userId,
      amount: newValue
    }
    if (this.data.value > this.data.balance) {
      wx.showToast({
        title: '提取金额不能超出余额',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true,
        success: (result) => {
          this.setData({
            value: this.data.balance
          })
        },
        fail: () => { },
        complete: () => { }
      })
    } else if (this.data.value <=0) {
      wx.showToast({
        title: '提取金额需大于0元',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true,
        success: (result) => {
          this.setData({
            value: ''
          })
        },
        fail: () => { },
        complete: () => { }
      })
    } else {
      app.util.request('POST', `/v1/rrd-wx-app/partner/withdraw`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
        if (res.data.code === "200") {
          wx.showToast({
            title: "提取成功",
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
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
            mask: true,
            success: (result) => { },
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
    app.data.userId = wx.getStorageSync('userId')
    app.data.token = wx.getStorageSync('token')
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