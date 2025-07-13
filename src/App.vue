<script setup lang="ts">
import { ref } from "vue";
import StoryPlayer from "./components/StoryPlayer.vue";
import type { Story } from "@/components/types/story.ts";

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
  {
    title: "Домашні улюбленці",
    source: [
      {
        src: "/videos/av1/2.mp4",
        type: "video/av1",
      },
      {
        src: "/videos/webm/2.webm",
        type: "video/webm",
      },
      {
        src: "/videos/h264/2.mp4",
        type: "video/mp4",
      },
    ],
  },
  {
    title: "Upcharity 2.0",
    source: [
      {
        src: "/videos/av1/3.mp4",
        type: "video/av1",
      },
      {
        src: "/videos/webm/3.webm",
        type: "video/webm",
      },
      {
        src: "/videos/h264/3.mp4",
        type: "video/mp4",
      },
    ],
  },
]);
</script>

<template>
  <main class="app">
    <div class="app__content">
      <StoryPlayer :items="stories" />
    </div>
  </main>
</template>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: center;

  &__content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
  }
}
</style>
