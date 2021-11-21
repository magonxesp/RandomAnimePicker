import HistoryRepository from "../../domain/history-repository";
import HistoryObject from "./history-object";
import {
    sessionStorageGetAllObjects,
    sessionStoragePersistObject,
} from "../../../shared/infraestructure/persistence/session-storage";


const HISTORY_STORAGE = "history_storage";

export default class SessionStorageHistoryRepository extends HistoryRepository {

    async all() {
        const items = await sessionStorageGetAllObjects(HISTORY_STORAGE);

        return items.map(item => HistoryObject.fromObject(item));
    }

    async save(history) {
        await sessionStoragePersistObject(HISTORY_STORAGE, history);
    }

    async current() {
        const all = await this.all();

        return all.shift();
    }
}