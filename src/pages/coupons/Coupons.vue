<template>
  <view class="container position-relative w-100 h-100 overflow-hidden">
    <view class="exchange-box">
      <view class="input-box">
        <input
          type="text"
          v-model="exchangeCode"
          placeholder="请输入兑换码"
          placeholder-class="text-color-assist font-size-base"
        />
        <button type="primary" @tap="exchange">兑换</button>
      </view>
      <view
        class="font-size-sm text-color-primary line-height-2"
        @tap="tip('查看兑换规则')"
      >
        查看兑换规则
      </view>
    </view>
    <view class="tabbar">
      <view
        class="tab"
        :class="{ active: tab.active == index }"
        v-for="(item, index) in tab.options"
        :key="index"
        @tap="handleTab(index)"
      >
        <view class="title">{{ item?.title }}</view>
      </view>
    </view>
    <view class="flex-fill">
      <scroll-view class="coupon-list" scroll-y>
        <view class="wrapper">
          <view
            class="coupon"
            v-for="(item, index) in coupons"
            :key="index"
            @tap="openDetailModal(item)"
          >
            <view class="d-flex align-items-center detail">
              <image class="coupon-img" :src="item?.imageUrl"></image>
              <view
                class="flex-fill d-flex flex-column just-content-center overflow-hidden"
              >
                <view class="font-size-lg text-color-base text-truncate mb-10">
                  {{ item?.title }}
                </view>
                <view class="font-size-sm text-color-base">
                  有效期至{{ item?.endAt }}
                </view>
              </view>
            </view>
            <view
              class="d-flex align-items-center justify-content-end"
              style="height: 80rpx"
            >
              <view class="font-size-sm text-color-primary">查看详情</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view
      class="bottom-box d-flex align-items-center just-content-center font-size-sm text-color-primary"
    >
      <view class="item" @tap="tip('历史卡券')">历史卡券</view>
      <view class="item" @tap="tip('赠送记录')">赠送记录</view>
      <view class="item" @tap="tip('第三方权益')">第三方权益</view>
    </view>
    <modal custom :show="coupon.visible" @cancel="closeDetailModal" width="90%">
      <view class="modal-content">
        <view
          class="d-flex font-size-extra-lg text-color-base just-content-center mb-20"
        >
          {{ coupon?.detail?.title }}
        </view>
        <view class="d-flex font-size-sm text-color-base mb-20">
          有效期：{{ coupon?.detail?.beginAt }}至{{ coupon?.detail?.endAt }}
        </view>
        <view class="pre-line font-size-sm text-color-assist mb-30">
          {{ coupon?.detail?.couponExplain }}
        </view>
        <view class="d-flex align-items-center just-content-center">
          <button type="primary" @tap="useCoupon" class="use-coupon-btn">
            立即使用
          </button>
        </view>
      </view>
    </modal>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getcoupons } from '@/api/coupons';
import Modal from '@/components/modal/Modal.vue';

type Tab = {
  options: { title: string; value: string }[];
  active: number;
};

export default defineComponent({
  name: 'CouponsView',
  components: {
    Modal
  },
  setup() {
    const exchangeCode = ref<string>('');
    // 兑换
    function exchange(): boolean | undefined {
      if (!exchangeCode.value) {
        uni.showToast({
          title: '请输入兑换码',
          icon: 'none'
        });
        return false;
      }

      uni.showToast({
        title: '兑换失败，兑换码无效',
        icon: 'none'
      });
    }

    const tab = reactive<Tab>({
      options: [
        { title: '全部', value: 'all' },
        { title: '茶饮券', value: '1' },
        { title: '酒屋券', value: '2' }
      ],
      active: 0
    });

    function handleTab(index: number): void {
      tab.active = index;

      getCoupons(tab.options[index].value);
    }

    // 奈雪券数据
    const coupons = ref<unknown[]>([]);

    function getCoupons(type: string): void {
      getcoupons()
        .then(res => {
          if (type === 'all') {
            coupons.value = res as unknown[];
            return false;
          }

          coupons.value = (res as { couponType: number }[]).filter(
            item => item.couponType === Number(type)
          );
        })
        .catch(() => ({}));
    }

    onLoad(() => {
      getCoupons('all');
    });

    // 详情
    const coupon = reactive<{ visible: boolean; detail: unknown }>({
      visible: false,
      detail: {}
    });

    function openDetailModal(item: unknown): void {
      coupon.detail = item;
      coupon.visible = true;
    }

    function closeDetailModal(): void {
      coupon.detail = {};
      coupon.visible = false;
    }

    function useCoupon(): void {
      uni.showToast({
        title: '立即使用',
        icon: 'none'
      });
    }

    function tip(title: string): void {
      uni.showToast({
        title,
        icon: 'none'
      });
    }

    return {
      exchangeCode,
      exchange,
      tab,
      handleTab,
      coupons,
      coupon,
      openDetailModal,
      closeDetailModal,
      useCoupon,
      tip
    };
  }
});
</script>

<style lang="scss" scoped>
@import './coupons.scss';
</style>
