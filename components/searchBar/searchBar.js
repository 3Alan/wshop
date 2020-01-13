// components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAble: {
      type: Boolean,
      value: false,
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
  }
})
