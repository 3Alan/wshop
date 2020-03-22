const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAble: {
      type: Boolean,
      value: false
    },
    hasCancel: {
      type: Boolean,
      value: true
    },
    searchContent: {
      type: String,
    },
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    goToSearch() {
      wx.navigateTo({ url: "/pages/search/search" });
    },
    async inputSearch(e) {
      const searchValue = e.detail.value;
      try {
        const Res = await wx.request({
          url: Api.saveHistorySearch(),
          header: app.generateRequestHeader(),
          method: "POST",
          data: {
            searchValue,
          }
        });
        if (!(Res.statusCode === 200 && Res.data)) {
          throw new errors.ValidateError("网络出错");
        }
      } catch (error) {
        await wx.showToast({
          title:
            error.name === "ValidateError" ? error.message : "出错了请重试",
          icon: "none",
          duration: 2000
        });
        console.log(error);
      }
      wx.redirectTo({
        url: `/pages/searchResult/searchResult?searchValue=${searchValue}`
      });
    },
    goToSearchResult(e) {
      const { id } = e.currentTarget.dataset;

      wx.redirectTo({ url: `/pages/goodDetail/goodDetail?id=${id}` });
    },
    cancelSearch() {
      wx.navigateBack();
    },
    focusEvent() {
      this.triggerEvent("inputFocus");
    }
  }
});
