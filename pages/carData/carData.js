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
    seleted: "1"
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
    this.data.userId = wx.getStorageSync('userId')
    this.data.token = wx.getStorageSync('token')
    this.data.address = wx.getStorageSync('address')
    //获取用户积分余额
    this.getPointsBalance()
  },

  //打开modal
  openModal(e) {
    this.setData({
      showModal: true,
      manual_id: e.currentTarget.dataset.manual_id
    })
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
    app.util.request('GET', `/v1/rrd-wx-app/user/points/balance/${this.data.address}`, 'application/json', '', `${this.data.token}`, (res) => {
      this.setData({
        pointsBalance: res.data.data.balance
      })
    })
  },
  //去支付
  toPay(e){
    let data = {
      user_id: this.data.userId,
      points_amount: "",
      manual_id: this.data.manual_id
    }
    if (this.data.seleted == 2) {
      data.points_amount =""
    } else {
      data.points_amount = this.data.pointsBalance >= 500 ? 500 : this.data.pointsBalance
    }
    app.util.request('POST', `/v1/rrd-wx-app/order`, 'application/x-www-form-urlencoded', data, `${this.data.token}`, (res) => {
      //关闭modal
      this.closeModal(e);
      if (!res.data.data){
        console.log("积分支付成功！")
      } else {
        //调起支付
        wx.requestPayment(
          {
            'timeStamp': res.data.data.prepay_info.timeStamp,
            'nonceStr': res.data.data.prepay_info.nonceStr,
            'package': res.data.data.prepay_info.package,
            'signType': res.data.data.prepay_info.signType,
            'paySign': res.data.data.prepay_info.paySign,
            'success': function (res) {
              console.log(res)
            },
            'fail': function (res) { },
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