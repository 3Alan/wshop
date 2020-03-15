// pages/myCollection/myCollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: [
      {
        name: 'Air Jordan 1 Midsdlafkjladsjfladj',
        size: '42',
        price: '987',
        img:'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg'
      },
      {
        name: 'Air Jordan 1 Mid',
        size: '42',
        price: '9123',
        img:'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg'
      },
      {
        name: 'Air Jordan 1 Mid',
        size: '32',
        price: '123',
        img:'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg'
      },
      {
        name: 'Air Jordan 1 Mid',
        size: '32',
        price: '123',
        img:'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg'
      },
      {
        name: 'Air Jordan 1 Mid',
        size: '32',
        price: '123',
        img:'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg'
      },
      {
        name: 'Air Jordan 1 Mid',
        size: '32',
        price: '123',
        img:'https://c.static-nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/71584fa5-f265-4967-95b1-8cc2f6e09e78/air-jordan-1-mid-%E7%94%B7%E5%AD%90%E8%BF%90%E5%8A%A8%E9%9E%8B-DQ5wwd.jpg'
      },
    ],
  },

  startTouch(e) {
    this.setData({
      startX: e.touches[0].clientX,
    });
  },

  move(e) {
    let collectionList = this.data.collectionList.splice(0);
    const currentCard = e.currentTarget.dataset.index;
    const clientX = e.touches[0].clientX;
    const moveRange = this.data.startX - clientX > 100 ? 100 : this.data.startX - clientX;
    collectionList[currentCard].leftStyle = `left: -${moveRange}rpx`;
    this.setData({
      collectionList,
    });
  },

  touched(e) {
    let collectionList = this.data.collectionList.splice(0);
    const currentCard = e.currentTarget.dataset.index;
    const clientX = e.changedTouches[0].clientX;
    const moveRange = this.data.startX - clientX;
    if (moveRange < 100) {
      collectionList[currentCard].leftStyle = 'left: 0';
    }
    this.setData({
      collectionList,
    });
  },

  deleteCard(e) {
    let collectionList = this.data.collectionList.slice(0);
    const currentCard = e.currentTarget.dataset.index;
    collectionList.splice(currentCard, 1);
    this.setData({
      collectionList,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})