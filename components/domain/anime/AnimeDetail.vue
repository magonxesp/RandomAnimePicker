<template>
  <div class="Anime-fields">
    <div class="Anime-img">
      <img :src="anime.image.value" alt="anime-label"/>
    </div>
    <div class="Anime-information">
      <h1>{{ anime.titleEnglish.value }}</h1>
      <h2>{{ anime.titleJapanese.value }}</h2>
      <ul class="stats">
        <li><strong>Episodes:</strong> {{ anime.episodes.value }}</li>
        <li><strong>Duration:</strong> {{ anime.duration.value }}</li>
        <li><strong>Premiered:</strong> {{ anime.premiered.value }}</li>
        <li><strong>Status:</strong> {{ anime.status.value }}</li>
        <li><strong>Score:</strong> {{ anime.score.value }}</li>
        <li><strong>Genres:</strong> {{ anime.genres.toString() }}</li>
        <li><strong>Rating:</strong> {{ anime.rating.value }}</li>
      </ul>
      <section class="synopsis-section">
        <h4>Synopsis:</h4>
        <p>{{ anime.synopsis.value }}</p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";
import { PropType } from "@vue/runtime-core";
import { Anime } from "~/plugins/application-services/anime/domain/anime";

export default defineComponent({
	props: {
		anime: {
			type: Object as PropType<Anime>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
  .Anime-fields {
    display: flex;
    margin-bottom: 20px;

    .Anime-img {
      max-width: 300px;

      img {
        width: 100%;
      }

      @media (max-width: 900px) {
        margin-bottom: 30px;
      }
    }

    .Anime-information {
      margin-left: 20px;
      max-width: 650px;

      ul.stats {
        list-style: none;

        li {
          padding: 5px 0;
        }
      }

      @media (max-width: 650px) {
        margin-left: 10px;
        margin-right: 10px;
      }
    }

    .synopsis-section {
      padding: 10px 0;
    }

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
