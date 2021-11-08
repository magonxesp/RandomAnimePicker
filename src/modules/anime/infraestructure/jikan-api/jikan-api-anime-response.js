import Anime from "../../domain/anime";
import AnimeTitle from "../../domain/anime-title";
import AnimeTitleEnglish from "../../domain/anime-title-english";
import AnimeTitleJapanese from "../../domain/anime-title-japanese";
import AnimeEpisodes from "../../domain/anime-episodes";
import AnimeDuration from "../../domain/anime-duration";
import AnimePremiered from "../../domain/anime-premiered";
import AnimeStatus from "../../domain/anime-status";
import AnimeScore from "../../domain/anime-score";
import AnimeGenres from "../../domain/anime-genres";
import AnimeRating from "../../domain/anime-rating";
import AnimeSynopsis from "../../domain/anime-synopsis";
import AnimeImage from "../../domain/anime-image";
import AnimeUrl from "../../domain/anime-url";

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