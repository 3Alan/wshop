const wx = require('../../lib/wx');
const Api = require('../../utils/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeInput: false,
    passwordTips: false,
    userExit: false,
  },

  getInputStatus (e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [key]: value,
    });
    const { password, repassword, username, userExit } = this.data;
    this.setData({
      passwordTips: !!(key === 'repassword' && password != repassword),
    });
    const registerBtnAble = !!(password && repassword && username && (!userExit) && !this.data.passwordTips);
    
    this.setData({
      completeInput: registerBtnAble,
    });
  },

  async checkUserName(e) {
    const { value } = e.detail;
    wx.showLoading({ title: '加载中...' });
    try {
      const res = await wx.request({
        url: Api.checkUserName(),
        method: 'POST',
        data: {
          username: value,
        }
      });
      if (!(res.statusCode === 200 && res.data)) {
        throw new errors.ValidateError('获取失败！');
      }
      this.setData({
        userExit: res.data.userExit,
      });
      wx.hideLoading();
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

  async register() {
    const { username, password } = this.data;

    wx.showLoading({ title: '注册中...' });
    try {
      const registerRes = await wx.request({
        url: Api.register(),
        method: 'POST',
        data: {
          username,
          password,
        }
      });
      if (!(registerRes.statusCode === 200 && registerRes.data)) {
        throw new errors.ValidateError('注册失败');
      }
      wx.hideLoading();
      const result = await wx.showModal({
        title: '提示',
        content: registerRes.data.msg,
        showCancel: false,
      });
      if (result.confirm) {
        wx.redirectTo({
          url: '/pages/login/login',
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
  },
})