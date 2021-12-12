import HistoryRepository from "../../domain/history-repository";
import HistoryObject from "./history-object";
import { sessionStorage } from "../../../shared/infraestructure/persistence/key-value-storage/json-key-value-storage";

const HISTORY_STORAGE = "history_storage";

export default class SessionStorageHistoryRepository extends HistoryRepository {

    async all() {
        const items = await sessionStorage().getAllObjects(HISTORY_STORAGE);

        return items.map(item => HistoryObject.fromObject(item));
    }

    async save(history) {
        await sessionStorage().persistObject(HISTORY_STORAGE, history);
    }

    async current() {
        const all = await this.all();

        return all.shift();
    }
}