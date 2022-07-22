<template>
  <view @touchmove.stop.prevent>
    <view
      class="modal-box"
      :style="{ width: width, padding: padding, borderRadius: radius }"
      :class="[
        fadein || show ? 'modal-normal' : 'modal-scale',
        show ? 'modal-show' : ''
      ]"
    >
      <view v-if="custom">
        <slot></slot>
      </view>
      <view v-else>
        <view class="modal-title" v-if="title">{{ title }}</view>
        <view
          class="modal-content"
          :class="[title ? '' : 'mtop']"
          :style="{ color: color, fontSize: size + 'rpx' }"
        >
          <slot></slot>
        </view>
        <view
          class="modalBtn-box"
          :class="[button.length != 2 ? 'flex-column' : '']"
        >
          <block v-for="(item, index) in button" :key="index">
            <button
              class="modal-btn"
              :class="[
                '' + (item.type || 'primary') + (item.plain ? '-outline' : ''),
                button.length != 2 ? 'btn-width' : '',
                button.length > 2 ? 'mbtm' : '',
                shape == 'circle' ? 'circle-btn' : '',
                'btn-' + (item.size || 'default')
              ]"
              :hover-class="
                '' +
                (item.plain ? 'outline' : item.type || 'primary') +
                '-hover'
              "
              :data-index="index"
              @tap="handleClick"
            >
              {{ item.text || '确定' }}
            </button>
          </block>
        </view>
      </view>
    </view>
    <view
      class="modal-mask"
      :class="[show ? 'mask-show' : '']"
      @tap="handleClickCancel"
    ></view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalView',
  props: {
    //是否显示
    show: {
      type: Boolean,
      default: false
    },
    //自定义modal体
    custom: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '84%'
    },
    padding: {
      type: String,
      default: '40rpx'
    },
    radius: {
      type: String,
      default: '24rpx'
    },
    //标题
    title: {
      type: String,
      default: ''
    },
    //内容
    content: {
      type: String,
      default: ''
    },
    //内容字体颜色
    color: {
      type: String,
      default: '#999'
    },
    //内容字体大小 rpx
    size: {
      type: Number,
      default: 28
    },
    //形状 circle, square
    shape: {
      type: String,
      default: 'square'
    },
    button: {
      type: Array,
      default: function () {
        return [
          {
            text: '取消',
            type: 'red',
            plain: true //是否空心
          },
          {
            text: '确定',
            type: 'red',
            plain: false
          }
        ];
      }
    },
    //点击遮罩 是否可关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    //淡入效果，自定义弹框插入input输入框时传true
    fadein: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'cancel'],
  setup(
    props: {
      show: boolean;
      maskClosable: boolean;
    },
    { emit }
  ) {
    function handleClick(
      e: Record<string, { dataset: { index: number } }>
    ): boolean | undefined {
      if (!props.show) {
        return false;
      }

      const dataset = e.currentTarget.dataset;
      emit('click', {
        index: Number(dataset.index)
      });
    }

    function handleClickCancel() {
      if (!props.maskClosable) {
        return false;
      }

      emit('cancel');
    }

    return {
      handleClick,
      handleClickCancel
    };
  }
});
</script>

<style lang="scss" scoped>
@import './modal.scss';
</style>
