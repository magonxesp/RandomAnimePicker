<template>
  <div class="App">
    <header>
      <h1>Random Anime Picker</h1>
    </header>
    <div class="App-container">
      <Anime></Anime>
    </div>
  </div>
</template>

<script>
  import Anime from "../anime/anime.vue";

  export default {
    components: {
      Anime
    }
  }
</script>

<style lang="scss" scoped>
  .App {
    width: 100%;
    font-family: 'Roboto', sans-serif;
    color: white;

    header {
      padding: 15px;

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