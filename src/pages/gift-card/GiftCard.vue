<template>
  <view class="container">
    <view class="tabbar">
      <view class="item" :class="{ active: tab === 0 }" @tap="switchTab(0)">
        购买礼品卡
      </view>
      <view class="item" :class="{ active: tab === 1 }" @tap="switchTab(1)">
        我的礼品卡
      </view>
    </view>
    <swiper class="swiper" :current="tab" :duration="400" :disable-touch="true">
      <!-- 购买礼品卡 begin -->
      <swiper-item class="swiper-item-1" @touchmove.stop="true">
        <scroll-view
          class="h-100"
          scroll-y="true"
          style="padding-bottom: 80rpx"
        >
          <image class="w-100" :src="giftCards?.img" mode="widthFix" />
          <view class="pl-20 pr-20 mb-30">
            <view
              class="category-list mt-40"
              v-for="(item, index) in giftCards?.category_list"
              :key="index"
            >
              <view class="font-size-lg font-weight-bold">
                {{ item?.name }}
              </view>
              <view class="themes-list">
                <view
                  class="theme"
                  v-for="(theme, key) in item?.themesList"
                  :key="key"
                  @tap="giftCardPurchase(theme?.activityName)"
                >
                  <image
                    class="w-100"
                    :src="theme?.imageUrls"
                    mode="widthFix"
                  />
                  <view class="activity-name">{{ theme?.activityName }}</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="footer">
          <view @tap="explain">购买须知</view>
          <view class="divider"></view>
          <view @tap="constitution">礼品卡章程</view>
        </view>
      </swiper-item>
      <!-- 购买礼品卡 end -->
      <!-- 我的礼品卡 begin -->
      <swiper-item class="swiper-item-2" @touchmove.stop="true">
        <view class="header">
          <view class="gift-card-types">
            <view
              class="item"
              :class="{ active: myCardTab === 0 }"
              @tap="switchMyCardTab(0)"
            >
              可使用(0)
            </view>
            <view
              class="item"
              :class="{ active: myCardTab === 1 }"
              @tap="switchMyCardTab(1)"
            >
              不可使用(0)
            </view>
          </view>
          <view
            class="d-flex align-items-center text-color-primary"
            @tap="exchange"
          >
            兑换礼品卡
          </view>
        </view>
        <swiper
          class="flex-fill"
          :current="myCardTab"
          :duration="400"
          @change="e => switchMyCardTab(e?.detail?.current)"
        >
          <swiper-item>
            <template v-if="!myCards.length">
              <view class="d-flex flex-column align-items-center">
                <image
                  src="https://img-shop.qmimg.cn/s16/images/2020/01/11/c1214fe339279c49.png"
                  mode="widthFix"
                  style="width: 300rpx; margin-top: 100rpx"
                />
                <view class="font-size-sm text-color-assist">
                  您暂时还没有礼品卡哦~
                </view>
              </view>
            </template>
          </swiper-item>
          <swiper-item>
            <template v-if="!myCards.length">
              <view class="d-flex flex-column align-items-center">
                <image
                  src="https://img-shop.qmimg.cn/s16/images/2020/01/11/c1214fe339279c49.png"
                  mode="widthFix"
                  style="width: 300rpx; margin-top: 100rpx"
                />
                <view class="font-size-sm text-color-assist">
                  您暂时还没有礼品卡哦~
                </view>
              </view>
            </template>
          </swiper-item>
        </swiper>
        <view class="footer">
          <button type="primary" plain @tap="obtain">获取记录</button>
          <button type="primary" @tap="give">赠送记录</button>
        </view>
      </swiper-item>
      <!-- 我的礼品卡 end -->
    </swiper>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { giftcards } from '@/api/gift-cards';

export default defineComponent({
  setup() {
    const tab = ref(0);
    function switchTab(index: number): void {
      tab.value = index;
    }

    const myCardTab = ref(0);
    function switchMyCardTab(index: number): void {
      myCardTab.value = index;
    }

    // 点餐结算选择礼品卡
    onLoad(({ type }: { type?: number }) => {
      if (type) {
        tab.value = type;
      }
    });

    const giftCards = ref<unknown>({});
    const myCards = ref([]);

    onShow(() => {
      getGiftCards();
    });

    // 获取礼品卡列表
    function getGiftCards(): void {
      giftcards()
        .then(res => {
          giftCards.value = res;
        })
        .catch(() => ({}));
    }

    // 购买礼品卡
    function giftCardPurchase(activityName: string): void {
      uni.showToast({
        title: activityName,
        icon: 'none'
      });
    }

    function explain(): void {
      uni.showToast({
        title: '购买须知',
        icon: 'none'
      });
    }

    function constitution(): void {
      uni.showToast({
        title: '礼品卡章程',
        icon: 'none'
      });
    }

    function exchange(): void {
      uni.showToast({
        title: '兑换礼品卡',
        icon: 'none'
      });
    }

    function obtain(): void {
      uni.showToast({
        title: '获取记录',
        icon: 'none'
      });
    }

    function give(): void {
      uni.showToast({
        title: '赠送记录',
        icon: 'none'
      });
    }

    return {
      tab,
      switchTab,
      myCardTab,
      switchMyCardTab,
      giftCards,
      myCards,
      giftCardPurchase,
      explain,
      constitution,
      exchange,
      obtain,
      give
    };
  }
});
</script>

<style lang="scss" scoped>
@import './giftcard.scss';
</style>
