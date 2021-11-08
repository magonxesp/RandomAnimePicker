import AnimeRepository from "../../domain/anime-repository";
import Random from "../../../shared/domain/random";
import jikanjs from "jikanjs";
import { randomSeason } from "../../domain/anime-season";
import AnimeId from "../../domain/anime-id";
import JikanApiAnimeResponse from "./jikan-api-anime-response";

export default class JikanApiAnimeRepository extends AnimeRepository {

    /**
     * Get random anime
     *
     * @returns {Promise<Anime>}
     */
    async random() {
        const now = new Date();
        const year = Random.randomInt(now.getFullYear() - 10, now.getFullYear());
        const season = randomSeason();
        const response = await jikanjs.loadSeason(year, season);
        const animeArray = response["anime"];
        const seasonAnime = Random.randomArrayElement(animeArray);

        return await this.find(new AnimeId(seasonAnime["mal_id"]));
    }

    /**
     * Get Anime by MAL id
     *
     * @param {AnimeId} id
     *
     * @returns {Promise<Anime>}
     */
    async find(id) {
        const response = await jikanjs.loadAnime(id.value);
        const animeResponse = new JikanApiAnimeResponse(response);

        return animeResponse.toAnimeEntity();
    }

}