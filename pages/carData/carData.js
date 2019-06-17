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
  },

  //打开modal
  openModal(e) {
    this.setData({
      showModal: true
    })
  },
  //关闭modal
  closeModal(e) {
    this.setData({
      showModal: false
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