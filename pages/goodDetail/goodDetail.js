// pages/goodDetail/goodDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/10900ec8-c7a3-42d6-8256-02a74fae5970/kyrie-6-ep-%E7%94%B7%E5%AD%90%E7%AF%AE%E7%90%83%E9%9E%8B-NxC374.jpg"
      },
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/sajfuxynsopjnmfvkoo7/air-max-720-horizon-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-NZKsWx.jpg"
      },
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/3d8a6abb-cdc3-4465-9944-03b8f3abeec4/air-zoom-unvrs-%E7%94%B7-%E5%A5%B3%E7%AF%AE%E7%90%83%E9%9E%8B-DHjqTK.jpg"
      }
    ],
    sizeList: [21, 22, 25, 16, 41, 42,21, 22, 25, 16, 41, 42,21, 22, 25, 16, 41, 42,21, 22, 25, 16, 41, 42],
    showSizeBox: false
  },

  purchase() {
    if (!this.data.size) {
      wx.showModal({
        title: "提示",
        content: "请先选择合适的尺码",
        showCancel: false
      });
      this.setData({
        showSizeBox: true
      });
    }
  },

  closeSizeBox() {
    this.setData({
      showSizeBox: false,
    });
  },

  showSizeBox() {
    this.setData({
      showSizeBox: true,
    });
  },

  chooseSize(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      currentSizeIndex: index,
      size: this.data.sizeList[index],
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
