<template>
  <div class="list">
    <view class="scroll-view-item_H" v-for="item in movieList" :key="item.id">
      <img :src="item.images.large" alt="" />
      <p>{{ item.title }}</p>
      <div class="rating">
        <div class="stars" v-if="item.rating.average">
          <img
            v-for="(item2, index2) in item.starNum"
            :key="index2"
            src="../../../static/images/star.svg"
            alt=""
          />
          <img
            v-for="(item2, index2) in 5 - item.starNum"
            :key="index2"
            src="../../../static/images/unstar.svg"
            alt=""
          />
        </div>
        <span class="score">{{
          item.rating.average ? item.rating.average : "暂无评论"
        }}</span>
      </div>
    </view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      movieList: []
    }
  },
  onLoad (options) {
    console.log(options)
    let param = options.param
    wx.setNavigationBarTitle({
      title: param === 'top250' ? 'TOP250' : '影院热映'
    })
    this.getMovies(param)
  },
  methods: {
    getMovies (param) {
      this.$request({
        url: `/v2/movie/${param}`,
        data: {
          apikey: '0df993c66c0c636e29ecbb5344252a4a'
        }
      }).then(res => {
        console.log(res)
        let subjects = res.data.subjects
        subjects.forEach(v => {
          v.starNum = Math.ceil(v.rating.average / 2)
        })
        this.movieList = subjects
      })
    }
  }
}
</script>

<style lang="less">
.list {
  display: flex;
  flex-wrap: wrap;
}

.scroll-view-item_H {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 200rpx;
    height: 286rpx;
  }
  > p {
    width: 200rpx;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}
.rating {
  display: flex;
  justify-content: center;
  img {
    width: 20rpx;
    height: 20rpx;
  }
  .score {
    margin-left: 8rpx;
    color: #aaa;
  }
}
</style>
