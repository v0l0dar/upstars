<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from "vue";
import type { Story } from "@/components/types/story.ts";
import StoryNavigation from "./StoryNavigation.vue";
import StoryProgress from "./StoryProgress.vue";

const props = defineProps<{
  items: Story[];
}>();

const StoryVideo = defineAsyncComponent(() => import("./StoryVideo.vue"));

const stories = ref<Story[]>(props.items);

const currentVideoIndex = ref<number>(0);
const currentStory = computed(() => stories.value[currentVideoIndex.value]);
const currentProgress = ref(0);
const currentProgressVal = computed(() => currentProgress.value);

const videoRef = ref<InstanceType<typeof StoryVideo> | null>(null);

const toggleStories = (direction: "prev" | "next") => {
  if (direction === "next") {
    currentVideoIndex.value =
      currentVideoIndex.value < stories.value.length - 1
        ? currentVideoIndex.value + 1
        : 0;
  }

  if (direction === "prev") {
    if (currentVideoIndex.value === 0) {
      videoRef.value?.restart?.();

      return;
    }

    currentVideoIndex.value = currentVideoIndex.value - 1;
  }
};

const autoToggle = (): void => {
  currentVideoIndex.value =
    currentVideoIndex.value < stories.value.length - 1
      ? currentVideoIndex.value + 1
      : 0;
};

const getProgress = (progress: number) => {
  currentProgress.value = progress;
};
</script>

<template>
  <div class="story-player">
    <div class="story-player__content">
      <div class="store-player__list">
        <StoryNavigation @toggle="toggleStories" />
        <div class="story-player__progress">
          <StoryProgress
            :total="stories.length"
            :progress="currentProgressVal"
            :current="currentVideoIndex"
          />
        </div>
        <StoryVideo
          class="story-player__item"
          ref="videoRef"
          v-if="currentStory"
          :story="currentStory"
          :key="currentStory.title"
          @end="autoToggle"
          @progress="getProgress"
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
  max-width: 600px;
  overflow: hidden;
  margin: 0 auto;

  &__item {
    max-width: 421px;
    width: 100%;
    height: 100%;
  }

  @include ui-mobile-only {
    height: 100vh;
  }
}
</style>
