<script lang="ts" setup>
import { watch, ref } from "vue";

const props = defineProps<{
  total: number;
  progress: number;
  current: number;
}>();

const isReversing = ref(false);

const getStyle = (index: number): string => {
  if (index < props.current) return "scaleX(1)";
  if (index === props.current) return `scaleX(${props.progress / 100})`;
  return "scaleX(0)";
};

watch(
  () => props.current,
  (newVal, oldVal) => {
    isReversing.value = newVal < oldVal;
  },
  { immediate: true }
);
</script>

<template>
  <div class="story-progress">
    <div class="story-progress__segment" v-for="(item, i) in total">
      <div
        class="story-progress__fill"
        :class="{
          active: i === current,
          reversing: isReversing && i < current,
        }"
        :style="{ transform: getStyle(i) }"
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
    background: $secondary-progress;
    border-radius: 4px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background: #fff;
    transform: scaleX(0);
    transform-origin: left;
    border-radius: 4px;
    will-change: transform;

    &.active {
      transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &.reversing {
      transition: none;
    }
  }
}
</style>
