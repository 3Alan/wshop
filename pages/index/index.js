//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    banner: [
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/10900ec8-c7a3-42d6-8256-02a74fae5970/kyrie-6-ep-%E7%94%B7%E5%AD%90%E7%AF%AE%E7%90%83%E9%9E%8B-NxC374.jpg",
        id: 1
      },
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/sajfuxynsopjnmfvkoo7/air-max-720-horizon-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-NZKsWx.jpg",
        id: 2
      },
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/3d8a6abb-cdc3-4465-9944-03b8f3abeec4/air-zoom-unvrs-%E7%94%B7-%E5%A5%B3%E7%AF%AE%E7%90%83%E9%9E%8B-DHjqTK.jpg",
        id: 3
      }
    ],
    recommendList: {
      categoryName: '理想鞋款',
      items: [
        {
          image_url: 'https://c.static-nike.com/a/images/f_auto/dpr_2.0/h_500,c_limit/d6w1bv7xjnqsd14wfyzp/nike-.jpg',
          type: '休闲'
        },
        {
          image_url: 'https://c.static-nike.com/a/images/f_auto/dpr_2.0/h_500,c_limit/gdrmknak9s7znat42sw6/nike-.jpg',
          type: '跑步'
        },
        {
          image_url: 'https://c.static-nike.com/a/images/f_auto/dpr_2.0/h_500,c_limit/soikcb1qgpyytea4vzic/nike-.jpg',
          type: '篮球'
        },
      ]
    }
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },

  goToDetail({currentTarget: {dataset: { id }}}) {
    wx.navigateTo({url: `/pages/goodsDetail/goodsDetail?id=${id}`});
    console.log(id);
  },

  onLoad: function() {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
});
