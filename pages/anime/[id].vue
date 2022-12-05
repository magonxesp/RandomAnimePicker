<template>
	<AnimeWrapper>
		<AnimeDetail :anime="anime" />
		<AnimeControls :anime="anime" @click:random="navigateTo('/random')" />
	</AnimeWrapper>
</template>

<script lang="ts">
import { defineComponent, useRoute, useNuxtApp, createError } from "#imports";
import AnimeWrapper from "~/components/domain/anime/AnimeWrapper.vue";
import AnimeDetail from "~/components/domain/anime/AnimeDetail.vue";
import AnimeControls from "~/components/domain/anime/AnimeControls.vue";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { AnimeNotFoundException } from "~/plugins/application-services/anime/domain/exception";

export default defineComponent({
	name: "[id]",
	async setup() {
		const { $animeFinder } = useNuxtApp()
		const route = useRoute()
		const id: string = route.params.id.toString()
		let anime: Anime

		try {
			anime = await $animeFinder("api").find(id)
		} catch (exception) {
			if (exception instanceof AnimeNotFoundException) {
				throw createError({ statusCode: 404, statusMessage: `Anime with id ${id} not found` })
			}

			throw exception
		}

		return {
			anime
		}
	},
	components: {
		AnimeControls,
		AnimeDetail,
		AnimeWrapper
	},
})
</script>

<style scoped>

</style>
