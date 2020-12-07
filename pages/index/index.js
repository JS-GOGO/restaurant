const db = wx.cloud.database()
const WXAPI = require('/apifm-wxapi')
WXAPI.init('ab1661095f915d65312e6b0b39930c6f')

Page({
  data: {
    banners: [],
    title: '技术是发展的灵魂所在',
    latitude: 23.415394, //百度地图上的培正坐标
    longitude: 113.096764,
    nowLatitude: 0,
    nowLongitude: 0,
    shops: 0,
    shopInfo: 0,
    shopIsOpened: 0,
    distance:null,
  },
  onLoad: function (options) {
    this._getSwiper(),
      //  获得地图
      this.getMap();
  },
 
  login(e) {
    if (!e.detail.userInfo) {
      // 你点了取消授权
      return;
    }
    wx.login({
      success: function (res) {
        const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
        WXAPI.login_wx(code).then(function (res) {
          // 登录接口返回结果
          console.log(res)
        })
      }
    })
  },
  _getSwiper() {
    db.collection('swiper').get().then(res => {
      this.setData({
        banners: res.data
      })
      wx.stopPullDownRefresh()
    })
  },
  //  下拉刷新
  onPullDownRefresh() {
    this._getSwiper()
  },
  //  获取定位提示框
  //  地图
  getMap() {
    wx.showModal({
      title: '提示',
      content: '是否允许获取当前定位',
      success: (res) => {
        if (res.confirm) {
          this.getshopInfo() //获取当前位置
        } else if (res.cancel) {
          wx.showToast({
            title: "请开启定位功能",
            icon: 'none',
            durantion: 2000
          })
        }
      }
    })
  },

  //获取当前位置，本案例用来获取店铺位置
  getshopInfo() {
    wx.getLocation({
      type: 'wgs84', //wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: (res) => {
        console.log(res,'微信上获取当前位置的经纬度')
        this.setData({
          nowLatitude: res.latitude,
          nowLongitude: res.longitude,
        })
        // wx.showModal({
        //   title: '当前经纬度是位置是',
        //   content: res.latitude + '||' + res.longitude,
        //   showCancel: false
        // })
     
        this.mapQQAddress(res)
        this.selAddress() //计算距离

      },
      fail: (err) => {
        wx.showToast({
          title: "请打开GPS",
          icon: 'none',
          durantion: 2000
        })
      }
    })
  },
  mapQQAddress(e) { // 坐标查地址
    const location = e.latitude + ',' + e.longitude
 
    WXAPI.mapQQAddress(location, 1).then(res => {
     
      console.log('地址查看：', res)
        wx.showModal({
          title: '当前位置是',
          content: res.data.result.address,
          showCancel: false
        })
    }).catch(res =>{
      console.log(213);
      
    } )
  },
  selAddress() { // 计算两坐标距离
  
    const _this = this
    // 移动端没有执行api工厂
    WXAPI.mapDistance(_this.data.longitude, _this.data.latitude, _this.data.nowLongitude, _this.data.nowLatitude).then(res => {
     
      if (res.code == 0) {
        _this.setData({
          distance: res.data.toFixed(3)
        })
      
        wx.showModal({
          title: '获取定位成功',
          content: '距离:' + res.data.toFixed(3) + '公里',
          showCancel: false
        })
      }
    })


  },

})