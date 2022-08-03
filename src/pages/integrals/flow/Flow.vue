<template>
  <view class="container">
    <view
      class="masthead d-flex flex-column just-content-center align-items-center"
    >
      <view class="point-num">{{ userInfo?.pointNum }}</view>
      <view class="font-size-sm text-color-primary">查看积分规则</view>
    </view>
    <view>
      <list-cell
        v-for="(item, index) in pointsFlow"
        :key="index"
        :hover="false"
        bgcolor="#F5F9FB"
      >
        <view class="w-100 d-flex align-items-center">
          <view class="flex-fill d-flex flex-column">
            <view class="font-size-lg text-color-base mb-10">
              {{ item?.reason }}
            </view>
            <view class="font-size-base text-color-assist">
              {{ item?.createdAt }}
            </view>
          </view>
          <view class="d-flex flex-column align-items-center">
            <view class="font-size-lg text-color-base font-weight-bold">
              {{ item?.changeType == 1 ? '+' : '-' }}
              {{ item?.changeNum }}
            </view>
            <view class="font-size-sm text-color-assist">
              {{ item?.sellerName }}
            </view>
          </view>
        </view>
      </list-cell>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { onLoad } from '@dcloudio/uni-app';
import { flowList } from '@/api/points-flow';
import ListCell from '@/components/list-cell/ListCell.vue';

export default defineComponent({
  name: 'FlowView',
  components: {
    ListCell
  },
  setup() {
    const $store = useStore();

    const userInfo = computed(() => $store.getters.userInfo);

    const pointsFlow = ref<unknown>({});

    function getFlowList(): void {
      flowList()
        .then(res => {
          pointsFlow.value = res;
        })
        .catch(() => ({}));
    }

    onLoad(() => {
      getFlowList();
    });

    return {
      userInfo,
      pointsFlow
    };
  }
});
</script>

<style lang="scss" scoped>
@import './flow.scss';
</style>
