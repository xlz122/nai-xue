<template>
  <view class="container">
    <!-- v-if="!Object.keys(order).length" -->
    <view
      class="d-flex w-100 h-100 flex-column just-content-center align-items-center"
    >
      <image class="drinks-img" src="/static/images/loading.gif"></image>
      <view
        class="tips d-flex flex-column align-items-center font-size-base text-color-assist"
      >
        <view>您还没有点单</view>
        <view>快去犒劳一下自己吧~</view>
      </view>
      <button class="drink-btn" type="primary" size="default" @tap="jumpDrink">
        去点餐
      </button>
      <view class="font-size-sm text-color-primary" @tap="jumpHistoryOrder">
        查看历史订单
      </view>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TakeFoods',
  setup() {
    const $store = useStore();

    const isLogin = computed<boolean>(() => $store.getters.isLogin);
    const orderList = computed(() => $store.getters.orderList);

    // 跳转菜单
    function jumpDrink(): void {
      uni.switchTab({
        url: '/pages/drink/drink'
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

    return {
      orderList,
      jumpDrink,
      jumpHistoryOrder
    };
  }
});
</script>

<style lang="scss" scoped>
@import './take-foods.scss';
</style>
