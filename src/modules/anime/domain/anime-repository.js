/**
 * @interface
 */
export default class AnimeRepository {

    /**
     * Return random Anime id
     *
     * @returns {Promise<Anime>}
     */
    async random() { }

    /**
     * Find Anime by id
     *
     * @param {AnimeId} id
     *
     * @returns {Promise<Anime>}
     */
    async find(id) { }

    /**
     * Save Anime
     *
     * @param {Anime} anime
     *
     * @returns {Promise<void>}
     */
    async save(anime) { }

}