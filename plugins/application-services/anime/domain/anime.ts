import { AggregateRoot } from "~/plugins/application-services/shared/domain/aggregate-root";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";
import {
	AnimeDuration,
	AnimeEpisodes,
	AnimeGenres,
	AnimeImage,
	AnimePremiered,
	AnimeRating,
	AnimeScore,
	AnimeStatus,
	AnimeSynopsis,
	AnimeTitle,
	AnimeUrl
} from "~/plugins/application-services/anime/domain/value-object";
import { AnimeSeason, seasonFromValue } from "~/plugins/application-services/anime/domain/anime-season";

export type AnimePrimitives = {
	id: number,
	titleEnglish: string,
	titleJapanese: string,
	synopsis: string,
	season: string,
	image: string,
	episodes: number,
	duration: string,
	premiered: string,
	status: string,
	score: number,
	genres: string[],
	rating: string,
	url: string
}

export class Anime extends AggregateRoot {
	constructor(
		public readonly id: AnimeId,
		public readonly titleEnglish: AnimeTitle,
		public readonly titleJapanese: AnimeTitle,
		public readonly synopsis: AnimeSynopsis,
		public readonly season: AnimeSeason,
		public readonly image: AnimeImage,
		public readonly episodes: AnimeEpisodes,
		public readonly duration: AnimeDuration,
		public readonly premiered: AnimePremiered,
		public readonly status: AnimeStatus,
		public readonly score: AnimeScore,
		public readonly genres: AnimeGenres,
		public readonly rating: AnimeRating,
		public readonly url: AnimeUrl
	) {
		super();
	}

	getId() {
		return this.id.value;
	}

	toPrimitives(): AnimePrimitives {
		return {
			id: Number(this.id.value),
			titleEnglish: this.titleEnglish.value,
			titleJapanese: this.titleJapanese.value,
			synopsis: this.synopsis.value,
			season: this.season.toString(),
			image: this.image.value,
			episodes: this.episodes.value,
			duration: this.duration.value,
			premiered: this.premiered.value,
			status: this.status.value,
			score: this.score.value,
			genres: this.genres.values,
			rating: this.rating.value,
			url: this.url.value
		}
	}

	static fromPrimitives(primitives: AnimePrimitives) {
		return new Anime(
			new AnimeId(String(primitives.id)),
			new AnimeTitle(primitives.titleEnglish),
			new AnimeTitle(primitives.titleJapanese),
			new AnimeSynopsis(primitives.synopsis),
			seasonFromValue(primitives.season),
			new AnimeImage(primitives.image),
			new AnimeEpisodes(primitives.episodes),
			new AnimeDuration(primitives.duration),
			new AnimePremiered(primitives.premiered),
			new AnimeStatus(primitives.status),
			new AnimeScore(primitives.score),
			new AnimeGenres(primitives.genres),
			new AnimeRating(primitives.rating),
			new AnimeUrl(primitives.url)
		)
	}

}
