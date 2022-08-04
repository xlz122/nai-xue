<template>
  <view class="container">
    <view class="intro">
      <image src="/static/images/logo.png"></image>
      <view class="tips">
        一杯好茶，一口软欧包
        <br />
        在奈雪遇见两种美好
      </view>
    </view>
    <view class="bottom">
      <!-- #ifdef H5 -->
      <button class="login-btn" type="primary" size="default" @tap="login">
        登录
      </button>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <button class="login-btn" type="primary" size="default" @tap="login">
        登录
      </button>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button
        class="login-btn"
        type="primary"
        size="default"
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="getUserInfo"
      >
        <image src="/static/images/mine/wechat.png"></image>
        微信一键登录
      </button>
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      <button
        class="login-btn"
        type="primary"
        size="default"
        @getAuthorize="onGetAuthorize"
        @error="onAuthError"
        scope="userInfo"
        open-type="getAuthorize"
      >
        支付宝一键登录
      </button>
      <!-- #endif -->
      <view
        class="d-flex flex-column justify-content-evenly align-items-center text-center"
        style="height: 30vh"
      >
        <view class="w-100 font-size-base text-color-assist">
          新用户登录即加入会员，享会员权益
        </view>
        <view
          class="w-100 row d-flex just-content-around align-items-center font-size-sm text-color-assist"
        >
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
        <view class="font-size-base text-color-primary">会员权益说明</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { userinfo } from '@/api/user';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const $store = useStore();

    // h5 app登录
    function login(): void {
      userinfo()
        .then(res => {
          $store.commit('setUserInfo', res);

          // 返回上一页
          uni.navigateBack({ delta: 1 });
        })
        .catch(() => ({}));
    }

    // 微信登录
    async function getUserInfo(e: any): Promise<boolean | undefined> {
      const { errMsg, userInfo } = e.detail;

      // 授权失败使用h5用户信息
      if (errMsg !== 'getUserInfo:ok') {
        uni.showModal({
          title: '提示',
          content: '您取消了授权登录，请重新授权',
          showCancel: false
        });

        userinfo()
          .then(res => {
            $store.commit('setUserInfo', res);

            // 返回上一页
            uni.navigateBack({ delta: 1 });
          })
          .catch(() => ({}));
        return false;
      }

      userinfo()
        .then(res => {
          const member = Object.assign(res, {
            ...userInfo,
            avatarUrl: userInfo.avatar,
            nickName: userInfo.nickname
          });

          $store.commit('setUserInfo', member);

          // 返回上一页
          uni.navigateBack({ delta: 1 });
        })
        .catch(() => ({}));
    }

    return {
      login,
      getUserInfo
    };
  }
});
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
