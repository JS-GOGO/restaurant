// pages/mycomment/mycomment.js
const MAX_LIMIT = 10
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinglunList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this._getListByCloudFn()
  },

  // _getListByCloudFn() {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   wx.cloud.callFunction({
  //     name: 'pinglun',
  //     data: {
  //       $url: 'getListByOpenid',
  //       start: this.data.pinglunList.length,
  //       count: MAX_LIMIT
  //     }
  //   }).then((res) => {
  //     console.log(res)
  //     this.setData({
  //       pinglunList: this.data.pinglunList.concat(res.result)
  //     })

  //     wx.hideLoading()
  //   })
  // },

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
    this._getListByCloudFn()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})