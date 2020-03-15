const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    } else {
      const { goodDetail, size } = this.data;
      wx.navigateTo({
        url: `/pages/submitOrder/submitOrder?goodDetail=${JSON.stringify(goodDetail)}&size=${size}`,
      });
    }
  },

  closeSizeBox() {
    this.setData({
      showSizeBox: false
    });
  },

  showSizeBox() {
    this.setData({
      showSizeBox: true
    });
  },

  chooseSize(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      currentSizeIndex: index,
      size: this.data.goodSizeList[index]
    });
  },

  async onLoad(options) {
    const goodId = options.id;
    this.data.goodId = goodId;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getGoodDetail(goodId),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取商品信息失败");
      }
      wx.hideLoading();

      const {
        name: goodName,
        price: goodPrice,
        goodImgList: banner,
        goodSizeList,
      } = Res.data.goodDetail;
      this.data.goodDetail = Res.data.goodDetail;
      this.setData({
        goodName,
        goodPrice,
        banner,
        goodSizeList
      });
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
      console.log(error);
    }
  }
});
