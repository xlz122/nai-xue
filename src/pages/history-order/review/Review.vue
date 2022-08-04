<template>
  <view class="container">
    <view class="content">
      <list-cell last class="mb-20" :hover="false">
        <view class="w-100 d-flex justify-content-between align-items-center">
          <view class="font-size-lg text-color-base flex-fill">
            {{ params?.storename }}
          </view>
          <view class="font-size-base text-color-assist mr-10">
            {{ params?.date }}
          </view>
          <view class="font-size-base text-color-assist">
            {{ params?.typeCate == 1 ? '堂食' : '外卖' }}
          </view>
        </view>
      </list-cell>
      <view class="review-form">
        <view class="review-rate-form mb-20">
          <rate-form-item
            v-model="defaultReview.score_service"
            label="服务"
            tips="能感受到良好的服务态度吗？"
          ></rate-form-item>
          <rate-form-item
            v-model="defaultReview.score_order"
            label="点单"
            tips="点单有恰当的介绍，快速准确地下单吗？"
          ></rate-form-item>
          <rate-form-item
            v-model="defaultReview.score_speed"
            label="速度"
            tips="出品的速度您认为可接受吗？"
          ></rate-form-item>
          <rate-form-item
            v-model="defaultReview.score_product"
            label="产品"
            tips="您享用的茶饮或面包，如您所期待吗？"
          ></rate-form-item>
          <rate-form-item
            v-model="defaultReview.score_enviroment"
            label="环境"
            tips="门店环境和清洁卫生，您满意吗？"
          ></rate-form-item>
        </view>
        <view class="review-textarea-form">
          <textarea
            v-model="defaultReview.opinion"
            placeholder="如果您有什么意见和建议,请告诉我们,我们会认真聆听"
            placeholder-class="font-size-sm text-color-assist"
          />
          <view class="text-right font-size-sm text-color-assist">
            {{ defaultReview.opinion.length }} / 500
          </view>
        </view>
      </view>
    </view>
    <view class="btn-box">
      <button type="primary" @tap="submit">提交评论</button>
    </view>
  </view>
</template>

<script lang="ts">
/* global uni */
import { defineComponent, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import ListCell from '@/components/list-cell/ListCell.vue';
import RateFormItem from './rate-form-item/RateFormItem.vue';

export default defineComponent({
  name: 'ReviewView',
  components: {
    ListCell,
    RateFormItem
  },
  setup() {
    const params = reactive({
      storename: '',
      date: '',
      typeCate: ''
    });

    /**
     * @param { String }  - storename 店铺名
     * @param { Nubmer } - typeCate 堂食/外卖
     * @param { String } - date 日期
     */
    onLoad(({ storename, date, typeCate }) => {
      params.storename = storename || '';
      params.date = date || '';
      params.typeCate = typeCate || '';
    });

    const defaultReview = reactive({
      score_service: 0,
      score_order: 0,
      score_speed: 0,
      score_product: 0,
      score_enviroment: 0,
      opinion: ''
    });

    function submit(): boolean | undefined {
      if (
        !defaultReview.score_service ||
        !defaultReview.score_order ||
        !defaultReview.score_speed ||
        !defaultReview.score_product ||
        !defaultReview.score_enviroment
      ) {
        uni.showToast({
          title: '请先选择评论内容',
          icon: 'none'
        });

        return false;
      }

      uni.showToast({ title: '提交成功' });

      setTimeout(() => {
        uni.navigateBack({ delta: 1 });
      });
    }

    return {
      params,
      defaultReview,
      submit
    };
  }
});
</script>

<style lang="scss" scoped>
@import './review.scss';
</style>
