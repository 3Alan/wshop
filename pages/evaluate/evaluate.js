const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toggleComment(e) {
    const { key } = e.currentTarget.dataset;
    if(key === 'good') {
      this.setData({
        goodComment: !this.data.goodComment,
        badComment: false,
      });
    } else {
      this.setData({
        goodComment: false,
        badComment: !this.data.badComment,
      })
    }
  },

  async evaluate() {
    const { comment, orderId, goodComment, badComment } = this.data;
    const commentType = goodComment ? 1 : 0;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.orderEvaluate(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          comment,
          orderId,
          commentType,
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("提交失败");
      }
      wx.hideLoading();

      wx.redirectTo({
        url: '/pages/orderList/orderList',
      });
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
    }
  },

  saveComment(e) {
    const comment = e.detail.value;
    this.data.comment = comment;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { orderId, goodDetail } = options;
    console.log(options);
    
    this.setData({
      orderId,
      goodDetail: JSON.parse(goodDetail),
    });
  },
})