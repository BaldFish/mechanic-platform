// pages/read/read.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalogueTabs:true,
    catalogue: false,
    read:true,
    url:"",
    baseUrl:"",
    catalogueList:[],
    readList: [],
    jumpNum:0,
  },
  getReadData() {
    app.util.request('GET', `/v1/rrd-wx-app/car/doc/pages?manual_id=${app.data.manualId}&user_id=${app.data.userId}`, 'application/json', '', app.data.token, (res) => {
      this.setData({
        baseUrl: res.data.data.base_url,
        catalogueList:res.data.data.list,
        readList: res.data.data.pages,
        url: res.data.data.base_url + res.data.data.pages[this.data.jumpNum]
      })
    })
  },
  pageUp(e) {
    if (0 < this.data.jumpNum) {
      this.setData({
        jumpNum: this.data.jumpNum - 1,
      })
      this.setData({
        url: this.data.baseUrl + this.data.readList[this.data.jumpNum]
      })
    } else { 
      wx.showToast({
        title: '已经是第一页',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => { },
        fail: () => { },
        complete: () => { }
      })
    }
   },
  catalogue(e) {
    this.setData({
      catalogueTabs: false,
      read:false,
      catalogue:true
    })
  },
  pageDown(e) { 
    if (this.data.jumpNum < this.data.readList.length - 1) {
      this.setData({
        jumpNum: this.data.jumpNum +1,
      })
      this.setData({
        url: this.data.baseUrl + this.data.readList[this.data.jumpNum]
      })
    } else { 
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => { },
        fail: () => { },
        complete: () => { }
      })
    }
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
 * 目录点击事件
 */
  jumpMt(e) {
    let jumpNum = e.currentTarget.dataset.id.slice(5);
    this.setData({
      jumpNum: jumpNum,
      catalogue: false,
      catalogueTabs: true,
      read: true,
      url: this.data.baseUrl + this.data.readList[this.data.jumpNum]
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.data.userId = wx.getStorageSync('userId')
    app.data.token = wx.getStorageSync('token')
    this.getReadData()
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