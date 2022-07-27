<template>
  <view class="container">
    <view class="cell" @tap="tip">
      <view class="content">
        <image class="icon" src="/static/images/services/djsm.png"></image>
        <view>等级说明</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
    <view class="cell" @tap="tip">
      <view class="content">
        <image class="icon" src="/static/images/services/hyxy.png"></image>
        <view>会员协议</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
    <view class="cell" @tap="tip">
      <view class="content">
        <image class="icon" src="/static/images/services/ystk.png"></image>
        <view>隐私条款</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
    <view class="cell" @tap="tip">
      <view class="content">
        <image class="icon" src="/static/images/services/cjwt.png"></image>
        <view>常见问题</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpCenter',
  setup() {
    function tip(): void {
      uni.showToast({
        title: '该功能暂未开发',
        icon: 'none'
      });
    }

    return {
      tip
    };
  }
});
</script>

<style lang="scss" scoped>
@import './help-center.scss';
</style>
