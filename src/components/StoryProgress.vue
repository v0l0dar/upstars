<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  total: number;
  progress: number;
  current: number;
}>();

const getWidth = (index: number): string => {
  if (index < props.current) return "100%";
  if (index === props.current) return `${props.progress}%`;
  return "0%";
};
</script>

<template>
  <div class="story-progress">
    <div class="story-progress__segment" v-for="(item, i) in total">
      <div
        class="story-progress__fill"
        :class="{ active: i === current }"
        :style="{ width: getWidth(i) }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss">
.story-progress {
  position: absolute;
  top: 24px;
  left: 90px;
  z-index: 1;
  width: 100%;
  max-width: 421px;
  box-sizing: border-box;
  padding: 0 24px;
  display: flex;
  gap: 4px;

  @include ui-mobile-only {
    max-width: 100%;
    left: 0;
  }

  &__segment {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.42);
    border-radius: 4px;
  }

  &__fill {
    height: 100%;
    background: #fff;
    width: 0%;
    border-radius: 4px;

    &.active {
      transition: width 1s ease;
    }
  }
}
</style>
