<template>
  <AnimeWrapper>
		<Loading v-if="isLoading" />
    <div v-if="currentAnime">
      <AnimeDetail :anime="currentAnime" />
      <AnimeControls :anime="currentAnime" @click:random="fetch" />
    </div>
		<div v-if="error">
			<Error />
			<div class="buttons-container">
				<button class="btn btn-primary" @click.prevent="fetch">Try again</button>
			</div>
		</div>
	</AnimeWrapper>
</template>

<script lang="ts">
import { defineComponent } from "#imports";
import { useAnimeStore } from "~/store/anime-store";
import { storeToRefs } from "pinia";
import Error from "~/components/common/Error.vue";
import Loading from "~/components/common/Loading.vue";
import AnimeDetail from "~/components/domain/anime/AnimeDetail.vue";
import AnimeControls from "~/components/domain/anime/AnimeControls.vue";
import AnimeWrapper from "~/components/domain/anime/AnimeWrapper.vue";

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
		AnimeWrapper,
		Loading,
		Error,
		AnimeDetail,
		AnimeControls
	},
})
</script>

<style lang="scss" scoped>

</style>
