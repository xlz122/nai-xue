<template>
  <view class="mine-container">
    <view class="position-relative">
      <image class="mine-bg" src="/static/images/mine/mine-bg.jpeg"></image>
      <button class="hym-btn" type="default" size="mini" @tap="jumpMemberCode">
        <image class="hym-img" src="/static/images/mine/hym.png"></image>
        <text>会员码</text>
      </button>
    </view>
    <view class="user-info">
      <UserInfo />
      <view class="level-benefit-box" v-if="!isLogin">
        <view
          class="d-flex align-items-center justify-content-between font-size-base"
        >
          <view class="text-color-base">新用户加入会员，享会员权益</view>
          <view class="text-color-primary" @tap="jumpLogin">立即加入</view>
        </view>
        <view class="row">
          <view class="grid">
            <image src="/static/images/mine/rhyl.png"></image>
            <view>入会有礼</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/jfdh.png"></image>
            <view>积分兑换</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/sjtq.png"></image>
            <view>升级特权</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/srtq.png"></image>
            <view>生日特权</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/nxbz.png"></image>
            <view>奈雪宝藏</view>
          </view>
        </view>
      </view>
      <image
        class="banner"
        src="/static/images/mine/banner.png"
        mode="widthFix"
      ></image>
    </view>
    <view class="service-box">
      <view class="service-content font-size-lg text-color-base">
        我的服务
      </view>
      <view class="row">
        <view class="grid">
          <view class="image">
            <image src="/static/images/mine/jfqd.png"></image>
          </view>
          <view>积分签到</view>
        </view>
        <view class="grid">
          <view class="image">
            <image src="/static/images/mine/stxy.png"></image>
          </view>
          <view>送她心愿</view>
          <image
            class="new-badage"
            src="/static/images/mine/stxy-new.png"
          ></image>
        </view>
        <view class="grid">
          <view class="image">
            <image src="/static/images/mine/nxsc.png"></image>
          </view>
          <view>奈雪商城</view>
        </view>
        <view class="grid">
          <view class="image">
            <image src="/static/images/mine/lxkf.png"></image>
          </view>
          <view>联系客服</view>
        </view>
        <view class="grid" @tap="jumpHistoryOrder">
          <view class="image">
            <image src="/static/images/mine/wddd.png"></image>
          </view>
          <view>我的订单</view>
        </view>
        <view class="grid">
          <view class="image">
            <image src="/static/images/mine/wdzl.png"></image>
          </view>
          <view>我的资料</view>
        </view>
        <view class="grid">
          <view class="image">
            <image src="/static/images/mine/shdz.png"></image>
          </view>
          <view>收货地址</view>
        </view>
        <view class="grid" @tap="jumpServices">
          <view class="image">
            <image src="/static/images/mine/gdfw.png"></image>
          </view>
          <view>更多服务</view>
        </view>
      </view>
    </view>
    <view class="hyk-tip d-flex just-content-center align-items-center">
      会员卡适用于奈雪的茶和奈雪酒屋指定范围
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import UserInfo from './user-info/UserInfo.vue';

export default defineComponent({
  name: 'MineView',
  components: {
    UserInfo
  },
  setup() {
    const $store = useStore();

    const isLogin = computed<boolean>(() => $store.getters.isLogin);
    const userInfo = computed(() => $store.getters.userInfo);

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

    function jumpLogin(): void {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    }

    // 跳转历史订单
    function jumpHistoryOrder(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/history-order/HistoryOrder'
      });
    }

    // 跳转更多服务
    function jumpServices(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.navigateTo({
        url: '/pages/mine/services/Services'
      });
    }

    return {
      isLogin,
      userInfo,
      jumpMemberCode,
      jumpLogin,
      jumpHistoryOrder,
      jumpServices
    };
  }
});
</script>

<style lang="scss" scoped>
@import './mine.scss';
</style>
