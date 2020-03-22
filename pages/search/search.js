const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasHistory: false,
    hideTags: false,
  },

  async deleteHistory() {
    const isDelete = await wx.showModal({
      title: '提示',
      content: '清空历史记录?',
    });
    if(isDelete.confirm) {
      wx.showLoading({ title: "加载中..." });
      try {
        const Res = await wx.request({
          url: Api.deleteHistory(),
          header: app.generateRequestHeader(),
          method: "POST",
        });
        if (!(Res.statusCode === 200 && Res.data)) {
          throw new errors.ValidateError("删除失败");
        }
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
      this.setData({
        hasHistory: false,
      });
      await this.getHistory();
    }
  },
  hideTags() {
    this.setData({
      hideTags: true,
    });
  },
  goToSearchResult(e) {
    const searchValue = e.currentTarget.dataset.name;
    wx.redirectTo({
      url: `/pages/searchResult/searchResult?searchValue=${searchValue}`,
    });
  },

  async getHistory() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getHistory(),
        header: app.generateRequestHeader(),
        method: "GET",
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取数据失败");
      }
      const historySearch = Res.data.historySearch.map(({ content }) => content);
      const hotSearch = Res.data.hotSearch.map(({ content }) => content);
      this.setData({
        historySearch,
        hotSearch,
        hasHistory: historySearch.length > 0,
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

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    // 请求接口返回历史搜索和热门搜索
    await this.getHistory();
  },
})