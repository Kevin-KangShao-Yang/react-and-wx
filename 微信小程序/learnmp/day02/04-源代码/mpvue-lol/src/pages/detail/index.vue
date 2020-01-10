<template>
  <div>
    <swiper indicator-dots autoplay circular>
  <block v-for="item in hero.bgs" :key="item">
    <swiper-item>
      <image :src="item"></image>
    </swiper-item>
  </block>
</swiper>

<!-- 主体部分 -->
<view class="content">
  <view class="left">
    <view class="title">{{hero.title}}</view>
    <view class="name">{{hero.name}}</view>

    <!-- tags -->
    <view class="tags">
      <text v-for="item in hero.tags" :key="item">{{item}}</text>
    </view>

  <view class="ability">
    <view class="item">
      <text>生存能力</text>
      <progress :percent="hero.Ability.life" activeColor="#1ec76b" backgroundColor="#363636"  stroke-width="11" active/>
    </view>
    <view class="item">
      <text>物理攻击</text>
      <progress :percent="hero.Ability.physical" activeColor="#f2c40c" backgroundColor="#363636"  stroke-width="11" active/>
    </view>

    <view class="item">
      <text>魔法攻击</text>
      <progress :percent="hero.Ability.magic" activeColor="#f2a709" backgroundColor="#363636"  stroke-width="11" active/>
    </view>

    <view class="item">
      <text>操作难度</text>
      <progress :percent="hero.Ability.difficulty" activeColor="#cb8eff" backgroundColor="#363636"  stroke-width="11" active/>
    </view>
  </view>


  </view>
  <view class="right">
    {{hero.story}}
  </view>
</view>
  </div>
</template>

<script>
import heroDetailArr from '../../data/lol_details_duowan'
export default {
  data () {
    return {
      hero: {}
    }
  },
  onLoad (options) {
    console.log(options.id)
    this.hero = heroDetailArr.find(v => {
      return v.id === options.id
    })
    // 设置标题
    wx.setNavigationBarTitle({ title: `${this.hero.title}-${this.hero.name}` })
  }
}
</script>

<style>
/* swiper{
  height: 136px;
} */

page{
  background-color: #363636;
  color: #fff;
  font-size: 12px;
}
swiper image{
  width: 100%;
}

.content{
  display: flex;
  margin:12px 10px 0;
}

.left{
  width: 191px;
}
.left .title{
  font-size: 14px;
}

.left .name{
  font-size: 20px;
  margin-top:4px;
}
.right{
  flex:1;
}
.tags{
  margin-top:12px;
}
.ability{
  margin-top: 18px;
}
.ability .item{
  display: flex;
  margin-top:2px;
}

.ability .item progress{
  width: 100px;
  margin-left:6px;
}
.tags text{
  width: 30px;
  height: 22px;
  line-height: 22px;
  background-color: #029b7f;
  display: inline-block;
  text-align: center;
  margin-right: 4px;
  border-radius: 4px;
}
</style>