<template>
  <div class="Anime">
    <div class="Anime-container">
      <component v-if="preload || animeObject" v-bind:is="animeDetailComponent" v-bind:anime="animeObject"></component>
      <div class="buttons-container" v-if="!preload">
        <button class="btn btn-primary" v-on:click="findRandomAnime">Choose a random anime</button>
        <a class="btn btn-secondary" v-if="animeObject" v-bind:href="animeObject.url.value" target="_blank">View on MyAnimeList</a>
      </div>
      <div class="buttons-container" v-if="error">
        <button class="btn btn-primary" v-on:click="findRandomAnime">Try again</button>
      </div>
    </div>
  </div>
</template>

<script>
  import AnimePreloader from "./preload/anime-preload.vue";
  import AnimeDetail from "./anime-detail.vue";
  import AnimeError from "./error/anime-error.vue";
  import Anime from "../../modules/anime/domain/anime";
  import { saveAnime, animeFinder, createHistoryEntry } from "../../application-services";

  export default {
    props: {
      anime: {
        type: Anime,
        required: false
      },
    },
    data() {
      return {
        preload: false,
        randomAnime: null,
        error: false,
      }
    },
    components: {
      AnimePreloader,
      AnimeDetail,
      AnimeError
    },
    computed: {
      animeDetailComponent() {
        if (this.error) {
          return AnimeError;
        }

        if (this.preload) {
          return AnimePreloader;
        }

        return AnimeDetail;
      },
      animeObject() {
        return this.anime || this.randomAnime;
      }
    },
    methods: {
      async findRandomAnime() {
        this.preload = true;
        this.error = false;
        this.anime = null;

        try {
          this.randomAnime = await animeFinder().random();
          this.preload = false;

          await saveAnime().save(this.randomAnime);
          await createHistoryEntry().createEntry(this.randomAnime.id);

          window.dispatchEvent(new Event('random-anime'));
        } catch (e) {
          console.log(e);
          this.error = true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Anime-container {
    margin-bottom: 20px;

    .buttons-container {
      display: flex;
      justify-content: center;
      padding: 10px 0;

      .btn {
        margin-left: 10px;

        &:first-child {
          margin-left: 0;
        }
      }

      @media (max-width: 600px) {
        flex-direction: column;
        margin: 0 10px 10px 10px;

        .btn {
          margin-left: 0 !important;
          margin-bottom: 15px;
        }
      }
    }
  }
</style>