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
    operationList: [
      "流程简单，只需整理成册快递到付;",
      "无需考虑隐私风险，全程匿名交易；",
      "上传审核成功后，平台全面托管促交易；",
      "平台收取20% 服务费，其余收益实时到账；",
      "账目公开透明，实时查询交易记录；",
      "轻松提现，平台有保障；"
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
  onLoad: function(options) {

  },
  phoneCall() {
    wx.makePhoneCall({
      phoneNumber: '18801384334',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})