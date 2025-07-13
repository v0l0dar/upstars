<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import Logo from "@/assets/icons/logo.svg";
import Pause from "@/assets/icons/pause.svg";
import Close from "@/assets/icons/close.svg";
import type { Story, VideoSource } from "@/components/types/story.ts";

gsap.registerPlugin(TextPlugin);

const emit = defineEmits(["end", "progress"]);

const props = defineProps<{
  story: Story;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);

const onEnded = (): void => {
  emit("end");
};

const filteredSources = computed<VideoSource[]>(() => {
  if (!props.story.source.length) return [];
  return props.story.source.filter(
    (src) => Boolean(src.src) && Boolean(src.type)
  );
});

const toggleState = (): void => {
  videoRef.value?.paused ? play() : pause();
};

const updateTime = (): void => {
  if (!videoRef.value) return;

  const current = videoRef.value.currentTime;
  const duration = videoRef.value.duration;

  const progress = (current / duration) * 100;

  emit("progress", +progress.toFixed(0));
};

const pause = (): void => {
  videoRef.value?.pause();
};

const play = (): void => {
  videoRef.value?.play();
};

const restart = () => {
  if (!videoRef.value) return;
  videoRef.value.currentTime = 0;
  videoRef.value.play();
};

onMounted(() => {
  gsap.to(".story-video__text", {
    text: {
      value: props.story.title || "",
    },
    duration: 1.5,
    delay: 0.1,
    ease: "power1.out",
  });
});

defineExpose({ restart, play, pause });
</script>

<template>
  <div class="story-video">
    <div class="story-video__headline">
      <Logo />
      <div class="story-video__info">
        <div class="story-video__title">Upstars</div>
        <div class="story-video__text" v-if="story.title"></div>
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
      playsinline
      muted
      @ended="onEnded"
      @timeupdate="updateTime"
      preload="auto"
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
    top: 38px;
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
    text-align: left;
  }

  &__text {
    font-size: 12px;
    font-weight: 700;
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

    svg path {
      fill: $primary-icon-color;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;

    @include ui-mobile-only {
      border-radius: 0;
    }
  }
}
</style>
