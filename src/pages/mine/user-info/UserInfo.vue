<template>
  <view class="d-flex flex-column bg-white user-box">
    <view class="d-flex align-items-center">
      <view class="avatar">
        <image
          :src="isLogin ? userInfo?.avatar : '/static/images/mine/default.jpg'"
          @tap="avatarChange"
        ></image>
        <view class="badge" v-if="isLogin">
          <image src="/static/images/mine/level.png"></image>
          <view>{{ userInfo?.memberLevel }}</view>
        </view>
      </view>
      <view class="d-flex flex-column flex-fill overflow-hidden title-tip">
        <view
          v-if="isLogin"
          class="font-size-lg font-weight-bold d-flex justify-content-start align-items-center"
        >
          <view class="text-truncate">{{ userInfo?.nickname }}</view>
          <view class="iconfont iconarrow-right line-height-100"></view>
        </view>
        <view v-else class="font-size-lg font-weight-bold" @tap="jumpLogin">
          请点击授权登录
        </view>
        <view class="font-size-sm text-color-assist">
          当前成长值
          {{ isLogin ? userInfo?.currentValue : 0 }}
          /
          {{ isLogin ? userInfo?.currentValue + userInfo?.needValue : 0 }}
        </view>
        <view class="w-100">
          <progress
            :percent="
              isLogin
                ? (userInfo.currentValue /
                    (userInfo.currentValue + userInfo.needValue)) *
                  100
                : 0
            "
            activeColor="#ADB838"
            height="8rpx"
            border-radius="8rpx"
          />
        </view>
      </view>
      <view
        class="level-benefit flex-shrink-0 text-color-white bg-warning font-size-sm"
      >
        <view>会员权益</view>
        <view class="iconfont iconarrow-right line-height-100"></view>
      </view>
    </view>
    <view class="w-100 d-flex align-items-center just-content-center">
      <view class="user-grid" @tap="jumpCoupons">
        <view class="value font-size-extra-lg font-weight-bold text-color-base">
          {{ isLogin ? userInfo?.couponNum : '***' }}
        </view>
        <view class="font-size-sm text-color-assist">奈雪券</view>
      </view>
      <view class="user-grid" @tap="jumpIntegrals">
        <view class="value font-size-extra-lg font-weight-bold text-color-base">
          {{ isLogin ? userInfo?.pointNum : '***' }}
        </view>
        <view class="font-size-sm text-color-assist">积分商城</view>
      </view>
      <view class="user-grid" @tap="jumpBalance">
        <view class="value font-size-extra-lg font-weight-bold text-color-base">
          {{ isLogin ? userInfo?.balance : '***' }}
        </view>
        <view class="font-size-sm text-color-assist">余额</view>
      </view>
      <view class="user-grid" @tap="jumpGiftCard">
        <view class="value font-size-extra-lg font-weight-bold text-color-base">
          {{ isLogin ? userInfo?.giftBalance : '***' }}
        </view>
        <view class="font-size-sm text-color-assist">礼品卡</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const $store = useStore();

    const isLogin = computed<boolean>(() => $store.getters.isLogin);
    const userInfo = computed(() => $store.getters.userInfo);

    const avatarList = ref<string[]>([]);

    // 更换头像
    function avatarChange(): boolean | undefined {
      if (!isLogin.value) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
        return false;
      }

      uni.showActionSheet({
        itemList: ['查看头像', '从相册选择图片', '拍照'],
        success: res => {
          if (res.tapIndex === 0) {
            previewImage();
          } else if (res.tapIndex === 1) {
            chooseImage();
          } else if (res.tapIndex === 2) {
            chooseShot();
          }
        }
      });
    }

    // 查看头像
    function previewImage(): void {
      uni.previewImage({
        current: avatarList.value[0],
        urls: avatarList.value
      });
    }

    // 从相册选择图片
    function chooseImage(): void {
      uni.chooseImage({
        // 图片选择数量，默认9
        count: 1,
        // original 原图，compressed 压缩图，默认二者都有
        sizeType: ['original', 'compressed'],
        // album 从相册选图，camera 使用相机，默认二者都有
        sourceType: ['album', 'camera'],
        success: res => {
          // 图片本地文件路径列表
          const tempFilePaths = res.tempFilePaths;
          // 保存文件到本地
          uni.saveFile({
            tempFilePath: tempFilePaths[0],
            success: res => {
              // 替换头像路径
              avatarList.value[0] = res.savedFilePath;
              // setAvatar(res.savedFilePath);
            }
          });
        }
      });
    }

    // 拍照
    function chooseShot(): void {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera'],
        success: res => {
          const tempFilePaths = res.tempFilePaths;
          uni.saveFile({
            tempFilePath: tempFilePaths[0],
            success: res => {
              avatarList.value[0] = res.savedFilePath;
              // setAvatar(res.savedFilePath);
            }
          });
        }
      });
    }

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

    function jumpLogin(): void {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    }

    return {
      isLogin,
      userInfo,
      avatarChange,
      jumpCoupons,
      jumpIntegrals,
      jumpBalance,
      jumpGiftCard,
      jumpLogin
    };
  }
});
</script>

<style lang="scss" scoped>
@import './user-info.scss';
</style>
