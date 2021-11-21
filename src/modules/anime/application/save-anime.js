export default class SaveAnime {

    /**
     * SaveAnime constructor.
     *
     * @param {AnimeRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Save the anime object
     *
     * @param {Anime} anime
     * 
     * @returns {Promise<void>}
     */
    async save(anime) {
        await this.repository.save(anime);
    }

}