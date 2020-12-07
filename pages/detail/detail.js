// pages/detail/detail.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    quantity:0,
    dishes: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        id: options.id,
      }),
      //根据id获取菜品
      this.getInfo()
  },
  getInfo() {
    var _this = this;
    var cart = wx.getStorageSync('cart') || [];//判断cart存不存在
    var exist = cart.find(function (ele) {  //find遍历cart数组
      return ele._id === _this.data.id;//购物车是否存在该菜品
    })
    if(exist){//存在，exist就是菜品数据
     this.setData({
       dishes:exist,
     })
     console.log('购物车获取数据');
    }else{//不存在，从数据库中获取数据
    db.collection('menus').doc(this.data.id).get().then(res => {
          this.setData({
            dishes: res.data,
          })
          console.log('数据库获取数据');
        });
    }
  },
  changeContent(e){
    var _this = this
    var changeDishes = this.data.dishes
    changeDishes.quantity = e.detail
    this.setData({
      dishes:changeDishes
    })
      //将该菜品添加或者更新到数组中
    var cart = wx.getStorageSync('cart') || [];//判断cart存不存在
    var exist = cart.find(function (ele) {  //find遍历cart数组
      return ele._id === _this.data.id;
    })
    if(exist){//购物车找到该菜品
      exist.quantity = this.data.dishes.quantity
    }else{//购物车没有找到该菜品,将该菜品添加到购物车(菜品数量已经设置为1)
      cart.push(this.data.dishes);
    }
    wx.setStorage({
      key: 'cart',
      data: cart,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          icon: "success",
          durantion: 2000
        })
      }
    })
   
  }
})