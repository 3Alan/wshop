const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    cataItems: [
      {
        name: '待付款',
        status: 1
      },
      {
        name: '待发货',
        status: 2
      },
      {
        name: '待收货',
        status: 3
      },
      {
        name: '待评价',
        status: 4
      },
      {
        name: '历史订单',
        status: 5
      },
    ],
    status: 1,
  },

  async switchType(e) {
    const currentIndex = e.currentTarget.dataset.index;
    const status = e.currentTarget.dataset.status;
    this.setData({
      status,
      currentIndex,
    });
    await this.getOrderList();
    // 这里请求接口：通过name查询该分类下的所有商品信息
  },

  handleOrder(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/submitOrder/submitOrder?orderId=${orderId}`
    });
  },

  async getOrderList() {
    const { status } = this.data;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getOrderList(status),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          status,
        },
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取订单列表失败");
      }
      wx.hideLoading();
      

      // 返回回来的订单信息
      const { orderList } = Res.data;
      this.setData({
        orderList,
      });
    } catch (error) {
      console.log(error);
      
      wx.hideLoading();
      await wx.showToast({
        title: error.message,
        icon: "none",
        duration: 2000
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
  },

  async onShow() {
    await this.getOrderList();
  }
})