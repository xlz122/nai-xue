<template>
  <view class="container">
    <text>{{ title }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexView',
  setup() {
    const title = ref<string>('Hello World');

    return {
      title
    };
  }
});
</script>

<style>
@import './index.scss';
</style>
