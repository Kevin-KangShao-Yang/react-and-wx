const NUM_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: NUM_ARR
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
    // 下拉刷新加载第一页
    setTimeout(()=>{

    this.setData({
      list: NUM_ARR
    })

    //主动结束下拉刷新
    wx.stopPullDownRefresh();
    },500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let list = this.data.list
    for (let i = 0; i < 10; i++) {
      list.push(list.length + 1)
    }
    setTimeout(() => {

      this.setData({
        list
      })
    }, 500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})