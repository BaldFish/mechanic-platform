// pages/read/read.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalogueTabs: true,
    catalogue: false,
    read: true,
    url: "",
    baseUrl: "",
    catalogueList: [],
    readList: [],
    jumpNum: 0,
    touch: {
      distance: 0,
      scale: 1,
      baseWidth: null,
      baseHeight: null,
      scaleWidth: null,
      scaleHeight: null
    }
  },
  touchstartCallback: function (e) {
    // 单手指缩放开始，也不做任何处理 if(e.touches.length == 1) return console.log('双手指触发开始')
    // 注意touchstartCallback 真正代码的开始 // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug // 当两根手指放上去的时候，就将distance 初始化。 let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      'touch.distance': distance,
    })
  },
  touchmoveCallback: function (e) {
    let touch = this.data.touch
    // 单手指缩放我们不做任何操作
    if (e.touches.length == 1) return console.log('双手指运动')
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    // 新的 ditance 
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    let distanceDiff = distance - touch.distance;
    let newScale = touch.scale + 0.005 * distanceDiff
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是 
    if (newScale >= 2) {
      newScale = 2
    }
    if (newScale <= 0.5) {
      newScale = 0.5
    }
    let scaleWidth = newScale * touch.baseWidth
    let scaleHeight = newScale * touch.baseHeight
    // 赋值 新的 => 旧的 
    this.setData({
      'touch.distance': distance,
      'touch.scale': newScale,
      'touch.scaleWidth': scaleWidth,
      'touch.scaleHeight': scaleHeight,
      'touch.diff': distanceDiff
    })
  },
  bindload: function (e) {
    // bindload 这个api是<image>组件的api类似<img>的onload属性 
    this.setData({
      'touch.baseWidth': e.detail.width,
      'touch.baseHeight': e.detail.height,
      'touch.scaleWidth': e.detail.width,
      'touch.scaleHeight': e.detail.height
    })
  },
  getReadData() {
    app.util.request('GET', `/v1/rrd-wx-app/car/doc/pages?manual_id=${app.data.manualId}&user_id=${app.data.userId}`, 'application/json', '', app.data.token, (res) => {
      let jumpNum = this.data.jumpNum
      this.setData({
        baseUrl: res.data.data.base_url,
        catalogueList: res.data.data.list,
        readList: res.data.data.pages,
        url: res.data.data.base_url + res.data.data.pages[jumpNum]
      })
    })
  },
  pageUp(e) {
    if (0 < this.data.jumpNum) {
      let jumpNum = this.data.jumpNum - 1
      this.setData({
        jumpNum: jumpNum,
        url: this.data.baseUrl + this.data.readList[jumpNum]
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
      read: false,
      catalogue: true
    })
  },
  pageDown(e) {
    if (this.data.jumpNum < this.data.readList.length - 1) {
      let jumpNum = this.data.jumpNum + 1
      this.setData({
        jumpNum: jumpNum,
        url: this.data.baseUrl + this.data.readList[jumpNum]
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
    let jumpNum = Number(e.currentTarget.dataset.id.slice(5));
    this.setData({
      jumpNum: jumpNum,
      catalogue: false,
      catalogueTabs: true,
      read: true,
      url: this.data.baseUrl + this.data.readList[jumpNum]
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