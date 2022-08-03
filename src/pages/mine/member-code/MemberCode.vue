<template>
  <view class="container member-code">
    <view class="w-100 d-flex flex-column">
      <view class="d-flex just-content-center align-items-center">
        <view class="avatar-wrapper">
          <image :src="userInfo?.avatar"></image>
          <view class="tag">
            <image src="/static/images/mine/level.png" mode="widthFix"></image>
            <view>{{ userInfo?.memberLevel }}</view>
          </view>
        </view>
      </view>
      <view class="user-box">
        <view class="user-nickname text-color-assist">
          {{ userInfo?.nickname }}
        </view>
        <view class="w-100 d-flex font-size-sm text-color-assist mb-30">
          <view class="user-grid" @tap="jumpCoupons">
            <view class="value">{{ userInfo?.couponNum || 0 }}</view>
            <view>奈雪券</view>
          </view>
          <view class="user-grid" @tap="jumpIntegrals">
            <view class="value">{{ userInfo?.pointNum || 0 }}</view>
            <view>积分</view>
          </view>
          <view class="user-grid" @tap="jumpBalance">
            <view class="value">{{ userInfo?.balance || 0 }}</view>
            <view>余额</view>
          </view>
          <view class="user-grid" @tap="jumpGiftCard">
            <view class="value">{{ userInfo?.giftBalance || 0 }}</view>
            <view>礼品卡</view>
          </view>
        </view>
        <view class="qrcode d-flex just-content-center align-items-center">
          <image
            src="/static/images/mine/qrcode.png"
            mode="widthFix"
            style="width: 350rpx; height: 350rpx"
          ></image>
        </view>
        <view
          class="tips d-flex just-content-center align-items-center"
          style="margin-bottom: 50rpx"
        >
          <view class="font-size-sm text-color-assist">
            支付前出示可累计积分, 会员码每30秒更新
          </view>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <view class="d-flex just-content-center align-items-center">
          <button class="wepay-btn" type="primary" hover-class="none">
            <image src="/static/images/mine/wechat.png"></image>
            <view>使用微信支付</view>
          </button>
        </view>
        <!-- #endif -->
      </view>
    </view>
    <image
      class="w-100"
      src="/static/images/mine/member-code-banner.png"
      mode="widthFix"
    ></image>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MemberCode',
  setup() {
    const $store = useStore();

    const isLogin = computed<boolean>(() => $store.getters.isLogin);
    const userInfo = computed(() => $store.getters.userInfo);

    // 跳转奈雪券
    function jumpCoupons(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/coupons/Coupons'
      });
    }

    // 跳转积分商城
    function jumpIntegrals(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/integrals/Integrals'
      });
    }

    // 跳转余额储值
    function jumpBalance(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/balance/Balance'
      });
    }

    // 跳转礼品卡
    function jumpGiftCard(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/gift-card/GiftCard'
      });
    }

    return {
      isLogin,
      userInfo,
      jumpCoupons,
      jumpIntegrals,
      jumpBalance,
      jumpGiftCard
    };
  }
});
</script>

<style lang="scss" scoped>
@import './member-code.scss';
</style>
