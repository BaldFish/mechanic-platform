// pages/myAsset/myAsset.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
    token: "",
    limit:4,
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
    exchangeList: [],
    withdrawList: [],
    balance:0,
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
  turnWithdraw(e) { 
    wx.navigateTo({
      url: `/pages/cashOut/cashOut?balance=${e.currentTarget.dataset.balance}`
    })
  },
  getMoreList(e) { 
    if (this.data.nowIndex === 0) { 
      app.util.request('GET', `/v1/rrd-wx-app/partner/income/record/${this.data.userId}?start=${this.data.exchangeList.length}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
        if (res.data.data.res_list.length!==0) {
          res.data.data.res_list.forEach((item) => {
            item.created_at = app.util.formatTime(new Date(item.created_at))
            switch (item.type) {
              case 3: item.typeName = "电路图";
                break;
              case 5: item.typeName = "维修手册";
                break;
            }
          })
          this.setData({
            balance: res.data.data.balance,
            exchangeList: this.data.exchangeList.concat(res.data.data.res_list),
          })
        } else { 
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else if (this.data.nowIndex === 1) { 
      app.util.request('GET', `/v1/rrd-wx-app/partner/withdraw/record/${this.data.userId}?start=${this.data.withdrawList.length}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
        if (res.data.data.res_list.length !== 0) {
          res.data.data.res_list.forEach((item) => {
            item.created_at = app.util.formatTime(new Date(item.created_at))
            switch (item.type) {
              case 3: item.typeName = "电路图";
                break;
              case 5: item.typeName = "维修手册";
                break;
            }
          })
          this.setData({
            balance: res.data.data.balance,
            withdrawList: this.data.withdrawList.concat(res.data.data.res_list),
          })
        } else { 
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000
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
    app.util.request('GET', `/v1/rrd-wx-app/partner/income/record/${this.data.userId}?start=${this.data.exchangeList.length}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
      if (res.data.data.res_list.length !== 0) {
        res.data.data.res_list.forEach((item) => {
          item.created_at = app.util.formatTime(new Date(item.created_at))
          switch (item.type) {
            case 3: item.typeName = "电路图";
              break;
            case 5: item.typeName = "维修手册";
              break;
          }
        })
        this.setData({
          balance: res.data.data.balance,
          exchangeList: res.data.data.res_list,
        })
      }
    });
    app.util.request('GET', `/v1/rrd-wx-app/partner/withdraw/record/${this.data.userId}?start=${this.data.withdrawList.length}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
      if (res.data.data.res_list.length !== 0) {
        res.data.data.res_list.forEach((item) => {
          item.created_at = app.util.formatTime(new Date(item.created_at))
          switch (item.type) {
            case 3: item.typeName = "电路图";
              break;
            case 5: item.typeName = "维修手册";
              break;
          }
        })
        this.setData({
          balance: res.data.data.balance,
          withdrawList: res.data.data.res_list,
        })
      }
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