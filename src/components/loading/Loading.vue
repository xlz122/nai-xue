<template>
  <view class="loading">
    <image src="/static/images/loading.gif"></image>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingView'
});
</script>

<style lang="scss" scoped>
@import './loading.scss';
</style>
