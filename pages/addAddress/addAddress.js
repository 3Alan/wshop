const wx = require('../../lib/wx');
const Api = require('../../utils/api');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindRegionChange(e) {
    console.log(e);
    const { value } = e.detail;
    const address = value.join(' ');
    this.setData({
      address,
    });
  },

  saveReceiverInfo(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [key]: value,
    });
  },

  checkValidate() {
    const { receiver, tel, address, addressDetail } = this.data;
    const isValidate = receiver && tel && address && addressDetail;
    this.setData({
      isValidate,
    });
  },

  async saveAddress() {
    this.checkValidate();
    const { receiver, tel, address: addressArea, addressDetail, isValidate } = this.data;
    
    if (isValidate) {
      const address = `${addressArea} ${addressDetail}`;
      wx.showLoading({ title: "加载中..." });
      try {
        const Res = await wx.request({
          url: Api.addAddress(),
          header: app.generateRequestHeader(),
          method: "POST",
          data: {
            receiver,
            tel,
            address,
          }
        });
        if (!(Res.statusCode === 200 && Res.data)) {
          throw new errors.ValidateError("保存失败");
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
              url: "/pages/login/login?redirectToUrl=/pages/addAddress/addAddress"
            });
          }
          return ;
        } else {
          wx.showModal({
            title: '提示',
            content: Res.data.msg,
            showCancel: false,
          });
          wx.navigateBack();
        }
        const { goodList } = Res.data;
        this.setData({
          goodList,
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
    } else {
      wx.showModal({
        title: '提示',
        content: '填写完成再进行保存',
        showCancel: false,
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
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