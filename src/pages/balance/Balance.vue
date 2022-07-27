<template>
  <view class="container bg-white w-100 h-100">
    <view style="padding-bottom: 220rpx">
      <view class="balance-info d-flex justify-content-between">
        <view
          class="d-flex flex-fill flex-column align-items-between justify-content-between"
        >
          <view class="font-size-sm text-color-base">账户余额（元）</view>
          <view class="font-size-extra-lg text-color-base font-weight-bold">
            {{ userInfo?.balance }}
          </view>
          <view class="font-size-sm text-color-primary">交易记录</view>
        </view>
        <image src="/static/images/balance/balance.png" mode="widthFix"></image>
      </view>
      <view
        class="font-size-lg text-color-base font-weight-bold"
        style="margin-bottom: 20rpx"
      >
        储值金额
      </view>

      <view class="d-flex flex-wrap justify-content-between amounts">
        <view
          class="d-flex align-items-center just-content-center amount bg-base text-color-base"
          :class="{ 'bg-primary text-color-white': recharge.index === index }"
          v-for="(item, index) in recharge.options"
          :key="index"
          @tap="handleSelected(index)"
        >
          <view class="font-size-extra-lg font-weight-bold">
            {{ parseInt(item?.value) }}
          </view>
          <view class="font-size-sm font-weight-light">元</view>
        </view>
      </view>

      <template v-if="recharge.options[recharge.index]?.desc">
        <view
          class="font-size-lg text-color-base font-weight-bold"
          style="margin-bottom: 20rpx"
        >
          使用说明
        </view>
        <view class="pre-line font-size-sm text-color-assist">
          {{ recharge.options[recharge.index]?.desc }}
        </view>
      </template>
      <!-- bottom box begin -->
      <view
        class="bottom-box position-fixed fixed-bottom w-100 d-flex flex-column bg-white"
      >
        <view
          class="protocol font-size-sm d-flex justify-content-start align-items-center"
        >
          <view
            class="iconfont line-height-100"
            :class="{
              'iconradio-button-on text-color-primary': agree,
              'iconradio-button-off text-color-base': !agree
            }"
            @tap="agreeChange"
          ></view>
          <view class="text-color-base">我已阅读并同意</view>
          <view class="text-color-primary">《储值协议》</view>
        </view>
        <button type="primary" class="b" @tap="rechargeBalace">购买</button>
      </view>
      <!-- bottom box end -->
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { onLoad } from '@dcloudio/uni-app';
import { rechargeList } from '@/api/balance';

type Recharge = {
  options: unknown[];
  index: number;
};

export default defineComponent({
  name: 'BalanceView',
  setup() {
    const $store = useStore();

    const userInfo = computed(() => $store.getters.userInfo);

    const recharge = reactive<Recharge>({
      options: [],
      index: 0
    });

    onLoad(() => {
      getRechargeList();
    });

    function getRechargeList(): void {
      rechargeList()
        .then(res => {
          recharge.options = res as Recharge['options'];
        })
        .catch(() => ({}));
    }

    function handleSelected(index: number): void {
      recharge.index = index;
    }

    // 协议
    const agree = ref<boolean>(false);

    function agreeChange(): void {
      agree.value = !agree.value;
    }

    // 充值
    function rechargeBalace() {
      if (!agree.value) {
        uni.showToast({
          title: '请先勾选储值协议',
          icon: 'none'
        });
        return false;
      }

      uni.showLoading({
        title: '正在充值...'
      });

      setTimeout(() => {
        uni.showToast({
          title: '充值成功',
          icon: 'success'
        });
      }, 1000);
    }

    return {
      userInfo,
      recharge,
      handleSelected,
      agree,
      agreeChange,
      rechargeBalace
    };
  }
});
</script>

<style lang="scss" scoped>
@import './balance.scss';
</style>
