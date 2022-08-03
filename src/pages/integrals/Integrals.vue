<template>
  <view class="container">
    <navbar-back-button></navbar-back-button>
    <view class="header">
      <image src="/static/images/integrals/bg.png" mode="scaleToFill"></image>
      <view class="sign-in-info">
        <view class="left">
          <view class="d-flex align-items-baseline" @tap="jumpIntegralsFlow">
            <image
              class="integral-icon"
              src="/static/images/integrals/integral.png"
            ></image>
            <view class="number">{{ userInfo?.pointNum }}</view>
            <view class="font-size-base">积分</view>
            <view class="iconfont iconarrow-right line-height-100"></view>
          </view>
        </view>
        <view class="right"> 兑换记录 </view>
      </view>
    </view>
    <view style="padding: 0 30rpx">
      <view class="sign-in-box">
        <view
          class="text-color-base font-weight-bold font-size-lg"
          style="margin: 20rpx 0"
        >
          连续签到赚积分
        </view>
        <uni-steps
          :active="steps.activeDay"
          :options="steps.options"
        ></uni-steps>
        <view
          class="d-flex flex-column align-items-center just-content-center"
          style="margin: 20rpx 0"
        >
          <button
            type="primary"
            class="sign-in-btn"
            :class="userInfo?.isAttendance ? 'attendance-active-btn' : ''"
            @tap="jumpAttendance"
          >
            {{ attendanceText }}
          </button>
          <view
            class="font-size-base text-color-primary"
            style="margin-top: 20rpx"
          >
            查看签到日历
          </view>
        </view>
      </view>

      <view class="banner">
        <image
          src="https://images.qmai.cn/s23107/2020/04/30/aed6cdb1db4712f87e.png"
          mode="widthFix"
        ></image>
      </view>
      <!-- 积分商品列表 begin -->
      <view
        clas="d-flex flex-column"
        v-for="(items, cate) in pointsMall"
        :key="cate"
      >
        <view class="d-flex justify-content-between align-items-center mb-30">
          <view class="font-size-lg text-color-base">{{ cate }}</view>
          <image
            src="/static/images/navigator.png"
            style="width: 40rpx; height: 40rpx"
          ></image>
        </view>
        <view class="d-flex flex-wrap justify-content-between">
          <block v-for="(item, key) in items" :key="key">
            <view
              class="d-flex bg-white flex-column align-items-stretch point-box"
              @tap="jumpIntegralsDetail(cate, item?.id)"
            >
              <image
                :src="
                  item?.img?.length
                    ? item.img[0]
                    : '/static/images/integrals/ticket.png'
                "
                class="w-100"
                mode="widthFix"
              ></image>
              <view class="d-flex flex-column overflow-hidden">
                <view
                  class="font-size-lg text-color-base text-truncate font-weight-bold"
                  style="margin-bottom: 10rpx"
                >
                  {{ item?.goods_name }}
                </view>
                <view class="d-flex align-items-center">
                  <view class="d-flex align-items-baseline">
                    <view class="font-size-base text-color-primary mr-10">
                      {{ item?.points_price }}
                    </view>
                    <view class="font-size-sm text-color-assist">积分</view>
                  </view>
                  <view
                    v-if="item?.amount > 0"
                    class="d-flex align-items-center font-size-sm text-color-assist"
                    style="margin: 0 10rpx"
                  >
                    +
                  </view>
                  <view
                    v-if="item?.amount > 0"
                    class="d-flex align-items-baseline"
                  >
                    <view class="font-size-base text-color-primary mr-10">
                      {{ parseFloat(item?.amount) }}
                    </view>
                    <view class="font-size-sm text-color-assist">元</view>
                  </view>
                </view>
                <view class="font-size-sm text-color-assist">
                  剩余{{ item?.goods_stock }}件
                </view>
              </view>
            </view>
          </block>
        </view>
      </view>
      <!-- 积分商品列表 end -->
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { onLoad } from '@dcloudio/uni-app';
import { pointsMallList } from '@/api/points-mall';
import { attendanceList } from '@/api/attendance';
import type { Attendance } from '@/api/attendance';
import NavbarBackButton from '@/components/navbar-back-button/NavbarBackButton.vue';
import UniSteps from '@/components/uni-steps/UniSteps.vue';

type Steps = {
  options: unknown[];
  activeDay: number;
};

type StepsOptions = {
  title: string;
  desc: string;
  circle?: string;
  circleStyle?: string;
};

export default defineComponent({
  name: 'IntegralsView',
  components: {
    NavbarBackButton,
    UniSteps
  },
  setup() {
    const $store = useStore();

    const userInfo = computed(() => $store.getters.userInfo);

    const pointsMall = ref<unknown>({});

    // 获取积分商品列表
    function getPointsMall(): void {
      pointsMallList()
        .then(res => {
          pointsMall.value = res;
        })
        .catch(() => ({}));
    }

    const steps = reactive<Steps>({
      options: [],
      activeDay: 0
    });

    async function getStepsOptions(): Promise<void> {
      const stepsOptions: StepsOptions[] = [];

      const attendance: Attendance[] = await attendanceList();

      attendance.forEach((item: Attendance, index: number) => {
        if (item.is_day) {
          steps.activeDay = index;
        }

        const arr: StepsOptions = {
          title: item.day_name + '天',
          desc: '+' + item.points
        };
        if (index === attendance.length - 1) {
          arr.circle = '/static/images/integrals/goal.png';
          arr.circleStyle = 'width: 47rpx; height: 39rpx;';
        }

        stepsOptions.push(arr);
      });

      steps.options = stepsOptions;
    }

    onLoad(() => {
      getPointsMall();
      getStepsOptions();
    });

    // 跳转积分明细
    function jumpIntegralsFlow(): void {
      uni.navigateTo({
        url: '/pages/integrals/flow/Flow'
      });
    }

    const attendanceText = ref<string>('签到');

    // 跳转签到
    function jumpAttendance(): boolean | undefined {
      if (userInfo.value.isAttendance) {
        return false;
      }

      uni.navigateTo({
        url: '/pages/attendance/attendance'
      });
    }

    // 跳转商品详情
    function jumpIntegralsDetail(cate: number, id: number): void {
      uni.navigateTo({
        url: `pages/integrals/detail?cate=${cate}&id=${id}`
      });
    }

    return {
      userInfo,
      pointsMall,
      steps,
      attendanceText,
      jumpIntegralsFlow,
      jumpAttendance,
      jumpIntegralsDetail
    };
  }
});
</script>

<style lang="scss" scoped>
@import './integrals.scss';
</style>
