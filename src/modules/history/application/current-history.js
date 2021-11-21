export default class CurrentHistory {

    /**
     * CurrentHistory constructor.
     *
     * @param {HistoryRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Get current history
     *
     * @returns {Promise<History|null>}
     */
    async current() {
        return await this.repository.current();
    }

}