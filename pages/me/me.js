var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    avataUrl:''
  },

  getuserinfo: function (e) {
    // console.log(e)
    this.setData({
      username: e.detail.userInfo.nickName,
      avataUrl: e.detail.userInfo.avataUrl
    })
    wx.setStorageSync('userInfo', e.detail.userInfo)
  },

  check: function (e) {
 // 弹出框获取用户数据
//  wx.getUserInfo({
//   success:function(res){
//     this.setData({
//       userInfo = res.userInfo,
//       nickName = userInfo.nickName,
//        avatarUrl = userInfo.avatarUrl
//     })
//   }
// });

    // if (this.data.username) {
    
      wx.navigateTo({
        url: '../../pages/message/message'
      });
    },
  //   return
      
  // },

  dingdan: function(){
    wx.navigateTo({
      url: '../../pages/myOrder/myOrder'
    });
  },
  kefu:function(){
      wx.makePhoneCall({
        phoneNumber: '13356546338'
      })
  },
  pinglun: function () {
    wx.navigateTo({
      url: '../../pages/myComment/myComment'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //console.log("options", options)
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
    var that = this;
    var username = app.globalData.username;
    this.setData({
      username: username
    })
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