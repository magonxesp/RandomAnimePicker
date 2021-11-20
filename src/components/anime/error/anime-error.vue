<template>
  <div class="Anime-error">
    <div class="Anime-error__thumbnail">
      <img :src="oups" alt="error-thumbnail" />
    </div>
    <div class="Anime-error__message">
      <h2>Oups! An error ocurred</h2>
    </div>
  </div>
</template>

<script>
import oups from "./oups.png";

export default {
  data() {
    return {
      oups: oups
    }
  }
}
</script>

<style lang="scss" scoped>
.Anime-error {
  display: flex;
  margin-bottom: 20px;
  width: 800px;

  div {
    width: 50%;

    @media (max-width: 900px) {
      width: 100%;
      padding: 0 30px;
    }
  }

  &__thumbnail {
    img {
      width: 100%;
    }
  }

  &__message {
    display: flex;
    align-items: center;

    h2 {
      padding: 0 25px;

      @media (max-width: 900px) {
        padding: 40px 0;
      }
    }

    @media (max-width: 900px) {
      align-items: flex-start;
      justify-content: center;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
}
</style>