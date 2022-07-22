<template>
  <view class="container w-100 h-100" v-if="!loading">
    <view
      class="d-flex flex-column w-100"
      style="padding: 30rpx; padding-bottom: -34rpx; margin-bottom: 150rpx"
    >
      <view
        class="d-flex align-items-center bg-white"
        style="
          padding: 30rpx;
          height: 220rpx;
          margin-bottom: 34rpx;
          border-radius: 8rpx;
        "
        v-for="(item, index) in list"
        :key="index"
        @tap="pay(item)"
      >
        <image
          :src="item?.image"
          style="width: 200rpx; height: 160rpx; margin-right: 20rpx"
        ></image>
        <view
          class="d-flex flex-fill flex-column justify-content-between"
          style="height: 160rpx"
        >
          <view class="font-size-lg text-color-base">{{ item?.title }}</view>
          <view class="d-flex justify-content-between align-items-center">
            <view class="font-size-sm">￥{{ item?.amount }}</view>
            <button type="primary" size="mini" plain class="pay-btn">
              去购买
            </button>
          </view>
        </view>
      </view>
    </view>
    <view
      class="d-flex bg-base fixed-bottom text-color-primary align-items-center just-content-center ply-records"
      style="height: 150rpx"
      @tap="payRecords"
    >
      <text>购买记录</text>
    </view>
  </view>
  <loading v-else></loading>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref } from 'vue';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { packages } from '@/api/packages';
import Loading from '@/components/loading/Loading.vue';

export default defineComponent({
  name: 'PackagesView',
  components: {
    Loading
  },
  setup() {
    const loading = ref<boolean>(false);
    const list = ref<unknown>([]);

    onLoad(() => {
      getPackages();
    });

    // 上拉刷新
    onPullDownRefresh(() => {
      getPackages();
    });

    function getPackages(): void {
      loading.value = true;

      packages()
        .then(res => {
          loading.value = false;

          list.value = res;

          // 停止下拉刷新动画
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 500);
        })
        .catch(() => ({}));
    }

    function pay(item: unknown): void {
      uni.setStorageSync('packages', item);

      uni.navigateTo({
        url: '/pages/index/package-detail/PackageDetail'
      });
    }

    function payRecords(): void {
      uni.showToast({
        title: '购买记录',
        icon: 'none'
      });
    }

    return {
      loading,
      list,
      pay,
      payRecords
    };
  }
});
</script>

<style lang="scss" scoped>
@import './packages.scss';
</style>
