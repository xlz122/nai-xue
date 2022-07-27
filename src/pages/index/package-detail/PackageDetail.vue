<template>
  <view class="w-100 h-100">
    <image class="w-100" :src="packages?.image" style="height: 50vh"></image>
    <view style="padding: 30rpx 40rpx; padding-bottom: 100rpx">
      <view
        class="d-flex justify-content-between align-items-center"
        style="margin-bottom: 20rpx"
      >
        <view class="font-size-lg">{{ packages?.title }}</view>
        <view class="text-color-primary font-size-sm" @tap="payRecords">
          购买记录
        </view>
      </view>
      <view class="text-color-assist font-size-sm" style="margin-bottom: 20rpx">
        共{{ couponNum }}张优惠券
      </view>
      <!-- 优惠券列表 begin -->
      <view class="d-flex flex-column w-100">
        <view
          class="coupon d-flex flex-column bg-white"
          v-for="(item, index) in packages?.coupons"
          :key="index"
          @tap="openDetailModal(item)"
        >
          <view
            class="d-flex flex-fill overflow-hidden"
            style="margin-bottom: 20rpx"
          >
            <image
              :src="item?.detail?.image"
              style="margin-right: 40rpx; width: 150rpx; height: 150rpx"
            ></image>
            <view
              class="flex-fill flex-column justify-content-start overflow-hidden"
            >
              <view class="text-right text-color-assist">
                x{{ item?.coupon_num }}
              </view>
              <view
                class="text-truncate font-size-extra-lg text-color-base w-80"
              >
                {{ item?.detail?.coupon_title }}
              </view>
              <view class="font-size-sm text-color-assist">
                {{ item?.detail?.expire }}
              </view>
            </view>
          </view>
          <view
            class="bottom d-flex font-size-sm justify-content-between align-items-center"
          >
            <view class="text-color-assist">
              使用时段:
              {{ item.detail?.coupon_use_time[0]?.use_time_start }}
              -
              {{ item?.detail?.coupon_use_time[0]?.use_time_end }}
            </view>
            <view class="text-color-primary"> 查看详情 </view>
          </view>
        </view>
      </view>
      <!-- 优惠券列表 end -->
      <view class="font-size-extra-lg" style="margin-bottom: 40rpx">
        购买须知
      </view>
      <view class="font-size-base text-color-base">
        售卖时间:
        {{ packages?.start_at && packages?.start_at?.split('')[0] }}
        ~
        {{ packages?.end_at && packages?.end_at?.split('')[0] }}
      </view>
      <view class="font-size-base text-color-base" style="margin-bottom: 30rpx">
        购买限制：无限制
      </view>
      <view class="font-size-sm text-color-assist pre-line">
        {{ packages?.content }}
      </view>
    </view>
    <view
      class="pay-box d-flex just-content-center align-items-center position-fixed fixed-bottom bg-white"
    >
      <button
        type="primary"
        class="pay-btn font-size-base text-color-white rounded-pill"
        style="width: 90%; height: 80rpx; line-height: 80rpx"
        @tap="pay"
      >
        ￥{{ packages?.amount }}购买
      </button>
    </view>
    <modal custom :show="detailModal.visible" @cancel="closeDetailModal">
      <view class="d-flex flex-column">
        <view
          class="text-center font-size-extra-lg text-color-base"
          style="margin-bottom: 30rpx"
        >
          {{ detailModal?.coupon?.detail?.coupon_title }}
        </view>
        <view
          class="text-center font-size-sm text-color-assist"
          style="margin-bottom: 40rpx"
        >
          {{ detailModal?.coupon?.detail?.expire }}
        </view>
        <view class="text-color-assist font-size-sm pre-line">
          {{ detailModal?.coupon?.detail?.desc }}
        </view>
      </view>
    </modal>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { onLoad } from '@dcloudio/uni-app';
import Modal from '@/components/modal/Modal.vue';

type Packages = {
  amount?: number | string;
  coupons?: {
    coupon_num: number;
  }[];
};

export default defineComponent({
  name: 'PackagesDetail',
  components: {
    Modal
  },
  setup() {
    const $store = useStore();

    const userInfo = computed<{ balance: number | string }>(
      () => $store.getters.userInfo
    );

    const packages = ref<Omit<Packages, 'amount'>>({});

    const couponNum = computed(() => {
      return packages.value?.coupons?.reduce(
        (total: number, coupon) => total + coupon.coupon_num,
        0
      );
    });

    onLoad(() => {
      packages.value = uni.getStorageSync('packages') || {};
    });

    function payRecords(): void {
      uni.showToast({
        title: '购买记录',
        icon: 'none'
      });
    }

    function pay(): boolean | undefined {
      // 余额不足
      if (
        Number(userInfo.value.balance) <
        Number((packages.value as Packages)?.amount)
      ) {
        uni.showToast({
          title: '余额不足',
          icon: 'none'
        });

        setTimeout(() => {
          jumpBalance();
        }, 1500);
        return false;
      }

      uni.showLoading({
        title: '购买中...'
      });

      setTimeout(() => {
        uni.showToast({
          title: '购买成功',
          icon: 'success'
        });
      }, 500);
    }

    // 跳转余额储值
    function jumpBalance(): void {
      uni.navigateTo({
        url: '/pages/balance/Balance'
      });
    }

    const detailModal = reactive<{ visible: boolean; coupon: unknown }>({
      visible: false,
      coupon: {}
    });

    function openDetailModal(coupon: unknown): void {
      detailModal.coupon = coupon;
      detailModal.visible = true;
    }

    function closeDetailModal(): void {
      detailModal.visible = false;
    }

    return {
      packages,
      couponNum,
      payRecords,
      pay,
      detailModal,
      openDetailModal,
      closeDetailModal
    };
  }
});
</script>

<style lang="scss" scoped>
@import './package-detail.scss';
</style>
