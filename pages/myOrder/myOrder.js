
Page({
  data: {
    table: {},
    tableLength: null,
    totalPrice:0,
    name: '1号',//桌号
    peoples: 2,//用餐人数
    pay:false,// 支付情况
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  },

  onLoad: function () {
    var that = this
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('cart') || [];
    var table ={}
   
    
    if(arr.length > 0){
      // 这里应该扫码获取桌号和人数
      table.name = this.data.name,
      table.peoples = this.data.peoples,
      table.pat = this.data.pay,
      table.cart = arr
       this.setData({
        table:table,
        tableLength: table.cart.length
    })
    wx.getStorage({
      key:'totalPrice',
      success(res){
        that.setData({
          totalPrice:res.data
        })
      }
    })
    }

   
    console.log(this.data.orderlist);

  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('cart') || [];

    this.setData({
      orderlist: arr,
      listLength: arr.length
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // 跳转支付页面
  gotoPay(){
    wx.navigateTo({
      url:'/pages/pay/pay'
    })
  },
  
})
