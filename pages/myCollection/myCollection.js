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

  startTouch(e) {
    this.setData({
      startX: e.touches[0].clientX,
    });
  },

  move(e) {
    let collectionList = this.data.collectionList.splice(0);
    const currentCard = e.currentTarget.dataset.index;
    const clientX = e.touches[0].clientX;
    const moveRange = this.data.startX - clientX > 100 ? 100 : this.data.startX - clientX;
    collectionList[currentCard].leftStyle = `left: -${moveRange}rpx`;
    this.setData({
      collectionList,
    });
  },

  touched(e) {
    let collectionList = this.data.collectionList.splice(0);
    const currentCard = e.currentTarget.dataset.index;
    const clientX = e.changedTouches[0].clientX;
    const moveRange = this.data.startX - clientX;
    if (moveRange < 100) {
      collectionList[currentCard].leftStyle = 'left: 0';
    }
    this.setData({
      collectionList,
    });
  },

  async cancelCollect(e) {
    const { id } = e.currentTarget.dataset;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.cancelCollect(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          id,
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取失败");
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
    await this.getCollectionList();
  },

  goToGoodDetail(e) {
    const goodId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/goodDetail/goodDetail?id=${goodId}`,
    });
  },

  async getCollectionList() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getCollectionList(),
        header: app.generateRequestHeader(),
        method: "GET",
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取失败");
      }
      const { collectionList } = Res.data;
      this.setData({
        collectionList,
      });
      wx.hideLoading();
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

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.getCollectionList();
  },
})