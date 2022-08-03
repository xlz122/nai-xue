<template>
  <view
    class="position-absolute"
    :style="{
      zIndex: 99,
      height: style?.height + 'px',
      top: style?.top + 'px',
      left: style?.left + 'px'
    }"
    @tap="handleClick"
  >
    <image
      src="/static/images/back.png"
      :style="{ height: style?.height + 'px', width: style?.height + 'px' }"
    ></image>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'NavbarBackButton',
  setup() {
    const style = reactive({
      top: 0,
      left: 0,
      height: 0
    });

    //#ifdef MP-WEIXIN
    const { height, right, top } = uni.getMenuButtonBoundingClientRect();
    const { windowWidth } = uni.getSystemInfoSync();

    style.top = top;
    style.left = windowWidth - right;
    style.height = height;
    //#endif

    //#ifndef MP-WEIXIN
    style.height = 32;
    style.top = 26;
    style.left = 10;
    //#endif

    function handleClick(): void {
      uni.navigateBack({ delta: 1 });
    }

    return {
      style,
      handleClick
    };
  }
});
</script>

<style lang="scss" scoped>
// 隐藏支付宝自带返回
/*  #ifdef MP-ALIPAY  */
.position-absolute {
  display: none;
}
/*  #endif  */
</style>
