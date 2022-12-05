import { KeyValueStorage } from "~/plugins/application-services/shared/infraestructure/persistence/key-value-storage/key-value-storage";


export class JsonSessionStroage implements KeyValueStorage {

    async get<T>(key: string): Promise<T|null> {
        const json = sessionStorage.getItem(key);

        if (!json) {
            return null;
        }

        const value = JSON.parse(json);

        return value.data;
    }

    async remove(key: string): Promise<void> {
        sessionStorage.removeItem(key);
    }

    async set<T>(key: string, value: T): Promise<void> {
        sessionStorage.setItem(key, JSON.stringify({data: value}));
    }

}
