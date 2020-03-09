const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sizeList: [
      21,
      22,
      25,
      16,
      41,
      42,
      21,
      22,
      25,
      16,
      41,
      42,
      21,
      22,
      25,
      16,
      41,
      42,
      21,
      22,
      25,
      16,
      41,
      42
    ],
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
      size: this.data.sizeList[index]
    });
  },

  async onLoad(options) {
    // const goodId = "1000";
    const goodId = options.id;
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
      if (Res.data.code === "00004") {
        const needLogin = await wx.showModal({
          title: "提示",
          content: "您需要登录后再进行操作",
          showCancel: false
        });
        if (needLogin.confirm) {
          wx.redirectTo({
            url: "/pages/login/login?redirectToUrl=/pages/goodDetail/goodDetail"
          });
        }
        return ;
      }

      const {
        name: goodName,
        price: goodPrice,
        goodImgs: banner
      } = Res.data.goodDetail;
      this.setData({
        goodName,
        goodPrice,
        banner
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
