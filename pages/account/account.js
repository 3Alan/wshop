const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRecharge: false,
  },

  goToRecharge() {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    });
  },

  async getUserAccount() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.checkUserAccount(),
        header: app.generateRequestHeader(),
        method: "GET",
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取信息失败");
      }
      const balance = Res.data.balance || 0;
      let account = balance.toString().split('').reverse();
    
      let result = '';
      for (let i = 0; i < account.length; i++) {
        result += account[i] + ((i+1) % 3 === 0 && (i+1) !== account.length  ? ',' : '');
      }
      this.setData({
        account: result.split('').reverse().join(''),
      });
      wx.hideLoading();
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

  async onShow() {
    await this.getUserAccount();
  }
})