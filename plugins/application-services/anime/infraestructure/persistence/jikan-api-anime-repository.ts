import { AnimeRepository } from "~/plugins/application-services/anime/domain/anime-repository";
import { Random } from "~/plugins/application-services/shared/domain/random";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { AnimeNotFoundException } from "~/plugins/application-services/anime/domain/exception";
import { Anime as JikanApiAnime } from "~/plugins/application-services/shared/infraestructure/jikan-api/anime";
import { randomSeason } from "~/plugins/application-services/anime/domain/anime-season";
import {
	ResponseCollection,
	ResponseError,
	ResponseItem
} from "~/plugins/application-services/shared/infraestructure/jikan-api/response";

export class JikanApiAnimeRepository implements AnimeRepository {

	private static readonly API_BASE_URL = "https://api.jikan.moe/v4"

	private toAnimeAggregate(object: JikanApiAnime) {
		return Anime.fromPrimitives({
			id: object.mal_id,
			titleEnglish: object.title,
			titleJapanese: object.title_japanese,
			synopsis: object.synopsis,
			season: object.season,
			image: object.images.webp.image_url,
			episodes: object.episodes,
			duration: object.duration,
			premiered: object.premiered,
			status: object.status,
			score: object.score,
			genres: [...object.genres.map(genre => genre.name), ...object.explicit_genres.map(genre => genre.name)],
			rating: object.rating,
			url: object.url
		})
	}

	async random(): Promise<Anime> {
		const now = new Date();
		const year = Random.randomInt(now.getFullYear() - 10, now.getFullYear());
		const season = randomSeason();
		const response: ResponseCollection = await $fetch(`${JikanApiAnimeRepository.API_BASE_URL}/seasons/${year}/${season}`);
		const anime = Random.randomArrayElement(response.data);
		return await this.find(new AnimeId(String(anime.mal_id)));
	}

	async find(id: AnimeId): Promise<Anime> {
		const response: ResponseItem = await $fetch(`${JikanApiAnimeRepository.API_BASE_URL}/anime/${id.value}`);

		if (response.status == 404) {
			throw new AnimeNotFoundException(`Anime with id ${id.value} not found`)
		}

		return this.toAnimeAggregate(response.data);
	}

	async save(anime: Anime): Promise<void> {
	}

}
