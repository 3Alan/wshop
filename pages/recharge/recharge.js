const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rechargeAble: false
  },

  inputEvent(e) {
    const { value } = e.detail;
    const { key } = e.currentTarget.dataset;
    this.setData({
      [key]: value,
    });
    const { price, password } = this.data;
      this.setData({
        rechargeAble: !!(price && password),
      });
  },

  async recharge() {
    const { price, password } = this.data;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.recharge(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          price,
          password,
        },
      });
      if (Res.data.code === -1) {
        throw new errors.ValidateError("密码错误");
      }
      wx.hideLoading();
      wx.navigateBack();
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
      console.log(error);
    }
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
