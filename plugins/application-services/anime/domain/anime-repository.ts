import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";

export interface AnimeRepository {
	random(): Promise<Anime>
	find(id: AnimeId): Promise<Anime>
	save(anime: Anime): Promise<void>
}
