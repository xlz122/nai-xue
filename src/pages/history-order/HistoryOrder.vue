<template>
  <view class="container">
    <view
      class="orders-list d-flex flex-column w-100"
      style="padding: 20rpx; padding-bottom: 0"
    >
      <view
        class="order-item item-content"
        v-for="(item, index) in historyOrder"
        :key="index"
        @tap="jumpOrderDetail(item?.id)"
      >
        <list-cell :hover="false">
          <view class="w-100 d-flex align-items-center">
            <view class="flex-fill d-flex flex-column">
              <view class="font-size-lg text-color-base item-name">
                {{ item?.store?.name }}
              </view>
              <view class="font-size-sm text-color-assist">
                订单编号：{{ item?.order_no }}
              </view>
            </view>
            <view class="font-size-lg text-color-primary">
              {{ item?.status_text }}
            </view>
          </view>
        </list-cell>
        <list-cell :hover="false" last>
          <view class="w-100 d-flex flex-column">
            <view
              class="w-100 text-truncate font-size-lg text-color-base"
              style="margin-bottom: 20rpx"
            >
              <text v-for="(i, ind) in item?.goods" :key="ind">
                <text>{{ i?.name + '*' + i?.number }}</text>
                <text v-if="ind !== item?.goods.length - 1">,</text>
              </text>
            </view>
            <view
              class="d-flex justify-content-between align-items-center"
              style="margin-bottom: 30rpx"
            >
              <view class="font-size-sm text-color-assist">
                {{ item?.completed_time }}
              </view>
              <view
                class="d-flex font-size-sm text-color-base align-items-center"
              >
                <view style="margin-right: 10rpx">
                  共{{ item?.goods_num }}件商品，实付
                </view>
                <view class="font-size-lg">￥{{ item?.amount }}</view>
              </view>
            </view>
            <view class="d-flex align-items-center justify-content-end">
              <view style="margin-right: 10rpx">
                <button
                  v-if="item?.invoice_status > 0"
                  type="primary"
                  plain
                  size="mini"
                >
                  查看发票
                </button>
                <button v-else type="primary" plain size="mini">开发票</button>
              </view>
              <view @tap.stop="jumpReview(item)">
                <button type="primary" plain size="mini">去评价</button>
              </view>
            </view>
          </view>
        </list-cell>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { historyorder } from '@/api/history-order';
import ListCell from '@/components/list-cell/ListCell.vue';

export default defineComponent({
  name: 'HistoryOrder',
  components: {
    ListCell
  },
  setup() {
    const $store = useStore();

    const isLogin = computed<boolean>(() => $store.getters.isLogin);
    const historyOrder = computed(() => $store.getters.historyOrder);

    onLoad(() => {
      getHistoryOrders();
    });

    // 上拉加载
    onReachBottom(() => {
      getHistoryOrders();
    });

    // 下拉刷新
    onPullDownRefresh(() => {
      getHistoryOrders();
    });

    // 获取历史订单
    function getHistoryOrders() {
      uni.showLoading({
        title: '加载中'
      });

      historyorder()
        .then(res => {
          $store.commit('setHistoryOrder', res);

          setTimeout(() => {
            uni.stopPullDownRefresh();
            uni.hideLoading();
          }, 500);
        })
        .catch(() => ({}));
    }

    // 跳转订单详情
    function jumpOrderDetail(id: number): void {
      uni.navigateTo({
        url: `/pages/history-order/order-detail/OrderDetail?id=${id}`
      });
    }

    // 跳转评价
    function jumpReview(item: {
      store: { name: string };
      completed_time: string;
      typeCate: string;
    }): void {
      const storename = item?.store?.name || '';
      const date = item?.completed_time?.split(' ')[0] || '';
      const typeCate = item?.typeCate || '';

      uni.navigateTo({
        url: `/pages/history-order/review/Review?storename=${storename}&typeCate=${typeCate}&date=${date}`
      });
    }

    return {
      isLogin,
      historyOrder,
      jumpOrderDetail,
      jumpReview
    };
  }
});
</script>

<style lang="scss" scoped>
@import './history-order.scss';
</style>
