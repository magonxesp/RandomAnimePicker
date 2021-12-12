import JsonSessionStroage from "./json-session-stroage";
import JsonLocalStroage from "./json-local-stroage";


export class JsonKeyValueStorage {

    /**
     * KeyValueStorage constructor.
     *
     * @param {KeyValueStorage} storage
     */
    constructor(storage) {
        this.storage = storage;
    }

    /**
     * Save value to session storage
     *
     * @param {string} key
     * @param {any} value
     */
    async save(key, value) {
        await this.storage.set(key, value);
    }

    /**
     * Get session storage value
     *
     * @param {string} key
     * @returns {Promise<any|null>}
     */
    async get(key) {
        return await this.storage.get(key);
    }

    /**
     * Persist Aggregate Root
     *
     * @param {string} key
     * @param {Object} object
     *
     * @returns {Promise<void>}
     */
    async persistObject(key, object) {
        let storage = await this.get(key);

        if (!storage) {
            storage = {};
        }

        storage[object.getId()] = object;

        await this.save(key, storage);
    }

    /**
     * Get all persisted aggregate roots
     *
     * @param {string} key
     * @returns {Promise<Object[]>}
     */
    async getAllObjects(key) {
        const items = await this.get(key);
        let arrayItems = [];

        for (let id in items) {
            arrayItems.push(items[id]);
        }

        return arrayItems;
    }

    /**
     * Get session storage aggregate root by id
     *
     * @param {string} key
     * @param {string} id
     *
     * @returns {Promise<any|null>}
     */
    async getById(key, id) {
        const items = await this.get(key);

        if (!items || Object.keys(items).length === 0) {
            return null;
        }

        if (typeof items[id] === 'undefined') {
            return null;
        }

        return items[id];
    }

    /**
     * Remove storage on session storage
     *
     * @param {string} key
     * @returns {Promise<void>}
     */
    async remove(key) {
        await this.storage.remove(key);
    }

}

/**
 * Get session storage
 *
 * @returns {JsonKeyValueStorage}
 */
export function sessionStorage() {
    return new JsonKeyValueStorage(new JsonSessionStroage());
}

/**
 * Get local storage
 *
 * @returns {JsonKeyValueStorage}
 */
export function localStorage() {
    return new JsonKeyValueStorage(new JsonLocalStroage());
}