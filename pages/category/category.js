const wx = require('../../lib/wx');
const Api = require('../../utils/api');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cataItems: [
      {
        name: '球鞋',
        type: 'shoes'
      },
      {
        name: '休闲',
        type: 'leisure'
      },
      {
        name: '袜子',
        type: 'socks'
      },
      {
        name: '男子',
        type: 'male'
      },
      {
        name: '女子',
        type: 'female'
      },
      {
        name: '儿童',
        type: 'kids'
      },
    ],
    currentIndex: 0,
  },
  switchType(e) {
    const currentIndex = e.currentTarget.dataset.index;
    const currentItem = e.currentTarget.id;
    this.setData({
      currentIndex,
      currentItem,
    });
    // 这里请求接口：通过name查询该分类下的所有商品信息
    this.getGoodList(currentItem);
  },

  goodDetail (e) {
    const goodId = e.currentTarget.dataset.id;
    // 通过id跳转到对应的商品详情页面
    wx.navigateTo({url: `/pages/goodDetail/goodDetail?id=${goodId}`});
  },

  async getGoodList(type) {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getGoodList(type),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取商品列表失败");
      }
      console.log(Res);
      
      wx.hideLoading();
      const { goodList } = Res.data;
      this.setData({
        goodList,
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

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.getGoodList('shoes');
  },

  async onShow() {
    const type = app.globalData.categoryType;
    const index = this.data.cataItems.findIndex((item) => item.type === type);
    
    if (type) {
      await this.getGoodList(type);
      this.setData({
        currentItem: type,
        currentIndex: index,
      });
      app.globalData.categoryType = '';
    }
  }
})