import { KeyValueStorage } from "~/plugins/application-services/shared/infraestructure/persistence/key-value-storage/key-value-storage";

export class JsonLocalStroage implements KeyValueStorage {

    async get<T>(key: string): Promise<T|null> {
        const json = localStorage.getItem(key);

        if (!json) {
            return null;
        }

        const value = JSON.parse(json);

        return value.data;
    }

    async remove(key: string): Promise<void> {
        localStorage.removeItem(key);
    }

    async set<T>(key: string, value: T): Promise<void> {
        localStorage.setItem(key, JSON.stringify({ data: value }));
    }

}
