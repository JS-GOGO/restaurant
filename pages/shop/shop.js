// pages/shop/shop.js
const db = wx.cloud.database()
const APP = getApp()
APP.configLoadOK = () => {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {},
    latitude: 0,
    longitude: 0,
    markers: [{

      latitude: 23.415483,
      longitude: 113.096764,
      title:'广东培正学院',
      iconPath:'/image/导航图标.png',
        height: 30,
        width: 30,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options);

    this.setData({
        latitude: options.latitude,
        longitude: options.longitude
      }),
    // 获取店铺信息
    this.getShopInfo()
  },
  getShopInfo() {
    wx.cloud.callFunction({
      name: 'getShopInfo'
    }).then(res => {
      // console.log(res.result.data[0]);

      this.setData({
        shopInfo: res.result.data[0]
      })

    })
  },
  guideNow: function(){
    var name = this.data.shopInfo.name
    var address = this.data.shopInfo.address
    var latitude = parseFloat(this.data.latitude)
    var longitude = parseFloat(this.data.longitude)
    console.log(latitude);
    console.log(longitude);
    
    
    wx.openLocation({
      name: name,
      address: address,
      latitude: latitude,
      longitude: longitude,
    })
  },
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.linkPhone
    })
  }

})