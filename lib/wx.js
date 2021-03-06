const errors = require('../utils/error.js');

/**
 * Promise for wx api
 */
const promise = module.exports = {};
promise.default = promise;

/**
 * promise.app ==> getApp()
 */
Object.defineProperty(promise, 'app', {
  get: function () {
    return getApp();
  }
});

/**
 * 没有 success fail 回调
 */
var noPromiseMethods = {
  stopRecord: true,
  pauseVoice: true,
  stopVoice: true,
  pauseBackgroundAudio: true,
  stopBackgroundAudio: true,
  showNavigationBarLoading: true,
  hideNavigationBarLoading: true,
  createAnimation: true,
  createContext: true,
  hideKeyboard: true,
  stopPullDownRefresh: true,
  canIUse: true,
  hideLoading: true,
  getUpdateManager: true,
  pageScrollTo: true,
  reportAnalytics: true,
  createCanvasContext: true,
  createInnerAudioContext: true,
  createSelectorQuery: true,
  createIntersectionObserver: true,
};

function forEach(key) {
  if (noPromiseMethods[key] || key.substr(0, 2) === 'on' || /\w+Sync$/.test(key)) { // 没有 success fail 回调，以 on 开头，或以 Sync 结尾的用原始的方法
    promise[key] = function () {
      return wx[key].apply(wx, arguments);
    };
    return;
  }

  // 转成 promise
  promise[key] = function (obj) {
    obj = obj || {};
    let url = '';
    if (key === 'request' && obj.header) {
      url = obj.url.split('?')[0];
      url = url.replace(/http:\/\/|https:\/\//, '');
      console.warn('Requesting:', url);
    }

    return new Promise(function (resolve, reject) {
      obj.success = resolve;
      obj.fail = function (res) {
        console.error(res);
        if (res && res.errMsg) {
          reject(new Error(res.errMsg));
        } else {
          reject(res);
        }
      };
      wx[key](obj);
    }).then(function onFulfilled(value) {
      if (key === 'request' && value && value.statusCode === 401) {
        let errorMsg = '请登录';
        if(value.data.error.name === 'TokenExpiredError') {
          errorMsg = '登录状态过期'
        }
        
        console.error(`Request ${url} fail: Login required.`);
        wx.redirectTo({
          url: "/pages/login/login"
        });
        throw new errors.LoginRequiredError(errorMsg);
      }

      if (key === 'request' && (!value || value.statusCode !== 200)) {
        console.error(`Request ${url} fail: statusCode is ${value ? value.statusCode : 'unknown'}.`);
        throw new Error('HttpRequestError');
      }

      return value;
    });
  };

  promise.sleep = (time = 0) => new Promise((resolve) => {
    setTimeout(resolve, time);
  });

}

Object.keys(wx).forEach(forEach);
