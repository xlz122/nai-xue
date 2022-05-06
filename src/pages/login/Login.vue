<template>
  <view>登录</view>
  <view>{{ msg }}</view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const $store = useStore();

    const msg = computed(() => $store.getters.msg);

    return {
      msg
    };
  }
});
</script>
