<template>
  <div class="History-entry" v-on:click="showAnime">
    <div class="History-entry__content">
      <div class="History-entry__image">
        <img :src="anime.image.value" alt="history anime image" />
      </div>
      <div class="History-entry__title">
        <p class="History-entry__title__english">{{ anime.title.english.value }}</p>
        <p class="History-entry__title__japanese">{{ anime.title.japanese.value }}</p>
      </div>
    </div>
    <div class="History-entry__divider"></div>
  </div>
</template>

<script>
import Anime from "../../modules/anime/domain/anime";

export default {
  props: {
    anime: {
      type: Anime,
      required: true
    }
  },
  methods: {
    showAnime() {
      this.$emit('click-entry', this.anime.id);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .History-entry {
    width: 100%;
    padding: 1em 2em 0 2em;

    &:hover {
      cursor: pointer;
      background-color: $background-primary;
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