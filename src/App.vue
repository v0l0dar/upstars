<script setup lang="ts">
import StoryPlayer from "./components/StoryPlayer.vue";
import { data } from "@/mockup/stories";
</script>

<template>
  <main class="layout">
    <StoryPlayer :items="data" />
  </main>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
}
</style>
