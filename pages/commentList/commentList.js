const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'all',
  },

  toggleComment(e) {
    const { key } = e.currentTarget.dataset;
    const { copyGoodCommentList, goodComment, badComment } = this.data;
    this.setData({
      activeTab: key,
    });
    if(key === 'all') {
      this.setData({
        goodCommentList: copyGoodCommentList,
      });
    }else if(key === 'good') {
      this.setData({
        goodCommentList: goodComment,
      });
    }
    if(key === 'bad') {
      this.setData({
        goodCommentList: badComment,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { goodId } = options;
    this.data.goodId = goodId;
    await this.getGoodComment();
  },

  async getGoodComment() {
    const { goodId } = this.data;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getGoodComment(goodId),
        header: app.generateRequestHeader(),
        method: "GET",
        data: {
          goodId
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取失败");
      }
      wx.hideLoading();
      const { goodCommentList } = Res.data;
      const goodComment = goodCommentList.filter(({ comment_type }) => comment_type === 1);
      const badComment = goodCommentList.filter(({ comment_type }) => comment_type === 0);
      const copyGoodCommentList = goodCommentList.slice(0);
      this.data.goodComment = goodComment;
      this.data.badComment = badComment;
      this.data.copyGoodCommentList = copyGoodCommentList;
      this.setData({
        goodCommentList,
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