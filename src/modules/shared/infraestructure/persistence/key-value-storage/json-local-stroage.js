import KeyValueStorageInterface from "./key-value-storage-interface";

export default class JsonLocalStroage extends KeyValueStorageInterface {

    async get(key) {
        const json = localStorage.getItem(key);

        if (!json) {
            return null;
        }

        const value = JSON.parse(json);

        return value.data;
    }

    async remove(key) {
        localStorage.removeItem(key);
    }

    async set(key, value) {
        localStorage.setItem(key, JSON.stringify({data: value}));
    }

}