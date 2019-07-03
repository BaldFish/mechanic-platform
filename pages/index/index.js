//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 6,
    userId: "",
    token: "",
    address: "",
    isBindPhone: false,
    searchValue: "",
    imgUrls: [{
      "id": "1",
      "updated_at": "2018-11-29T10:33:47+08:00",
      "name": "维修资料",
      "url": "/images/01.png",
      "type": 1
    },],
    news: [{
      "id": "1",
      "brand": "上海大众",
      "series": "维修手册",
      "year": "提供2016款",
      "type": 5,
      "first_menu": "第一章",
      "first_page": "1.gif",
      "total_page": 20,
      "user_id": "",
      "user_name": "郑师傅",
      "updated_at": "2019-05-18T08:57:12+08:00"
    }],
    hotBrandList: [{
      id: 1,
      url: "/images/dazhong.png",
      brand_name: "大众"
    },
    {
      id: 2,
      url: "/images/benchi.png",
      brand_name: "奔驰"
    },
    {
      id: 3,
      url: "/images/baoma.png",
      brand_name: "宝马"
    },
    {
      id: 4,
      url: "/images/aodi.png",
      brand_name: "奥迪"
    },
    {
      id: 5,
      url: "/images/fengtian.png",
      brand_name: "丰田"
    },
    {
      id: 6,
      url: "/images/bentian.png",
      brand_name: "本田"
    },
    {
      id: 7,
      url: "/images/fute.png",
      brand_name: "福特"
    },
    {
      id: 8,
      url: "/images/bieke.png",
      brand_name: "别克"
    },
    ],
    explainList: [
      "提供维修资料，成为平台合伙人",
      "获得永久收益权，",
      "轻松赚现金！！！"
    ],
    operationList: [
      "全程匿名，无需担忧隐私风险",
      "平台收取20%服务费，其余收益实时到账",
      "收益清晰透明，实时查询交易记录",
    ],
    noticeList: [
      {
        "name": "高师傅",
        "balance": "18"
      },
      {
        "name": "李师傅",
        "balance": "4.11"
      },
      {
        "name": "王师傅",
        "balance": "20.78"
      },
      {
        "name": "孙师傅",
        "balance": "4.11"
      },
    ],
    showModal: false, // 显示modal弹窗
    inputValue: ""
  },
  getBannerList() {
    app.util.request('GET', `/v1/rrd-wx-app/slider`, 'application/json', '', '', (res) => {
      this.setData({
        imgUrls: res.data.data
      })
    })
  },
  getNews() {
    app.util.request('GET', `/v1/rrd-wx-app/car/latest-update?limit=3`, 'application/json', '', '', (res) => {
      this.setData({
        news: res.data.data
      })
    })
  },
  getHotBrandList() {
    app.util.request('GET', `/v1/rrd-wx-app/car/popular-brands`, 'application/json', '', '', (res) => {
      this.setData({
        hotBrandList: res.data.data
      })
    })
  },
  getNoticeList() {
    app.util.request('GET', `/v1/rrd-wx-app/partner/latest-reward?limit=${this.data.limit}`, 'application/json', '', ``, (res) => {
      this.setData({
        noticeList: res.data.data
      })
    })
  },
  login() {
    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求
          app.util.request('POST', '/v1/rrd-wx-app/user/login', 'application/x-www-form-urlencoded', { code: res.code }, '', (res) => {
            let data = res.data.data;
            if (!data.is_bind_phone) {
              wx.hideTabBar({});
              this.setData({
                isBindPhone: true
              })
            } else {
              wx.setStorageSync("userId", data.session_info.user_id);
              wx.setStorageSync("token", data.session_info.token);
              wx.setStorageSync("address", data.session_info.address);
              app.data.userId = wx.getStorageSync("userId");
              app.data.token = wx.getStorageSync("token");
              app.data.address = wx.getStorageSync("address");
            }
          })
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            image: '',
            duration: 2000,
            mask: false,
            success: (result) => { },
            fail: () => { },
            complete: () => { }
          })
        }
      }
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
      showModal: false,
      inputValue: ""
    })
  },
  //获取modal中inout输入值
  getValue(e) {
    if (e.detail.value == 0){
      e.detail.value = ""
    }
    this.setData({
      inputValue: e.detail.value
    })
  },
  //加入合作者
  joinPartner(e) {
    if (e.currentTarget.dataset.value === ""){
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
    } else if (e.currentTarget.dataset.value.length < 11){
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
        phone: "+86" + this.data.inputValue
      }
      app.util.request('POST', `/v1/rrd-wx-app/partner`, 'application/x-www-form-urlencoded', data, `${app.data.token}`, (res) => {
        //关闭modal
        this.closeModal(e);
        wx.showToast({
          title: "提交成功，请稍候",
          icon: 'none',
          image: '',
          duration: 2000,
          mask: true,
          success: (result) => { },
          fail: () => { },
          complete: () => { }
        });
      })
    }
  },

  getPhoneNumber(e) {
    wx.login({
      success: (res) => {
        if (res.code) {
          let data = {
            code: res.code,
            iv: e.detail.iv,
            encrypted_data: e.detail.encryptedData
          }
          //发起网络请求
          app.util.request('POST', '/v1/rrd-wx-app/user/weixin/phone', 'application/x-www-form-urlencoded', data, '', (res) => {
            let data = res.data.data;
            wx.setStorageSync("userId", data.session_info.user_id);
            wx.setStorageSync("token", data.session_info.token);
            wx.setStorageSync("address", data.session_info.address);
            app.data.userId = wx.getStorageSync("userId");
            app.data.token = wx.getStorageSync("token");
            app.data.address = wx.getStorageSync("address");
            this.setData({
              isBindPhone: false
            });
            wx.showTabBar({});
          })
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            image: '',
            duration: 2000,
            mask: false,
            success: (result) => { },
            fail: () => { },
            complete: () => { }
          })
        }
      }
    })
  },
  search(e) {
    if (app.data.token) {
      let data = e.detail.value || e.currentTarget.dataset.value || '';
      app.util.request('GET', `/v1/rrd-wx-app/car/brand/search?cond=${data}`, 'application/json', '', app.data.token, (res) => {
        if (res.data.data.length) {
          app.data.seriesList = res.data.data
          wx.navigateTo({
            url: `/pages/carSeries/carSeries`
          })
        } else { 
          wx.navigateTo({
            url: `/pages/search/search`
          })
        }
      })
    } else {
      wx.showToast({
        title: '请登录后重试',
        icon: 'none',
        image: '',
        duration: 2000,
        mask: false,
        success: (result) => { },
        fail: () => { },
        complete: () => { }
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.data.userId = wx.getStorageSync('userId')
    app.data.token = wx.getStorageSync('token')
    this.getBannerList();
    this.login();
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
    this.getNews();
    this.getNoticeList();

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