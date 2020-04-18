const wx = require('./lib/wx');

//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    // userInfo: null
  },
  generateRequestHeader: () => {
    const token = wx.getStorageSync('authorization');
    return {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token, // 固定格式： 'Bearer ' + token
    };
  },

  // 返回用户接收订阅模板的情况（对应格式：'模板id：accept/reject/ban'）
  async subscribeSubject(tmplIds) { // 一次只支持三个模板
    let result;
    try {
      result = await wx.requestSubscribeMessage({
        tmplIds,
      });
    } catch (error) {
      result = error.message;
    }
    return result;
  },

  async updateAccessToken() {
    
  }
})