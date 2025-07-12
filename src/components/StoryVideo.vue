<script lang="ts" setup>
import { ref, computed } from "vue";

import Logo from "@/assets/icons/logo.svg";
import Pause from "@/assets/icons/pause.svg";
import Close from "@/assets/icons/close.svg";
import type { Story, VideoSource } from "@/components/types/story.ts";

const props = defineProps<{
  story: Story;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);

const onEnded = (): void => {
  console.log("video ended");
};

const filteredSources = computed<VideoSource[]>(() => {
  if (!props.story.source.length) return [];
  return props.story.source.filter(
    (src) => Boolean(src.src) && Boolean(src.type)
  );
});

const toggleState = (): void => {
  if (videoRef.value?.paused) {
    videoRef.value?.play();
  } else {
    videoRef.value?.pause();
  }
};
</script>

<template>
  <div class="story-video">
    <div class="story-video__headline">
      <Logo />
      <div class="story-video__info">
        <div class="story-video__title">Upstars</div>
        <div class="story-video__text" v-if="story.title">
          {{ story.title }}
        </div>
      </div>
      <div class="story-video__actions">
        <button @click="toggleState">
          <Pause />
        </button>
        <a href="https://www.upstars.com/" target="_blank">
          <Close />
        </a>
      </div>
    </div>
    <video
      ref="videoRef"
      class="story-video__content"
      autoplay
      muted
      playsinline
      @ended="onEnded"
      loading="lazy"
    >
      <source
        v-for="(item, index) in filteredSources"
        :key="index"
        :src="item.src"
        :type="item.type"
      />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style lang="scss">
.story-video {
  margin: 0 auto;
  position: relative;

  &__headline {
    position: absolute;
    top: 32px;
    padding: 0 24px;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
  }

  &__text {
    font-size: 12px;
    font-weight: 400;
  }

  &__actions {
    margin-left: auto;
    display: flex;
    gap: 8px;
    align-items: center;

    & > * {
      display: inline-flex;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
}
</style>
