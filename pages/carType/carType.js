// pages/carType/carType.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    brand: "",
    series:"",
    carYears: [],
  },
  turnDetails(e) { 
    let data = e.currentTarget.dataset.value;
    app.util.request('GET', `/v1/rrd-wx-app/car/doc/type?brand=${app.data.brand}&series=${app.data.series}&year=${data}&user_id=${app.data.userId}`, 'application/json', '', app.data.token, (res) => {
      if (res.data.data.length) {
        app.data.carData = res.data.data
        wx.navigateTo({
          url: `/pages/carData/carData`
        })
      } else {
        wx.showToast({
          title: '没有相关数据',
          icon: 'none',
          image: '',
          duration: 2000,
          mask: false,
          success: (result) => { },
          fail: () => { },
          complete: () => { }
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
    this.setData({
      brand: app.data.brand,
      series: app.data.series,
      carYears: app.data.carYears
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