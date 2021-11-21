/**
 * @interface
 */
export default class KeyValueStorageInterface {

    /**
     * Get object by key
     *
     * @param {string} key
     *
     * @returns {Promise<any|null>}
     *
     * @abstract
     */
    async get(key) { }

    /**
     * Save value by key
     *
     * @param {string} key
     * @param {any} value
     *
     * @returns {Promise<void>}
     *
     * @abstract
     */
    async set(key, value) { }

    /**
     * Remove value by key
     *
     * @param {string} key
     *
     * @returns {Promise<void>}
     *
     * @abstract
     */
    async remove(key) { }

}