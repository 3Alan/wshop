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
})