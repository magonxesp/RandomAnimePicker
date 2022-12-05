import { AnimeFinder } from "~/plugins/application-services/anime/application/anime-finder";
import { SaveAnime } from "~/plugins/application-services/anime/application/save-anime";
import { CreateHistoryEntry } from "~/plugins/application-services/history/application/create-history-entry";
import { CurrentHistory } from "~/plugins/application-services/history/application/current-history";
import { AnimeRepositorySource } from "~/plugins/application-services";

declare module '#app' {
	interface NuxtApp {
		$animeFinder(source: AnimeRepositorySource): AnimeFinder
		$saveAnime(): SaveAnime
		$historyEntryCreator(): CreateHistoryEntry
		$currentHistory(): CurrentHistory
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$animeFinder(source: AnimeRepositorySource): AnimeFinder
		$saveAnime(): SaveAnime
		$historyEntryCreator(): CreateHistoryEntry
		$currentHistory(): CurrentHistory
	}
}

export {}
