<script lang="ts" setup>
import { ref } from "vue";
import type { Story } from "@/components/types/story.ts";
import StoryVideo from "./StoryVideo.vue";

const stories = ref<Story[]>([
  {
    title: "Бенефіти",
    source: [
      {
        src: "/videos/av1/1.mp4",
        type: "video/av1",
      },
      {
        src: "/videos/webm/1.webm",
        type: "video/webm",
      },
      {
        src: "/videos/h264/1.mp4",
        type: "video/mp4",
      },
    ],
  },
]);
</script>

<template>
  <div class="story-player">
    <div class="story-player__content">
      <div class="store-player__list">
        <div class="story-player__overlay">progress</div>
        <StoryVideo
          class="story-player__item"
          v-for="(story, i) in stories"
          :key="i"
          :story="story"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.story-player {
  position: relative;
  // height: 70vh;
  width: 100%;
  overflow: hidden;

  &__item {
    width: 431px;
    height: 100%;
  }

  @include ui-mobile-only {
    height: 100vh;
  }
}
</style>
