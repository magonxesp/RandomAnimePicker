<template>
  <div class="Anime">
    <div class="Anime-container">
      <AnimePreloader v-if="preload"></AnimePreloader>
      <AnimeDetail v-if="!preload && anime != null" v-bind:anime="anime"></AnimeDetail>
      <div class="buttons-container">
        <button class="btn btn-primary" v-if="!preload" v-on:click="findRandomAnime">Choose a random anime</button>
        <a class="btn btn-secondary" v-if="!preload && anime != null" v-bind:href="anime.url.value" target="_blank">View on MyAnimeList</a>
      </div>
    </div>
  </div>
</template>

<script>
  import AnimePreloader from "./preload/anime-preload.vue";
  import AnimeDetail from "./anime-detail.vue";
  import AnimeFinder from "../../modules/anime/application/anime-finder";
  import JikanApiAnimeRepository from "../../modules/anime/infraestructure/jikan-api/jikan-api-anime-repository";

  export default {
    data() {
      return {
        preload: false,
        anime: null
      }
    },
    components: {
      AnimePreloader,
      AnimeDetail
    },
    methods: {
      findRandomAnime() {
        const finder = new AnimeFinder(new JikanApiAnimeRepository());
        this.preload = true;

        finder.random().then((anime) => {
          this.anime = anime;
          this.preload = false;
        });
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