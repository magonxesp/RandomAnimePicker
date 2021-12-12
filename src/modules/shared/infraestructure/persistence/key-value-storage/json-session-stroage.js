import KeyValueStorage from "./key-value-storage";

export default class JsonSessionStroage extends KeyValueStorage {

    async get(key) {
        const json = sessionStorage.getItem(key);

        if (!json) {
            return null;
        }

        const value = JSON.parse(json);

        return value.data;
    }

    async remove(key) {
        sessionStorage.removeItem(key);
    }

    async set(key, value) {
        sessionStorage.setItem(key, JSON.stringify({data: value}));
    }

}