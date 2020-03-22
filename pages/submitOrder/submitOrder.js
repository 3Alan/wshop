const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPayModal: false,
    needRecharge: false,
    statusEnum: ["待付款", "代发货", "待收货", "待评价", "已完成"]
  },

  addAddress() {
    this.data.addAddress = true;
    wx.navigateTo({
      url: "/pages/addAddress/addAddress"
    });
  },

  closePayModal() {
    this.setData({
      showPayModal: false
    });
  },

  async submitOrder() {
    const { addressDetail, goodDetail, size } = this.data;
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.submitOrder(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          addressDetail,
          goodDetail,
          size
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取信息失败");
      }
      wx.hideLoading();

      // 返回回来的订单信息
      const { orderDetail, msg } = Res.data;
      this.setData({
        orderDetail
      });
      wx.showModal({
        title: "提示",
        content: msg,
        showCancel: false
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

  async checkUserAccount() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.checkUserAccount(),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取余额失败");
      }
      wx.hideLoading();

      // 返回回来的订单信息
      const { balance } = Res.data;
      const needRecharge = balance <= 0 || balance < this.data.goodDetail.price;
      this.setData({
        balance,
        showPayModal: true,
        needRecharge
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

  async goToPay() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.payForOrder(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          orderId: this.data.orderDetail.orderId,
          orderPrice: this.data.goodDetail.price
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("支付失败");
      }
      wx.hideLoading();
      const { orderStatus, msg } = Res.data;
      this.setData({
        "orderDetail.status": orderStatus,
        showPayModal: false
      });
      wx.redirectTo({
        url: "/pages/orderList/orderList"
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

  async getUserInfo() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getAddressList(),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取信息失败");
      }
      wx.hideLoading();

      const addressList = Res.data.addressList;
      const hasAddress = addressList.length > 0;
      const addressDetail = addressList.find(item => {
        return item.is_default === 1;
      });

      this.setData({
        addressDetail,
        hasAddress
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

  async getOrderDetail() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.getOrderDetail(this.data.orderId),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取订单信息失败");
      }
      wx.hideLoading();
      const { addressDetail, goodDetail, orderDetail } = Res.data;
      this.setData({
        addressDetail,
        goodDetail,
        hasAddress: true,
        orderDetail,
      });
    } catch (error) {
      console.log(error);

      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
    }
  },

  goToGoodDetail() {
    const id = this.data.orderDetail ? this.data.orderDetail.goodId : this.data.goodId;
    wx.navigateTo({
      url: `/pages/goodDetail/goodDetail?id=${id}`
    });
  },

  async delivery() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.delivery(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          orderId: this.data.orderDetail.orderId,
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("失败请重试");
      }
      wx.hideLoading();
      const { orderStatus } = Res.data;
      this.setData({
        "orderDetail.status": orderStatus,
      });
      wx.navigateBack();
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
    }
  },

  async cancelOrder() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.cancelOrder(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          orderId: this.data.orderDetail.orderId,
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("失败请重试");
      }
      wx.hideLoading();
      const { orderStatus } = Res.data;
      this.setData({
        "orderDetail.status": orderStatus,
      });
      wx.navigateBack();
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
    }
  },

  async confirmReceiving() {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.confirmReceiving(),
        header: app.generateRequestHeader(),
        method: "POST",
        data: {
          orderId: this.data.orderDetail.orderId,
        }
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("失败请重试");
      }
      wx.hideLoading();
      const { orderStatus } = Res.data;
      this.setData({
        "orderDetail.status": orderStatus,
      });
      wx.navigateBack();
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
    }
  },

  async evaluate() {
    const { orderId, goodDetail } = this.data;
    wx.redirectTo({
      url: `/pages/evaluate/evaluate?orderId=${orderId}&goodDetail=${JSON.stringify(goodDetail)}`,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    if (options.orderId) {
      this.data.orderId = options.orderId;
      await this.getOrderDetail();
    } else {
      let { goodDetail, size, id } = options;
      goodDetail = JSON.parse(goodDetail);
      await this.getUserInfo();
      this.setData({
        goodDetail,
        size,
        goodId: id,
      });
    }
  },

  async onShow() {
    if (this.data.addAddress) {
      await this.getUserInfo();
    }
  }
});
