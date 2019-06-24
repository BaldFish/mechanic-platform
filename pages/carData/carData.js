// pages/carData/carData.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    brand: "",
    series: "",
    carData: [],
    showModal: false, // 显示modal弹窗
    userId: "",
    token: "",
    address: "",
    pointsBalance: "0",
    manual_id: "",
    seleted: "1",
    order_id: ""
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    let carData = app.data.carData
    carData.forEach((item) => {
      if (item.type === 5) {
        item.typeName="维修手册"
      } else if (item.type === 3) { 
        item.typeName = "电路图"
      }
    })
    this.setData({
      brand: app.data.brand,
      series: app.data.series,
      carData: carData
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
      showModal: true,
      manual_id: e.currentTarget.dataset.manual_id
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
  //去支付
  toPay(e){
    let data = {
      user_id: app.data.userId,
      points_amount: "",
      manual_id: this.data.manual_id
    }
    if (this.data.seleted == 2) {
      data.points_amount =""
    } else {
      data.points_amount = this.data.pointsBalance >= 500 ? 500 : this.data.pointsBalance
    }
    app.util.request('POST', `/v1/rrd-wx-app/order`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
      //关闭modal
      this.closeModal(e);
      if (res.data.code != "200"){
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
        if (!res.data.data) {
          wx.showToast({
            title: '支付成功',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: false,
            success: (result) => { },
            fail: () => { },
            complete: () => { }
          })
        } else {
          let order_id = res.data.data.raw.order_id
          //调起支付
          wx.requestPayment(
            {
              'timeStamp': res.data.data.prepay_info.timeStamp,
              'nonceStr': res.data.data.prepay_info.nonceStr,
              'package': res.data.data.prepay_info.package,
              'signType': res.data.data.prepay_info.signType,
              'paySign': res.data.data.prepay_info.paySign,
              'success': function (res) {
                console.log(res, "success")
              },
              'fail': function (res) {
                console.log(res, "fail")
                if (res.errMsg == 'requestPayment:fail cancel') {
                  //取消订单
                  let data = {
                    order_id: order_id
                  }
                  app.util.request('POST', `/v1/rrd-wx-app/order/cancel`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
                    console.log(res)
                  })
                }
              },
              'complete': function (res) {
                console.log(res, "complete")
              }
            })
        }
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