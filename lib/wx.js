const errors = require('../utils/error.js');
const Crypto = require('./crypto.js');

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
 * 游客接口白名单
 */
const guestWhiteList = [
  'weapp-order/user/info',
  'weapp-order/user-operation',
  'weapp-order/customer-verify-designer/am-i-open',
  'app-log/save',
  'company/jd/checkStatus',
  'designer-card/wx-user',
  'customer/list',
  'customer/detail',
  'customer/contract',
  'customer/contract/options',
  'customer/contract/record',
  'customer/payment',
  'customer/call',
  'customer/operation-record-search',
]

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
      if (promise.app.isGuestMode) {
        const path = obj.url.split('/').splice(4).join('/');
        if (guestWhiteList.find(whiteLink => ~path.indexOf(whiteLink))) {
          obj.url = obj.url.replace(path, `demo/${path}`);
        }
      }
      console.warn('Requesting:', url);
      const method = obj.method;
      const header = obj.header;
      const data = obj.data;
      const timestamp = new Date().getTime();
      let dataToEncrypt = `url=${url}&method=${method}&body=`;
      if ((method === 'POST' || method === 'PUT') && data) {
        dataToEncrypt = `${dataToEncrypt}${JSON.stringify(data)}`;
      }

      dataToEncrypt = `${dataToEncrypt}&timestamp=${timestamp}`;
      const signatrue = Crypto.HmacSHA256(dataToEncrypt, 'a633dc39-e0eb-48b2-81ad-1d3885a4b95f')
        .toString();
      obj.header['client-signature'] = signatrue;
      obj.header['jia-timestamp'] = timestamp;
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
        console.error(`Request ${url} fail: Login required.`);
        if (!getApp().globalData.inLogin) getApp().globalData.needLogin = true;
        if (value.header && value.header.reason) {
          getApp().globalData.needLoginReason = decodeURIComponent(value.header.reason);
        }
        throw new errors.LoginRequiredError();
      }

      if (key === 'request' && (!value || value.statusCode !== 200)) {
        console.error(`Request ${url} fail: statusCode is ${value ? value.statusCode : 'unknown'}.`);
        const message = JSON.stringify(value || {});
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
