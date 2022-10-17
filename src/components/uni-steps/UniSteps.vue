<template>
  <view class="uni-steps">
    <view
      :class="[direction === 'column' ? 'uni-steps__column' : 'uni-steps__row']"
    >
      <view
        :class="[
          direction === 'column'
            ? 'uni-steps__column-text-container'
            : 'uni-steps__row-text-container'
        ]"
      >
        <view
          v-for="(item, index) in options"
          :key="index"
          :class="[
            direction === 'column'
              ? 'uni-steps__column-text'
              : 'uni-steps__row-text'
          ]"
        >
          <text
            :style="{ color: index <= active ? activeColor : deactiveColor }"
            :class="[
              direction === 'column'
                ? 'uni-steps__column-title'
                : 'uni-steps__row-title'
            ]"
          >
            {{ item.title }}
          </text>
        </view>
      </view>
      <view
        :class="[
          direction === 'column'
            ? 'uni-steps__column-text-container'
            : 'uni-steps__row-text-container'
        ]"
      >
        <view
          v-for="(item, index) in options"
          :key="index"
          :class="[
            direction === 'column'
              ? 'uni-steps__column-text'
              : 'uni-steps__row-text'
          ]"
        >
          <text
            :style="{ color: index <= active ? activeColor : deactiveColor }"
            :class="[
              direction === 'column'
                ? 'uni-steps__column-desc'
                : 'uni-steps__row-desc'
            ]"
          >
            {{ item.desc }}
          </text>
        </view>
      </view>
      <view
        :class="[
          direction === 'column'
            ? 'uni-steps__column-container'
            : 'uni-steps__row-container'
        ]"
      >
        <view
          :class="[
            direction === 'column'
              ? 'uni-steps__column-line-item'
              : 'uni-steps__row-line-item'
          ]"
          v-for="(item, index) in options"
          :key="index"
        >
          <view
            :class="[
              direction === 'column'
                ? 'uni-steps__column-line'
                : 'uni-steps__row-line',
              direction === 'column'
                ? 'uni-steps__column-line--before'
                : 'uni-steps__row-line--before'
            ]"
            :style="{
              backgroundColor:
                index <= active && index !== 0
                  ? activeColor
                  : index === 0
                    ? 'transparent'
                    : deactiveColor
            }"
          ></view>
          <template v-if="item?.circle">
            <view>
              <image :src="item?.circle" :style="item?.circleStyle"></image>
            </view>
          </template>
          <template v-else>
            <view
              :class="[
                direction === 'column'
                  ? 'uni-steps__column-check'
                  : 'uni-steps__row-check'
              ]"
              v-if="index === active"
            >
              <uni-icons
                type="checkbox-filled"
                size="14"
                :color="activeColor"
              ></uni-icons>
            </view>
            <view
              :class="[
                direction === 'column'
                  ? 'uni-steps__column-circle'
                  : 'uni-steps__row-circle'
              ]"
              v-else
              :style="{
                backgroundColor: index < active ? activeColor : deactiveColor
              }"
            ></view>
          </template>
          <view
            :class="[
              direction === 'column'
                ? 'uni-steps__column-line'
                : 'uni-steps__row-line',
              direction === 'column'
                ? 'uni-steps__column-line--after'
                : 'uni-steps__row-line--after'
            ]"
            :style="{
              backgroundColor:
                index < active && index !== options.length - 1
                  ? activeColor
                  : index === options.length - 1
                    ? 'transparent'
                    : deactiveColor
            }"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UniIcons from '../uni-icons/UniIcons.vue';

export default defineComponent({
  name: 'UniSteps',
  components: {
    UniIcons
  },
  props: {
    // 排列方向 row column
    direction: {
      type: String,
      default: 'row'
    },
    // 激活状态颜色
    activeColor: {
      type: String,
      default: 'rgb(26, 173, 25)'
    },
    // 未激活状态颜色
    deactiveColor: {
      type: String,
      default: 'rgb(153, 153, 153)'
    },
    // 当前步骤
    active: {
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    // 数据
    last: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss" scoped>
@import './uni-steps.scss';
</style>
