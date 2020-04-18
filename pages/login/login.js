const wx = require('../../lib/wx');
const Api = require('../../utils/api');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeInput: false,
  },

  getInputStatus (e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.data[key] = value;
    if (this.data.password && this.data.username) {
      this.setData({
        completeInput: true,
      });
    } else {
      this.setData({
        completeInput: false,
      });
    }
  },

  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },

  async wxLogin() {
    const res = await wx.login();
    if (res.code) {
      //发起网络请求
      const loginRes = await wx.request({
        url: Api.wxLogin(),
        method: 'POST',
        data: {
          code: res.code
        }
      });
      if(loginRes.statusCode === 200){
        wx.setStorageSync('openid', loginRes.data.openid);
        wx.setStorageSync('access_token', loginRes.data.access_token);
      }
    } else {
      throw new errors.ValidateError('微信授权失败！');
    }
  },

  async login() {
    if(!this.data.completeInput) {
      wx.showModal({
        title: '提示',
        content: '请填写完成后再进行登录',
        showCancel: false,
      });
    }
    const { username, password } = this.data;
    await this.wxLogin();
    wx.showLoading({ title: '登录中...' });
    try {
      const loginRes = await wx.request({
        url: Api.Login(),
        method: 'POST',
        data: {
          username,
          password,
        }
      });
      if (!(loginRes.statusCode === 200 && loginRes.data)) {
        throw new errors.ValidateError('登录失败');
      }
      wx.hideLoading();
      if (loginRes.data.code === '00001') {
        // 登录成功
        wx.setStorageSync('authorization', loginRes.data.token);
        wx.setStorageSync('user', username);
        if (this.data.redirectToUrl) {
          wx.redirectTo({
            url: this.data.redirectToUrl,
          });
        }
        wx.switchTab({
          url: '/pages/user/user',
        });
        this.onLoad();
      } else {
        wx.showModal({
          title: '提示',
          content: loginRes.data.msg,
          showCancel: false,
        });
      }
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title: error.name === 'ValidateError' ? error.message : '出错了请重试',
        icon: 'none',
        duration: 2000,
      });
      console.log(error);
      
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const redirectToUrl = options ? options.redirectToUrl : '';
    this.data.redirectToUrl = redirectToUrl;
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