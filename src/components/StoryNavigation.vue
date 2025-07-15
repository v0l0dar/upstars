<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import ArrowLeft from "@/assets/icons/arrow_left.svg";
import ArrowRight from "@/assets/icons/arrow_right.svg";

const emit = defineEmits<{
  (e: "toggle", direction: "prev" | "next"): void;
}>();

const changeStories = (direction: "prev" | "next") => {
  emit("toggle", direction);
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowRight") {
    emit("toggle", "next");
  } else if (event.key === "ArrowLeft") {
    emit("toggle", "prev");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="story-navigation">
    <button @click="changeStories('prev')" class="story-navigation__prev">
      <ArrowLeft />
    </button>
    <button @click="changeStories('next')" class="story-navigation__next">
      <ArrowRight />
    </button>
  </div>
</template>

<style lang="scss">
.story-navigation {
  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    z-index: 1;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: $primary-color;
    border-radius: $size-radius-button;
    transition: transform 0.3s ease, filter 0.3s ease;

    @media (hover: hover) {
      &:hover {
        filter: brightness(120%);
        transform: scale(1.05);
      }
    }

    svg path {
      fill: $secondary-color;
    }
  }

  &__prev {
    left: 4px;
  }

  &__next {
    right: 4px;
  }
}
</style>
