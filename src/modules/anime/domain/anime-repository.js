/**
 * @interface
 */
export default class AnimeRepository {

    /**
     * Return random Anime id
     *
     * @returns {Promise<Anime>}
     *
     * @abstract
     */
    async random() { }

    /**
     * Find Anime by id
     *
     * @param {AnimeId} id
     *
     * @returns {Promise<Anime>}
     *
     * @abstract
     */
    async find(id) { }

    /**
     * Save Anime
     *
     * @param {Anime} anime
     *
     * @returns {Promise<void>}
     *
     * @abstract
     */
    async save(anime) { }

}