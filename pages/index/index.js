//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ["/images/01.png"],
    news: "提供2016款上海上海大众大海大众大海大众大动款维修手维修手",
    brandList: [{
      id: 1,
      img: "/images/dazhong.png",
      name: "大众"
    },
    {
      id: 2,
      img: "/images/benchi.png",
      name: "奔驰"
    },
    {
      id: 3,
      img: "/images/baoma.png",
      name: "宝马"
    },
    {
      id: 4,
      img: "/images/aodi.png",
      name: "奥迪"
    },
    {
      id: 5,
      img: "/images/fengtian.png",
      name: "丰田"
    },
    {
      id: 6,
      img: "/images/bentian.png",
      name: "本田"
    },
    {
      id: 7,
      img: "/images/fute.png",
      name: "福特"
    },
    {
      id: 8,
      img: "/images/bieke.png",
      name: "别克"
    },
    ],
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
    noticeList: [
      "王师傅  已累积赚取10340元",
      "李师傅 已累积赚取280042元",
      "高师傅 已累积赚取3843元"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '18801384334',
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