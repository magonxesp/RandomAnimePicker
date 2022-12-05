<template>
  <div class="anime">
		<Loading v-if="isLoading" />
    <div v-if="currentAnime">
      <AnimeDetail :anime="currentAnime" />
      <div class="buttons-container">
        <button class="btn btn-primary" @click.prevent="fetch">Choose a random anime</button>
        <a class="btn btn-secondary" :href="currentAnime.url.value" target="_blank">View on MyAnimeList</a>
      </div>
    </div>
		<div v-if="error">
			<Error />
			<div class="buttons-container">
				<button class="btn btn-primary" @click.prevent="fetch">Try again</button>
			</div>
		</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";
import { useAnimeStore } from "~/store/anime-store";
import { storeToRefs } from "pinia";
import Error from "~/components/common/Error.vue";
import Loading from "~/components/common/Loading.vue";
import AnimeDetail from "~/components/domain/anime/AnimeDetail.vue";

export default defineComponent({
	name: "AnimeView",
	setup() {
		const store = useAnimeStore()
		const { currentAnime, isLoading, error } = storeToRefs(store)

		return {
			store,
			currentAnime,
			isLoading,
			error
		}
	},
	methods: {
		fetch() {
			this.store.fetchRandomAnime()
		}
	},
	components: {
		Loading,
		Error,
		AnimeDetail
	},
})
</script>

<style lang="scss" scoped>
.anime {
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
