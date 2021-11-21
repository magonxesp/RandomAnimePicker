import Anime from "../../domain/anime";
import AnimeId from "../../../shared/anime/anime-id";
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

export default class AnimeObject {

    static fromObject(object) {
        return new Anime(
            new AnimeId(object.id.value),
            new AnimeTitle(
                new AnimeTitleEnglish(object.title.english.value),
                new AnimeTitleJapanese(object.title.japanese.value)
            ),
            new AnimeEpisodes(object.episodes.value),
            new AnimeDuration(object.duration.value),
            new AnimePremiered(object.premiered.value),
            new AnimeStatus(object.status.value),
            new AnimeScore(object.score.value),
            new AnimeGenres(object.genres.values),
            new AnimeRating(object.rating.value),
            new AnimeSynopsis(object.synopsis.value),
            new AnimeImage(object.image.value),
            new AnimeUrl(object.url.value)
        );
    }
    
}