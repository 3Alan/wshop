const wx = require('../../lib/wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historySearch: ['全城7', 'cp3', '欧文',],
    hotSearch: ['CNY', '黑天使', '口红', '羽绒服', 'Force', '卫衣', 'Supreme'],
    hasHistory: true,
    hideTags: false,
  },

  async deleteHistory() {
    const isDelete = await wx.showModal({
      title: '提示',
      content: '清空历史记录?',
    });
    if(isDelete.confirm) {
      // 请求删除历史记录的接口，删除成功的话，清空历史记录
      this.setData({
        hasHistory: false,
      });
    }
  },
  hideTags() {
    this.setData({
      hideTags: true,
    });
  },
  goToSearchResult(e) {
    const name = e.currentTarget.dataset.name;
    wx.redirectTo({
      url: `/pages/searchResult/searchResult?name=${name}`,
    });
    // 根据name去搜索对应的商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求接口返回历史搜索和热门搜索
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