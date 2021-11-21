/**
 * @interface
 */
export default class HistoryRepository {

    /**
     * Get all history
     *
     * @returns {Promise<History[]>}
     *
     * @abstract
     */
    async all() { }

    /**
     * Get current history
     *
     * @returns {Promise<History|null>}
     *
     * @abstract
     */
    async current() { }

    /**
     * Save current history
     *
     * @param {History} history
     *
     * @abstract
     */
    async save(history) { }

}