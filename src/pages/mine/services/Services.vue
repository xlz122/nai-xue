<template>
  <view class="container">
    <view class="cell" @tap="helpCenter">
      <view class="content">
        <image class="icon" src="/static/images/services/bzzx.png"></image>
        <view>帮助中心</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
    <view class="cell" @tap="tip('关于奈雪')">
      <view class="content">
        <image class="icon" src="/static/images/services/gynx.png"></image>
        <view>关于奈雪</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
    <view class="cell" @tap="tip('奈雪礼物')">
      <view class="content">
        <image class="icon" src="/static/images/services/wdzl.png"></image>
        <view>奈雪礼物</view>
      </view>
      <image class="navigator" src="/static/images/navigator-1.png"></image>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServicesView',
  setup() {
    function helpCenter(): void {
      uni.navigateTo({
        url: '/pages/mine/services/help-center/HelpCenter'
      });
    }

    function tip(title: string): void {
      uni.showToast({
        title,
        icon: 'none'
      });
    }

    return {
      helpCenter,
      tip
    };
  }
});
</script>

<style lang="scss" scoped>
@import './services.scss';
</style>
