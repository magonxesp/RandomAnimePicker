export default class HistoryAnimeIds {

    /**
     * HistoryAnimeIds constructor.
     *
     * @param {AnimeId[]} animeIds
     */
    constructor(animeIds = []) {
        this.animeIds = animeIds;
    }

    /**
     * Add anime id to the history
     *
     * @param {AnimeId} animeId
     */
    add(animeId) {
        this.animeIds.push(animeId);
    }

}