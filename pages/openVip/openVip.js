// pages/openVip/openVip.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    open: "false",
    showModal: false, // 显示modal弹窗
    userId: "",
    token: "",
    address: "",
    pointsBalance: "0",
    seleted: "1",
    order_id: ""
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.setData({
      open: options.open
    })
    app.data.userId = wx.getStorageSync('userId')
    app.data.token = wx.getStorageSync('token')
    app.data.address = wx.getStorageSync('address')
    //获取用户积分余额
    this.getPointsBalance()
  },

  //打开modal
  openModal(e) {
    this.setData({
      showModal: true
    })
    //获取用户积分余额
    this.getPointsBalance()
  },
  //关闭modal
  closeModal(e) {
    this.setData({
      showModal: false
    })
  },
  //radio选择
  radioChange: function (e) {
    let value = e.detail.value;
    this.setData({
      seleted: value
    })
  },
  //获取用户积分余额
  getPointsBalance() {
    app.util.request('GET', `/v1/rrd-wx-app/user/points/balance/${app.data.address}`, 'application/json', '', `${app.data.token}`, (res) => {
      this.setData({
        pointsBalance: res.data.data.balance
      })
    })
  },
  //去支付--开通vip
  toPay(e) {
    let data = {
      user_id: app.data.userId,
      points_amount: "",
    }
    if (this.data.seleted == 2) {
      data.points_amount = ""
    } else {
      data.points_amount = this.data.pointsBalance >= 1000 ? 1000 : this.data.pointsBalance
    }
    app.util.request('POST', `/v1/rrd-wx-app/vip/open`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
      //关闭modal
      this.closeModal(e)
      if (res.data.code != "200") {
        wx.showToast({
          title: '支付失败',
          icon: 'none',
          image: '',
          duration: 2000,
          mask: false,
          success: (result) => { },
          fail: () => { },
          complete: () => { }
        })
      } else {
        //调起支付
        let order_id = res.data.data.raw.order_id
        wx.requestPayment({
          'timeStamp': res.data.data.prepay_info.timeStamp,
          'nonceStr': res.data.data.prepay_info.nonceStr,
          'package': res.data.data.prepay_info.package,
          'signType': res.data.data.prepay_info.signType,
          'paySign': res.data.data.prepay_info.paySign,
          'success': function (res) { },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              //取消开通vip
              let data = {
                order_id: order_id
              }
              app.util.request('POST', `/v1/rrd-wx-app/vip/open/cancel`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
                // wx.showToast({
                //   title: '订单已取消',
                //   icon: 'none',
                //   image: '',
                //   duration: 2000,
                //   mask: false,
                //   success: (result) => { },
                //   fail: () => { },
                //   complete: () => { }
                // })
              })
            }
          },
          'complete': function (res) { }
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