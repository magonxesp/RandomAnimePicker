export default class AnimeFinder {

    /**
     * AnimeFinder constructor.
     *
     * @param {AnimeRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Get random anime
     *
     * @returns {Promise<Anime>}
     */
    async random() {
        return await this.repository.random();
    }

    /**
     * Get anime by id
     *
     * @param {AnimeId} id
     *
     * @returns {Promise<Anime>}
     */
    async find(id) {
        return await this.repository.find(id);
    }

}