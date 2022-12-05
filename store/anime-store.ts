import { defineStore } from "pinia";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { useNuxtApp } from "#imports";

interface AnimeStoreState {
	currentAnime: Anime|null,
	isLoading: boolean,
	error: any|null
}

export const useAnimeStore = defineStore("app-store", {
	state: (): AnimeStoreState => ({
		currentAnime: null,
		isLoading: false,
		error: null,
	}),
	actions: {
		setLoading() {
			this.currentAnime = null
			this.isLoading = true
			this.error = null
		},
		fetchRandomAnime() {
			const { $animeFinder, $saveAnime, $historyEntryCreator } = useNuxtApp()
			this.setLoading()

			$animeFinder("api").random()
				.then(async anime => {
					await $saveAnime().save(anime)
					await $historyEntryCreator().createEntry(anime.id.value)
					this.currentAnime = anime
				})
				.catch(reason => this.error = reason)
				.finally(() => this.isLoading = false)
		},
		fetchAnimeById(animeId: string) {
			const { $animeFinder } = useNuxtApp()
			this.setLoading()

			$animeFinder("session").find(animeId)
				.then(anime => this.currentAnime = anime)
				.catch(() => {
					$animeFinder("api")
						.find(animeId).then(anime => this.currentAnime = anime)
						.catch(reason => this.error = reason)
						.finally(() => this.isLoading = false)
				})
				.finally(() => this.isLoading = false)
		}
	}
})
