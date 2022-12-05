<template>
	<AnimeView />
</template>

<script lang="ts">
import { defineComponent } from "#imports";
import { useAnimeStore } from "~/store/anime-store";
import AnimeView from "~/components/domain/anime/AnimeView.vue";
import { storeToRefs } from "pinia";

export default defineComponent({
	name: "random",
	setup() {
		const store = useAnimeStore()
		const { currentAnime } = storeToRefs(store)

		return {
			store,
			currentAnime
		}
	},
	mounted() {
		if (!this.currentAnime) {
			this.store.fetchRandomAnime()
		}
	},
	components: {
		AnimeView
	}
})
</script>

<style scoped>

</style>
