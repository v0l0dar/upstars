<script setup lang="ts">
import StoryPlayer from "./components/StoryPlayer.vue";
</script>

<template>
  <main class="app">
    <div class="app__content">
      <StoryPlayer />
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
