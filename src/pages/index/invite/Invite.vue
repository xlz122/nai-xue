<template>
  <view class="container">
    <view class="invite-box">
      <view
        class="w-100 d-flex justify-content-end align-items-baseline font-size-sm"
      >
        <view class="text-color-danger font-size-lg">{{ percent }}</view>
        <view class="text-color-assist">/3</view>
      </view>
      <view class="progress-box">
        <progress
          :percent="(percent / 3) * 100"
          backgroundColor="#FEEBD5"
          activeColor="#FEDC5F"
          stroke-width="30"
          border-radius="30"
        ></progress>
      </view>
      <view
        class="d-flex flex-column text-color-danger font-size-sm align-items-center mb-40"
      >
        <view>每邀3位新用户点亮，得买茶送包劵1张</view>
        <view>新用户可得30元权益劵包</view>
      </view>
      <view class="d-flex just-content-center help-box" hover-class="opacity-1">
        <view class="w-90 position-relative">
          <image
            class="w-100"
            src="https://img-shop.qmimg.cn//s16/images/2020/04/21/a45e8244188a5ea0.png"
            mode="widthFix"
          ></image>
        </view>
        <view
          class="font-size-lg text-color-danger position-absolute d-flex align-items-center mt-30"
          @tap="friendsHelp"
        >
          <view>立即找好友助力</view>
          <image
            class="to-invite-img"
            src="https://img-shop.qmimg.cn/s16/images/2020/04/22/36d4a67a6ede4068.png"
            mode="widthFix"
          ></image>
        </view>
      </view>
    </view>

    <view class="my-award">
      <image
        class="my-award-img"
        src="https://img-shop.qmimg.cn/s16/images/2020/04/21/7a7cde7fb0259f0d.png"
        mode="widthFix"
      ></image>
      <view class="item">
        <view class="font-size-lg text-color-danger">{{ percent }}</view>
        <view class="font-size-sm text-color-assist">已成功邀请(位)</view>
      </view>
      <view class="item">
        <view class="font-size-lg text-color-danger">{{ rewardedNum }}</view>
        <view class="font-size-sm text-color-assist">已获得奖励(次)</view>
      </view>
    </view>

    <image
      class="w-100 firend-award"
      src="https://img-shop.qmimg.cn/s16/images/2020/04/27/ca59f6bbbb830a16.png"
      mode="widthFix"
    ></image>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InviteView',
  setup() {
    const percent = ref<number>(1);
    const rewardedNum = ref<number>(0);

    function friendsHelp(): void {
      uni.showToast({
        title: '立即找好友助力',
        icon: 'none'
      });
    }

    return {
      percent,
      rewardedNum,
      friendsHelp
    };
  }
});
</script>

<style lang="scss">
page {
  background: url('https://img-shop.qmimg.cn/s16/images/2020/04/27/7ba54456f16f48df.jpeg')
    no-repeat;
  background-size: 100% auto;
  padding: 576rpx 30rpx 0;
  height: auto;
}

@import './invite.scss';
</style>
