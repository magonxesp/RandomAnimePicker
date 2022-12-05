<template>
	<div>
		<NuxtLink to="/random" class="btn btn-primary">Choose a random anime</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, navigateTo } from "#imports";
import { useAnimeStore } from "~/store/anime-store";
import { storeToRefs } from "pinia";

export default defineComponent({
	name: "index",
	setup() {
		const store = useAnimeStore()
		const { currentAnime } = storeToRefs(store)

		return {
			store,
			currentAnime
		}
	},
	watch: {
		currentAnime() {
			navigateTo("/random")
		}
	}
})
</script>

<style scoped>
div {
	margin: 0 auto;
}
</style>
