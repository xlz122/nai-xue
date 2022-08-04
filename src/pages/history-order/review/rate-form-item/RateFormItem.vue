<template>
  <list-cell :hover="false" last class="w-100 d-flex align-items-baseline">
    <view class="font-size-extra-lg text-color-primary mr-40">{{ label }}</view>
    <view class="flex-fill d-flex flex-column">
      <view class="d-flex align-items-center mb-20">
        <view
          class="iconfont score"
          v-for="(item, index) in 5"
          :key="index"
          @tap="handleScoreClick(index)"
          :class="[value > index ? 'iconshoucangfill' : 'iconshoucang']"
          :style="{ opacity: value <= index || !value ? 1 : value / 5 + 0.1 }"
        >
        </view>
      </view>
      <view class="font-size-base text-color-base">{{ tips }}</view>
    </view>
  </list-cell>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListCell from '@/components/list-cell/ListCell.vue';

export default defineComponent({
  name: 'RateFormItem',
  components: {
    ListCell
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  setup(props, { emit }) {
    function handleScoreClick(index: number): void {
      emit('input', index + 1);
    }

    return {
      handleScoreClick
    };
  }
});
</script>

<style lang="scss" scoped>
.score {
  font-size: 56rpx;
  color: #ccc;
  margin-right: 20rpx;

  &.iconshoucangfill {
    color: $color-warning;
  }
}
</style>
