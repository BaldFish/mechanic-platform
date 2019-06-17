// pages/search/search.js
const app = getApp();

let city = require('../../utils/allcity.js');
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    list: [],
    jumpNum: "index0",
    rightArr: [],
    listIndex: 0,
    moveDistance: 0,
  },
  /**
   * 数据重新渲染
   */
  resetRight(data) {
    if (data.length != 0) {
      let rightArr = [];
      for (let i in data) {
        rightArr.push(data[i].title.substr(0, 1));
      };
      this.setData({
        rightArr
      }, () => {
        this.queryMultipleNodes();
      })
    }
  },
  /**
   * 获取节点信息
   */
  queryMultipleNodes() {
    let self = this
    const query = wx.createSelectorQuery().in(this);
    query.selectAll('.list-title').boundingClientRect((res) => {
      res.forEach(function (rect) {
        rect.top // 节点的上边界坐标
      })
    }).exec((e) => {
      let arr = []
      e[0].forEach((rect) => {
        let num = 0
        if (rect.top !== 0) {
          num = rect.top - (self.data.config.search ? self.data.config.searchHeight : 0)
        }
        arr.push(num)
      })
      this.setData({
        topGroup: arr
      })
    })
  },
  /**
   * 右侧字母点击事件
   */
  jumpMt(e) {
    let jumpNum = e.currentTarget.dataset.id;
    this.setData({
      jumpNum
    });
  },
  /**
   * 列表点击事件
   */
  detailMt(e) {
    let detail = e.currentTarget.dataset.detail;
    let myEventOption = {
      bubbles: false, //事件是否冒泡
      composed: false, //事件是否可以穿越组件边界
      capturePhase: false //事件是否拥有捕获阶段
    } // 触发事件的选项
    this.triggerEvent('detail', detail, myEventOption)
  },
  getList() {
    wx.showLoading({
      title: '加载数据中...',
    })
    app.util.request('GET', `/v1/rrd-wx-app/car/list`, 'application/json', '', `${app.data.token}`, (res) => {
      this.setData({
        list: res.data.data
      })
      this.resetRight(this.data.list)
      wx.hideLoading()
    })
  },
  search(e) {
    if (app.data.token) {
      let data = e.detail.value || e.currentTarget.dataset.value || '';
      app.util.request('GET', `/v1/rrd-wx-app/car/brand/search?cond=${data}`, 'application/json', '', app.data.token, (res) => {
        console.log(res.data.data)
        //app.data.brand = res.data.data.brand

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
    this.getList();
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