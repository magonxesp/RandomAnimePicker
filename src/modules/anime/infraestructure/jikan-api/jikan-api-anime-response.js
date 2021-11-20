import Anime from "../../domain/anime";
import AnimeTitle from "../../domain/value-object/anime-title";
import AnimeTitleEnglish from "../../domain/value-object/anime-title-english";
import AnimeTitleJapanese from "../../domain/value-object/anime-title-japanese";
import AnimeEpisodes from "../../domain/value-object/anime-episodes";
import AnimeDuration from "../../domain/value-object/anime-duration";
import AnimePremiered from "../../domain/value-object/anime-premiered";
import AnimeStatus from "../../domain/value-object/anime-status";
import AnimeScore from "../../domain/value-object/anime-score";
import AnimeGenres from "../../domain/value-object/anime-genres";
import AnimeRating from "../../domain/value-object/anime-rating";
import AnimeSynopsis from "../../domain/value-object/anime-synopsis";
import AnimeImage from "../../domain/value-object/anime-image";
import AnimeUrl from "../../domain/value-object/anime-url";
import AnimeId from "../../../shared/anime/anime-id";

export default class JikanApiAnimeResponse {

    constructor(response) {
        this.response = response;
    }

    genresNames() {
        return this.response.genres.map((genre) => {
            return genre.name;
        });
    }

    toAnimeEntity() {
        return new Anime(
            new AnimeId(this.response.mal_id),
            new AnimeTitle(
                new AnimeTitleEnglish(this.response.title),
                new AnimeTitleJapanese(this.response.title_japanese)
            ),
            new AnimeEpisodes(this.response.episodes),
            new AnimeDuration(this.response.duration),
            new AnimePremiered(this.response.premiered),
            new AnimeStatus(this.response.status),
            new AnimeScore(this.response.score),
            new AnimeGenres(this.genresNames()),
            new AnimeRating(this.response.rating),
            new AnimeSynopsis(this.response.synopsis),
            new AnimeImage(this.response.image_url),
            new AnimeUrl(this.response.url)
        )
    }

}