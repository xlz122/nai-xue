<template>
  <view class="container">
    <view class="banner">
      <image class="bg" src="/static/images/index/bg.jpg"></image>
      <view class="intro">
        <view class="greet">
          您好，{{ isLogin ? userInfo?.nickname : '游客' }}
        </view>
        <view class="note">一杯奶茶，一口软欧包，在奈雪遇见两种美好</view>
      </view>
    </view>
    <view class="content">
      <view class="entrance">
        <view class="item" @tap="jumpDrink">
          <image class="icon" src="/static/images/index/zq.png"></image>
          <view class="title">自取</view>
        </view>
        <view class="item" @tap="jumpAddress">
          <image class="icon" src="/static/images/index/wm.png"></image>
          <view class="title">外卖</view>
        </view>
      </view>
      <view class="info">
        <view class="integral_section" @tap="jumpIntegrals">
          <view class="top">
            <text class="title">我的积分</text>
            <text class="value">
              {{ isLogin ? userInfo?.pointNum : '***' }}
            </text>
          </view>
          <view class="bottom">
            进入积分商城兑换奈雪券及周边好礼
            <view class="iconfont iconarrow-right"></view>
          </view>
        </view>
        <view class="qrcode_section" @tap="jumpMemberCode">
          <image src="/static/images/index/qrcode.png"></image>
          <text>会员码</text>
        </view>
      </view>
      <view class="navigators">
        <view class="left">
          <view class="grid flex-column just-content-center">
            <view class="d-flex align-items-center">
              <image
                class="mark-img"
                src="/static/images/index/csc.png"
              ></image>
              <view class="font-size-sm text-color-base">奈雪的茶商城</view>
            </view>
            <view
              class="text-color-assist"
              style="margin-left: 40rpx; font-size: 20rpx"
            >
              优质茶礼盒，网红零食
            </view>
          </view>
          <view class="grid justify-content-end align-items-end">
            <image
              class="yzclh-img"
              src="/static/images/index/yzclh.png"
              mode="heightFix"
            ></image>
          </view>
        </view>
        <view class="right">
          <view class="tea-activity" @tap="jumpInvite">
            <image class="mark-img" src="/static/images/index/mcsb.png"></image>
            <view>买茶送包</view>
            <view class="right-img">
              <image
                src="/static/images/index/mcsb_bg.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
          <view class="member-gifts" @tap="jumpPackages">
            <image class="mark-img" src="/static/images/index/hyjb.png"></image>
            <view>会员劵包</view>
            <view class="right-img">
              <image
                src="/static/images/index/hyjb_bg.png"
                mode="widthFix"
              ></image>
            </view>
          </view>
        </view>
      </view>
      <view class="member-news">
        <view class="header" @tap="news">
          <view class="title">会员新鲜事</view>
          <view class="iconfont iconRightbutton"></view>
        </view>
        <view class="list">
          <view class="item">
            <image src="/static/images/index/mnbx.jpg"></image>
            <view class="title">"梅"你不行 | 霸气杨梅清爽回归</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'IndexView',
  setup() {
    const $store = useStore();

    const isLogin = computed<boolean>(() => $store.getters.isLogin);
    const userInfo = computed(() => $store.getters.userInfo);

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

    // 会员码
    function jumpMemberCode(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/mine/member-code/MemberCode'
      });
    }

    // 买茶送包
    function jumpInvite(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/index/invite/Invite'
      });
    }

    // 券包商品
    function jumpPackages(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/index/packages/Packages'
      });
    }

    // 会员新鲜事
    function news(): void {
      uni.showToast({
        title: '会员新鲜事',
        icon: 'none'
      });
    }

    // 跳转菜单
    function jumpDrink(): void {
      uni.switchTab({
        url: '/pages/drink/drink'
      });
    }

    // 跳转收货地址
    function jumpAddress(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      // uni.navigateTo({
      //   url: '/pages/address/Address'
      // });
    }

    return {
      isLogin,
      userInfo,
      jumpIntegrals,
      jumpMemberCode,
      jumpInvite,
      jumpPackages,
      news,
      jumpDrink,
      jumpAddress
    };
  }
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
