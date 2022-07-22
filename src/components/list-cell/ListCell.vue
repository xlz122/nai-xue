<template>
  <view
    class="tui-cell-class tui-list-cell"
    :class="{
      'tui-cell-arrow': arrow,
      'tui-cell-last': last,
      'tui-line-left': lineLeft,
      'tui-line-right': lineRight,
      'tui-radius': radius
    }"
    :hover-class="hover ? 'tui-cell-hover' : ''"
    :style="{
      background: bgcolor,
      fontSize: size + 'rpx',
      color: color,
      padding: padding
    }"
    :hover-stay-time="150"
    @tap="handleClick"
  >
    <slot></slot>
    <image
      src="/static/images/navigator-1.png"
      class="arrow"
      v-if="arrow"
    ></image>
    <!-- <view class="iconfont iconarrow-right arrow" v-if="arrow"></view> -->
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListCell',
  props: {
    // 是否有箭头
    arrow: {
      type: Boolean,
      default: false
    },
    // 是否有点击效果
    hover: {
      type: Boolean,
      default: true
    },
    // left 30rpx
    lineLeft: {
      type: Boolean,
      default: false
    },
    // right 30rpx
    lineRight: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: '26rpx 30rpx'
    },
    // 最后一条数据隐藏线条
    last: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    // 背景颜色
    bgcolor: {
      type: String,
      default: '#fff'
    },
    // 字体大小
    size: {
      type: Number,
      default: 28
    },
    // 字体颜色
    color: {
      type: String,
      default: '#5A5B5C'
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    function handleClick() {
      emit('click', { index: props.index });
    }

    return {
      handleClick
    };
  }
});
</script>

<style lang="scss" scoped>
@import './list-cell.scss';
</style>
