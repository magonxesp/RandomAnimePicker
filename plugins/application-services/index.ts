import { defineNuxtPlugin } from "#app";
import { AnimeFinder } from "~/plugins/application-services/anime/application/anime-finder";
import { JikanApiAnimeRepository } from "~/plugins/application-services/anime/infraestructure/persistence/jikan-api-anime-repository";
import { KeyValueAnimeRepository } from "~/plugins/application-services/anime/infraestructure/persistence/key-value-anime-repository";
import { JsonSessionStroage } from "~/plugins/application-services/shared/infraestructure/persistence/key-value-storage/json-session-stroage";
import { SaveAnime } from "~/plugins/application-services/anime/application/save-anime";
import { CreateHistoryEntry } from "~/plugins/application-services/history/application/create-history-entry";
import { KeyValueStorageHistoryRepository } from "~/plugins/application-services/history/infraestructure/persistence/key-value-storage-history-repository";
import { CurrentHistory } from "~/plugins/application-services/history/application/current-history";

const animeRepository = {
	api: new JikanApiAnimeRepository(),
	session: new KeyValueAnimeRepository(new JsonSessionStroage())
}

export type AnimeRepositorySource = keyof typeof animeRepository

export default defineNuxtPlugin(nuxtApp => {
	return {
		provide: {
			animeFinder: (source: AnimeRepositorySource) => new AnimeFinder(animeRepository[source]),
			saveAnime: () => new SaveAnime(animeRepository.session),
			historyEntryCreator: () => new CreateHistoryEntry(new KeyValueStorageHistoryRepository(new JsonSessionStroage())),
			currentHistory: () => new CurrentHistory(new KeyValueStorageHistoryRepository(new JsonSessionStroage())),
		}
	}
})
