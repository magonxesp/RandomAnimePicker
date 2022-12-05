<template>
  <div class="history-entry" @click="navigateTo(`/anime/${anime.id.value}`)">
    <div class="history-entry__content">
      <div class="history-entry__image">
        <img :src="anime.image.value" alt="history anime image" />
      </div>
      <div class="history-entry__title">
        <p class="history-entry__title__english">{{ anime.titleEnglish.value }}</p>
        <p class="history-entry__title__japanese">{{ anime.titleJapanese.value }}</p>
      </div>
    </div>
    <div class="history-entry__divider"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    anime: {
      type: Object as PropType<Anime>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
  .history-entry {
    width: 100%;
    padding: 1em 2em 0 2em;

    &:hover {
      cursor: pointer;
      background-color: var(--background-primary);
    }

    &__content {
      display: flex;
    }

    &__image {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
      }
    }

    &__title {
      width: 75%;
      padding-left: 1em;

      &__english {
        font-weight: bold;
        font-size: 1.2em;
      }

      &__japanese {
        font-size: 1em;
      }
    }

    &__divider {
      margin-top: 1em;
      border-bottom: #FFFFFF solid 0.1em;
      width: 100%;
    }
  }
</style>
