const moment = require('../../lib/moment');
const Api = require("../../utils/api");
const wx = require("../../lib/wx");
const errors = require("../../utils/error");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResultList: [
      {
        id: 1,
        img_url: 'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/xowpa3kkdfun2nd7pp6w/zoom-freak-1-ep-%E7%94%B7%E5%AD%90%E7%AF%AE%E7%90%83%E9%9E%8B-k838FB.jpg',
        name: 'Zoom Freak 1 EP',
        price: 899,
        salesVolume: 1286,
        shelfTime: '2019-05-20',
      },
      {
        id: 2,
        img_url: 'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/npzxdqeatondw2jmjvtr/alphadunk-ep-%E7%94%B7%E5%AD%90%E7%AF%AE%E7%90%83%E9%9E%8B-SHRZhC.jpg',
        name: 'Nike AlphaDunk EP',
        price: 1399,
        salesVolume: 7821,
        shelfTime: '2019-11-20',
      },
      {
        id: 3,
        img_url: 'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/kc12ugtouei5y3lkqspx/air-max-270-react-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-lmVVt3.jpg',
        name: 'Nike Air Max 270 React',
        price: 1119,
        salesVolume: 842,
        shelfTime: '2019-09-20',
      },
      {
        id: 4,
        img_url: 'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s0wrpy3avslyq5dqzrzi/metcon-10-sf-%E7%94%B7%E5%AD%90%E8%AE%AD%E7%BB%83%E9%9E%8B-d57jKx.jpg',
        name: 'Nike Metcon X SF',
        price: 999,
        salesVolume: 1352,
        shelfTime: '2019-10-20',
      },
      {
        id: 5,
        img_url: 'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/glosmwghgrsrzjwoyhqu/zoom-janoski-mid-rm-crafted-%E7%94%B7-%E5%A5%B3%E6%BB%91%E6%9D%BF%E9%9E%8B-J74qgN.jpg',
        name: 'Nike Zoom Janoski Mid RM Crafted',
        price: 749,
        salesVolume: 6825,
        shelfTime: '2019-04-20',
      },
    ],
    currentIndex: 'zh',
  },
  goodDetail (e) {
    const goodId = e.currentTarget.dataset.id;
    // 通过id跳转到对应的商品详情页面
    wx.navigateTo({url: `/pages/goodDetail/goodDetail?id=${goodId}`});
  },

  sortByXl(a, b) {
    return b.sales_volume - a.sales_volume;
  },

  sortByJg(a, b) {
    return b.price - a.price;
  },
  
  switchFilter(e) {
    const index = e.currentTarget.dataset.index;
    if(index === 'xl') {
      const xlList = this.data.searchResultList;
      xlList.sort(this.sortByXl);
      this.setData({
        searchResultList: xlList,
      })
    }else if(index === 'jg') {
      const jgList = this.data.searchResultList;
      jgList.sort(this.sortByJg);
      this.setData({
        searchResultList: jgList,
      })
    }else if(index === 'xp') {
      const xpList = this.data.searchResultList;
      xpList.sort(this.sortByXp);
      this.setData({
        searchResultList: xpList,
      })
    }else if(index === 'zh') {
      const { zhList } = this.data;
      this.setData({
        searchResultList: JSON.parse(JSON.stringify(zhList)),
      })
    }
    
    this.setData({
      currentIndex: index,
    })
  },

  async searchGoodList(inputValue) {
    wx.showLoading({ title: "加载中..." });
    try {
      const Res = await wx.request({
        url: Api.search(inputValue),
        header: app.generateRequestHeader(),
        method: "GET"
      });
      if (!(Res.statusCode === 200 && Res.data)) {
        throw new errors.ValidateError("获取数据失败");
      }
      this.setData({
        searchResultList: Res.data.goodList,
        zhList: Res.data.goodList,
      });
      wx.hideLoading();
    } catch (error) {
      wx.hideLoading();
      await wx.showToast({
        title:
          error.name === "ValidateError" ? error.message : "出错了请重试",
        icon: "none",
        duration: 2000
      });
      console.log(error);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { searchValue } = options;
    this.setData({
      searchValue,
    });
    await this.searchGoodList(searchValue);
  },
})