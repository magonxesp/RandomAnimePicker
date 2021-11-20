/**
 * @interface
 */
export default class HistoryRepository {

    /**
     * Get all history
     *
     * @returns {History[]}
     */
    all() { }

    /**
     * Save current history
     *
     * @param {History} history
     */
    save(history) { }

}