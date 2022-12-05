import { Random } from "~/plugins/application-services/shared/domain/random";
import { InvalidAnimeSeasonException } from "~/plugins/application-services/anime/domain/exception";

export enum AnimeSeason {
    SUMMER = "summer",
    SPRING = "spring",
    FALL = "fall",
    WINTER = "winter"
}

type AnimeSeasonKey = keyof typeof AnimeSeason

export function randomSeason(): AnimeSeason {
    const seasons = (Object.keys(AnimeSeason) as AnimeSeasonKey[]).map(key => AnimeSeason[key]);
    return Random.randomArrayElement(seasons);
}

export function seasonFromValue(value: string): AnimeSeason {
	const seasons = (Object.keys(AnimeSeason) as AnimeSeasonKey[]).map(key => AnimeSeason[key]);
	const season = seasons.filter(season => season == value).shift()

	if (!season) {
		throw new InvalidAnimeSeasonException(`The season ${value} is not a valid season`);
	}

	return season
}
