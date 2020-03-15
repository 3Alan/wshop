const wx = require('../../lib/wx');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  async logout() {
    const logout = await wx.showModal({
      title: "提示",
      content: "确认退出吗？"
    });
    if (logout.confirm) {
      wx.removeStorageSync("user");
      wx.removeStorageSync("authorization");
      this.onLoad();
    }
  },

  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    });
  },
  goToOrderList() {
    wx.navigateTo({
      url: '/pages/orderList/orderList',
    });
  },
  goToMyCollection() {
    wx.navigateTo({
      url: '/pages/myCollection/myCollection',
    });
  },
  goToAddressList() {
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const username = wx.getStorageSync("user");
    const authorization = wx.getStorageSync("authorization");
    const isLogin = username && authorization;
    this.setData({
      username,
      isLogin
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
