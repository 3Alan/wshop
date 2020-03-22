//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    banner: [
      {
        image_url:
          "https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg",
        id: 1
      },
      {
        image_url:
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-03de242a-c358-466d-9ba8-7fda81144b10/jordan-sport-dna-%E7%94%B7%E5%AD%90%E6%A2%AD%E7%BB%87%E4%B8%8A%E8%A1%A3-KZgCSZ.jpg",
        id: 2
      },
      {
        image_url:
          "https://c.static-nike.com/a/images/f_auto/q_auto/t_PDP_864_v1/3d8a6abb-cdc3-4465-9944-03b8f3abeec4/air-zoom-unvrs-%E7%94%B7-%E5%A5%B3%E7%AF%AE%E7%90%83%E9%9E%8B-DHjqTK.jpg",
        id: 3
      }
    ],
    recommendList: {
      categoryName: '理想鞋款',
      items: [
        {
          image_url: 'https://c.static-nike.com/a/images/f_auto/dpr_1.0/h_540,c_limit/f9af2888-6758-4424-b70a-8e825fe9c987/nike-.jpg',
          type: '休闲',
          name: 'leisure'
        },
        {
          image_url: 'https://static.nike.com/a/images/f_auto/dpr_2.0/h_500,c_limit/cd9ac6f8-d925-4ae1-b258-6df3e536e76a/image.jpg',
          type: '男子',
          name: 'male'
        },
        {
          image_url: 'https://c.static-nike.com/a/images/f_auto/dpr_2.0/h_500,c_limit/soikcb1qgpyytea4vzic/nike-.jpg',
          type: '篮球',
          name: 'shoes',
        },
      ]
    }
  },

  goToDetail({currentTarget: {dataset: { id }}}) {
    wx.navigateTo({url: `/pages/goodsDetail/goodsDetail?id=${id}`});
    console.log(id);
  },

  goToCategory(e) {
    const type = e.currentTarget.dataset.name;
    app.globalData.categoryType = type;
    wx.switchTab({
      url: `/pages/category/category`
    });
  },

  onLoad: function() {
  }
});
