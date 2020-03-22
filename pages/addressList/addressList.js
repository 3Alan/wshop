const wx = require("../../lib/wx");
const Api = require("../../utils/api");

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  goToAddAddress() {
    wx.navigateTo({
      url: "/pages/addAddress/addAddress"
    });
  },

  async deleteAddress(e) {
    const { id } = e.currentTarget.dataset;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.deleteAddress(id),
        header: app.generateRequestHeader(),
        method: "GET",
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("删除失败");
      }
      wx.hideLoading();

      const addressList = Res.data.addressList;
      this.setData({
        addressList
      });
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.message,
        icon: "none",
        duration: 2000
      });
      console.log(error);
    }
  },

  async getAddressList() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getAddressList(),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取地址信息失败");
      }
      wx.hideLoading();
      if (Res.data.code === "00004") {
        const needLogin = await wx.showModal({
          title: "提示",
          content: "您需要登录后再进行操作",
          showCancel: false
        });
        if (needLogin.confirm) {
          wx.redirectTo({
            url:
              "/pages/login/login?redirectToUrl=/pages/addressList/addressList"
          });
        }
        return;
      }

      const addressList = Res.data.addressList;
      this.setData({
        addressList
      });
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.message,
        icon: "none",
        duration: 2000
      });
      console.log(error);
    }
  },

  async setDefaultAddress(e) {
    const { id } = e.currentTarget.dataset;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.setDefaultAddress(id),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("设置失败");
      }
      wx.hideLoading();
      await this.getAddressList();
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
  async onLoad() {
    // await this.getAddressList();
  },

  async onShow() {
    await this.getAddressList();
  }
});
