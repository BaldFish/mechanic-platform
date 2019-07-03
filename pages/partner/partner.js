// pages/partner/partner.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    explainList: [
      "提供维修资料，成为平台合伙人",
      "获得永久收益权，",
      "轻松赚现金！！！"
    ],
    operationList: [
      "全程匿名，无需担忧隐私风险；",
      "平台收取20%服务费，其余收益实时到账；",
      "收益清晰透明，实时查询交易记录；",
    ],
    focus: false,
    inputValue: '',
    userId: "",
    token: "",
  },
  getValue(e) {
    if (e.detail.value == 0) {
      e.detail.value = ""
    }
    this.setData({
      inputValue: e.detail.value
    })
  },
  joinPartner(e) {
    if (e.currentTarget.dataset.value === "") {
      wx.showToast({
        title: "请输入11位手机号",
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    } else if (e.currentTarget.dataset.value.length < 11) {
      wx.showToast({
        title: "请输入11位手机号",
        icon: 'none',
        image: '',
        duration: 2000,
        mask: true,
        success: (result) => {

        },
        fail: () => { },
        complete: () => { }
      });
    } else {
      let data = {
        user_id: app.data.userId,
        phone:"+86"+this.data.inputValue
      }
      app.util.request('POST', `/v1/rrd-wx-app/partner`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
        wx.showToast({
          title: "提交成功，请稍候",
          icon: 'none',
          image: '',
          duration: 2000,
          mask: true,
          success: (result)=>{},
          fail: ()=>{},
          complete: ()=>{}
        });
      })
    }
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    app.data.userId = wx.getStorageSync('userId')
    app.data.token = wx.getStorageSync('token')
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