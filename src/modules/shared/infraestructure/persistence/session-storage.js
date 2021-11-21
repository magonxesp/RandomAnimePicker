/**
 * Save value to session storage
 *
 * @param {string} key
 * @param {any} value
 */
export async function sessionStorageSave(key, value) {
    sessionStorage.setItem(key, JSON.stringify({data: value}));
}

/**
 * Get session storage value
 *
 * @param {string} key
 * @returns {Promise<any|null>}
 */
export async function sessionStorageGet(key) {
    const json = sessionStorage.getItem(key);

    if (!json) {
        return null;
    }

    const storage = JSON.parse(json);

    return storage.data;
}

/**
 * Persist Aggregate Root
 *
 * @param {string} key
 * @param {Object} object
 *
 * @returns {Promise<void>}
 */
export async function sessionStoragePersistObject(key, object) {
    let storage = await sessionStorageGet(key);

    if (!storage) {
        storage = {};
    }

    storage[object.getId()] = object;

    await sessionStorageSave(key, storage);
}

/**
 * Get all persisted aggregate roots
 *
 * @param {string} key
 * @returns {Promise<Object[]>}
 */
export async function sessionStorageGetAllObjects(key) {
    const items = await sessionStorageGet(key);
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
export async function sessionStorageGetById(key, id) {
    const items = await sessionStorageGet(key);

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
export async function sessionStorageRemove(key) {
    sessionStorage.removeItem(key);
}