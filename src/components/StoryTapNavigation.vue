<script lang="ts" setup>
import { shallowRef } from "vue";
import { onLongPress } from "@vueuse/core";

const emit = defineEmits<{
  (e: "toggle", direction: "prev" | "next"): void;
  (e: "pause"): void;
  (e: "play"): void;
}>();

const htmlRefOnMouseUp = shallowRef<HTMLElement | null>(null);

const changeStories = (direction: "prev" | "next") => {
  emit("toggle", direction);
};

onLongPress(
  htmlRefOnMouseUp,
  () => {
    emit("pause");
  },
  {
    onMouseUp: (_duration: number, _distance: number, isLongPress: boolean) => {
      if (isLongPress) {
        emit("play");
        return;
      }

      const target = event?.target as HTMLElement | null;

      if (target?.classList.contains("story-tap-navigation__prev")) {
        changeStories("prev");
      }

      if (target?.classList.contains("story-tap-navigation__next")) {
        changeStories("next");
      }
    },
    modifiers: {
      prevent: true,
    },
  }
);
</script>

<template>
  <div class="story-tap-navigation" ref="htmlRefOnMouseUp">
    <div class="story-tap-navigation__prev"></div>
    <div class="story-tap-navigation__next"></div>
  </div>
</template>

<style lang="scss">
.story-tap-navigation {
  height: 100%;
  width: 100%;

  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    width: 50%;
    height: 100%;
    transform: translateY(-50%);
    z-index: 1;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  &__next {
    right: 0;
  }

  &__prev {
    left: 0;
  }
}
</style>
