<template>
  <view>登录</view>
  <view>{{ isLogin }}</view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const $store = useStore();

    const isLogin = computed(() => $store.getters.isLogin);

    return {
      isLogin
    };
  }
});
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
