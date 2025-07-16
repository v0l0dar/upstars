<script lang="ts" setup>
import { ref, defineAsyncComponent, computed } from "vue";
import type { Story } from "@/components/types/story.ts";
import StoryNavigation from "./StoryNavigation.vue";
import StoryProgress from "./StoryProgress.vue";
import StoryTapNavigation from "./StoryTapNavigation.vue";

const props = defineProps<{
  items: Story[];
}>();

const StoryVideo = defineAsyncComponent(() => import("./StoryVideo.vue"));

const stories = computed<Story[]>(() =>
  props.items.map((story, index) => ({
    ...story,
    id: story?.id ?? index + 1,
  }))
);

const currentVideoIndex = ref<number>(0);
const currentProgress = ref(0);
const isMuted = ref<boolean>(true);
const videoRef = ref<InstanceType<typeof StoryVideo> | null>(null);

const currentProgressVal = computed(() => currentProgress.value);
const currentStory = computed(() => stories.value[currentVideoIndex.value]);

const toggleStories = async (direction: "prev" | "next") => {
  const maxIndex = stories.value.length - 1;

  if (direction === "next") {
    currentVideoIndex.value =
      currentVideoIndex.value < maxIndex ? currentVideoIndex.value + 1 : 0;

    currentProgress.value = 0;
  }

  if (direction === "prev") {
    if (currentVideoIndex.value === 0) {
      currentVideoIndex.value = maxIndex;

      return;
    }

    currentVideoIndex.value = currentVideoIndex.value - 1;
    currentProgress.value = 0;
  }
};

const autoToggle = async (): Promise<void> => {
  currentVideoIndex.value =
    currentVideoIndex.value < stories.value.length - 1
      ? currentVideoIndex.value + 1
      : 0;

  currentProgress.value = 0;
};

const getProgress = async (progress: number) => {
  currentProgress.value = progress;
};

const setMuted = (val: boolean): void => {
  isMuted.value = val;
};
</script>

<template>
  <div class="story-player">
    <div class="story-player__content">
      <div class="store-player__list">
        <StoryNavigation
          class="story-player__navigation"
          @toggle="toggleStories"
        />
        <StoryTapNavigation
          class="story-player__taps"
          @toggle="toggleStories"
          @pause="videoRef?.pause"
          @play="videoRef?.play"
        />
        <div class="story-player__progress">
          <StoryProgress
            :total="stories.length"
            :progress="currentProgressVal"
            :current="currentVideoIndex"
          />
        </div>
        <StoryVideo
          v-if="currentStory"
          ref="videoRef"
          class="story-player__item"
          :story="currentStory"
          :key="currentStory.id"
          :muted="isMuted"
          @muted="setMuted"
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
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  margin: 0 auto;

  @include ui-mobile-only {
    max-width: 100%;
  }

  &__item {
    max-width: 421px;
    width: 100%;
    height: 100%;

    @include ui-mobile-only {
      max-width: 100%;
    }
  }

  &__navigation {
    @include ui-mobile-only {
      display: none;
    }
  }

  &__taps {
    display: none;
    @include ui-mobile-only {
      display: block;
    }
  }
}
</style>
