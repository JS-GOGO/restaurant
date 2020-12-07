const db = wx.cloud.database()


Page({
  data: {
    menus: [], //排序的菜品
    activeKey: 0, //默认选择的菜品区
    sortMenusCont: [], //排序每个菜品区的数量
    left_sort: [], // 左边排序的标签栏
    left_sortEng: [],//左边排序的标签栏英文
    quantity: 0,
    scrollTop: -1 ,//scroll-view的滚动高度，先设置为-1才有效
    scrollInto:'',//点击滑动
    sortTops:[],//每个区顶部高度
    totalNum:0,//购物车总数
    totalPrice:0,//购物车总价
    storageCart:[],//本地缓存购物车菜品
  },

  onLoad: function (options) {
    // 创建一个菜品
    // this._buildMenus();
    // 获取菜单 
this._getMenus();
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    // 获取本地缓存数据 渲染页面
       wx.getStorage({
      key:'cart',
      success(res){
        that.setData({
          storageCart:res.data
        })
      }
    }),
    wx.getStorage({
      key:'totalPrice',
      success(res){
        that.setData({
          totalPrice:res.data
        })
      }
    }),
    wx.getStorage({
      key: 'totalNum',
      success(res){
        that.setData({
          totalNum:res.data
        })
      }
    })
  },
  // 添加一个菜品数据到数据库
  _buildMenus() {
    db.collection('menus').add({
      data: {
        name: '苹果汁3',
        sort: '饮料区',
        sortEng: 'yinliaoqu',
        price: 10,
        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=110172327,4003804615&fm=26&gp=0.jpg',
        quantity: '0',
        comment: {
          text: '测试评价，非常好吃',
          image: ['https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3064125582,1517226906&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739263779,2644526279&fm=26&gp=0.jpg']
        },
        introduction: '测试介绍，这道菜非常有名',
        sales: 1
      }
    }).then(res => {
      console.log('添菜成功');
    })
  },

  _getMenus() {
    wx.cloud.callFunction({
      name: 'getMenus'
    }).then(res => {
      console.log('云数据库menus集合', res.result.data);
      // 获取右边标签栏口味
      let left = [];
      let leftEng = [];
      for (let k of res.result.data) {
        // 获得口味区
        left.push(k.sort)
        leftEng.push(k.sortEng)
        left = [...new Set(left)] //去重
        leftEng = [...new Set(leftEng)] //去重
      }
      // 将分类菜品排序
      let sortMenus = []
      // 记录每个分类区菜品的数量
      let sortMenusCont = [];
      for (let k of left) {
        let content = 0;
        for (let y of res.result.data) {
          if (k == y.sort) {
            sortMenus.push(y)
            content++
          }
        }
        sortMenusCont.push(content)
      }

      this.setData({
        menus: sortMenus,
        sortMenusCont: sortMenusCont,
        left_sort: left,
        left_sortEng:leftEng
      })
    })

  },

  handleScroll(e) {
    

    // console.log(e.detail.scrollTop);
    
  },
  onChange(e) {
 let go = this.data.left_sortEng[e.detail]
 
 this.setData({
  scrollInto:go
})
 
  },
  // 数量加一
  addCart1(e) {
    const index = e.currentTarget.dataset.idx
    const item = this.data.menus[index]

    var that = this;
    var cart = wx.getStorageSync('cart') || [];//判断cart存不存在
    var exist = cart.find(function (ele) {  //find遍历cart数组
      return ele._id === item._id;
    })
    if (exist){
      exist.quantity = parseInt(exist.quantity) + 1;//如果加入购物车的商品存在就增加数量  
    }else{
      item.quantity =1
      cart.push(item);
    }
    wx.setStorage({
      key: 'cart',
      data: cart,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          title: "加入购物车成功",
          icon: "success",
          durantion: 2000
        })
      }
    })
    wx.getStorage({
      key:'cart',
      success(res){
        that.setData({
          storageCart:res.data
        })
      }
    })
    
    //购物车中有多少商品
    var total = 0;
    // 总价
    var totalPrice = 0;
    cart.find(function (ele) {      
      total += parseInt(ele.quantity);
      totalPrice +=parseInt(ele.quantity)*parseInt(ele.price)
    })
    this.setData({ 
      totalNum: total,
      totalPrice: totalPrice
    });
    wx.setStorage({
      key: 'totalPrice',
      data: totalPrice,
    }),
    wx.setStorage({
      key: 'totalNum',
      data: total,
    })
  },

   // 数量减一
   lessCart1(e) {
    const index = e.currentTarget.dataset.idx
    const item = this.data.menus[index]

    var that = this;
    var cart = wx.getStorageSync('cart') || [];//判断cart存不存在
 
    var exist = cart.find(function (ele) {  //find遍历cart数组
      return ele._id === item._id;
    })
    
    if (exist.quantity > 0){
      exist.quantity = parseInt(exist.quantity)-1;//如果减少购物车的商品存在就减一
    }else{
      wx.showToast({
        title: "请先添加菜品",
        icon:'none',
        durantion: 2000
      })
    }
    wx.setStorage({
      key: 'cart',
      data: cart,
    })
    
    wx.getStorage({
      key:'cart',
      success(res){
        that.setData({
          storageCart:res.data
        })
      }
    })
    
   //购物车中有多少商品
   var total = 0;
   // 总价
   var totalPrice = 0;
   cart.find(function (ele) {      
     total += parseInt(ele.quantity);
     totalPrice +=parseInt(ele.quantity)*parseInt(ele.price)
   })
   this.setData({ 
     totalNum: total,
     totalPrice: totalPrice
   });
    wx.setStorage({
      key: 'totalPrice',
      data: totalPrice,
    }),
    wx.setStorage({
      key: 'totalNum',
      data: total,
    })
  },
  
  gotoDetail(){

  },
  //跳转到下单页面
  gotoOrder(){
    wx.navigateTo({
      url:'/pages/myOrder/myOrder'
    })
  },
  // 阻断navigator冒泡事件
  funNull(){

  }
})