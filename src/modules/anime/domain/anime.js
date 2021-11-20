export default class Anime {

    /**
     * Anime constructor.
     *
     * @param {AnimeId} id
     * @param {AnimeTitle} title
     * @param {AnimeEpisodes} episodes
     * @param {AnimeDuration} duration
     * @param {AnimePremiered} premiered
     * @param {AnimeStatus} status
     * @param {AnimeScore} score
     * @param {AnimeGenres} genres
     * @param {AnimeRating} rating
     * @param {AnimeSynopsis} synopsis
     * @param {AnimeImage} image
     * @param {AnimeUrl} url
     */
    constructor(
        id,
        title,
        episodes,
        duration,
        premiered,
        status,
        score,
        genres,
        rating,
        synopsis,
        image,
        url
    ) {
        this.id = id;
        this.title = title;
        this.episodes = episodes;
        this.duration = duration;
        this.premiered = premiered;
        this.status = status;
        this.score = score;
        this.genres = genres;
        this.rating = rating;
        this.synopsis = synopsis;
        this.image = image;
        this.url = url;
    }

}