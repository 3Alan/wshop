// components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAble: {
      type: Boolean,
      value: false,
    },
    hasCancel: {
      type: Boolean,
      value: true,
    },
    searchContent: {
      type: String,
    }
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToSearch() {
      wx.navigateTo({url: '/pages/search/search'});
    },
    inputSearch(e) {
      const inputValue = e.detail.value;
      console.log(inputValue);
      
      // 通过输入的值去后台查询相关的商品
      this.setData({
        searchData: ['cp11', 'cpfm', 'cp3保罗'],
      });
    },
    goToSearchResult(e) {
      const name = e.currentTarget.dataset.name;
      wx.redirectTo({
        url: `/pages/searchResult/searchResult?name=${name}`,
      });
      // 根据name去搜索对应的商品
    },
    cancelSearch() {
      wx.navigateBack();
    },
    focusEvent() {
      this.triggerEvent('inputFocus');
    }
  }
})
