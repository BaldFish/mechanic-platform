// pages/IntegralList/IntegralList.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    token: "",
    address: "",
    page: 1,
    limit: 10,
    balance: 0,
    integralList: [],
    lastResCount: 0,
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.data.token = wx.getStorageSync('token')
    this.data.address = wx.getStorageSync('address');
    //获取积分明细和余额
    app.util.request('GET', `/v1/rrd-wx-app/user/points/details/${this.data.address}?page=${this.data.page}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
      if (res.data.data.res_list !== []) {
        res.data.data.res_list.forEach((item) => {
          item.updated_at = app.util.formatTime(new Date(item.updated_at))
        })
      }
      this.setData({
        balance: res.data.data.balance,
        integralList: res.data.data.res_list,
        lastResCount: res.data.data.res_count
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
    if (this.data.lastResCount < this.data.limit) {
      app.util.request('GET', `/v1/rrd-wx-app/user/points/details/${this.data.address}?page=${this.data.page}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
        if (res.data.data.res_list !== []) {  
          this.data.integralList.splice(this.data.integralList.length - this.data.lastResCount, this.data.lastResCount)
          res.data.data.res_list.forEach((item) => {
            item.updated_at = app.util.formatTime(new Date(item.updated_at))
          })
        }
        this.setData({
          balance: res.data.data.balance,
          integralList: this.data.integralList.concat(res.data.data.res_list),
          lastResCount: res.data.data.res_count
        })

      })
    } else {
      app.util.request('GET', `/v1/rrd-wx-app/user/points/details/${this.data.address}?page=${++this.data.page}&limit=${this.data.limit}`, 'application/json', '', `${this.data.token}`, (res) => {
        if (res.data.data.res_list !== []) {
          res.data.data.res_list.forEach((item) => {
            item.updated_at = app.util.formatTime(new Date(item.updated_at))
          })
        }
        this.setData({
          balance: res.data.data.balance,
          integralList: this.data.integralList.concat(res.data.data.res_list),
          lastResCount: res.data.data.res_count
        })
      })
    }
  },

	/**
	 * 用户点击右上角分享
	 */
  onShareAppMessage: function () {

  }
})