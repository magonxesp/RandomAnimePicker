<template>
  <div class="App">
    <header>
      <h1>Random Anime Picker</h1>
      <div class="Header-menu">
        <History v-on:click-history-entry="showAnime"></History>
      </div>
    </header>
    <div class="App-container">
      <Anime v-bind:anime="anime"></Anime>
    </div>
  </div>
</template>

<script>
  import Anime from "../anime/anime.vue";
  import History from "../history/history.vue";
  import AnimeFinder from "../../modules/anime/application/anime-finder";
  import SessionStorageAnimeRepository from "../../modules/anime/infraestructure/session/session-storage-anime-repository";

  export default {
    data() {
      return {
        anime: null
      }
    },
    components: {
      Anime,
      History
    },
    methods: {
      showAnime(animeId) {
        (new AnimeFinder(new SessionStorageAnimeRepository)).find(animeId)
          .then(anime => this.anime = anime);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .App {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    color: white;

    header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        margin: 0;
      }
    }

    .App-container {
      width: 100%;
      margin-top: 100px;
      display: flex;
      justify-content: center;

      @media (max-width: 900px) {
        margin-top: 50px;
      }
    }
  }
</style>