import { HistoryRepository } from "~/plugins/application-services/history/domain/history-repository";
import { History, HistoryPrimitives } from "~/plugins/application-services/history/domain/history";
import { HistoryNotFoundException } from "~/plugins/application-services/history/domain/excepction";
import {
	KeyValueStorage
} from "~/plugins/application-services/shared/infraestructure/persistence/key-value-storage/key-value-storage";

const HISTORY_STORAGE = "history_storage";

export class KeyValueStorageHistoryRepository implements HistoryRepository {

	constructor(private keyValueStorage: KeyValueStorage) { }

	async all(): Promise<History[]> {
		const items = await this.keyValueStorage.get<HistoryPrimitives[]>(HISTORY_STORAGE) ?? []
		return items.map(item => History.fromPrimitives(item))
	}

	async save(history: History): Promise<void> {
		const items = (await this.keyValueStorage.get<HistoryPrimitives[]>(HISTORY_STORAGE) ?? [])
			.filter(item => item.id != history.id.value)

		items.push(history.toPrimitives())

		await this.keyValueStorage.set<HistoryPrimitives[]>(HISTORY_STORAGE, items)
	}

	async current(): Promise<History> {
		const items = await this.all();
		const history = items.shift();

		if (!history) {
			throw new HistoryNotFoundException()
		}

		return history
	}
}
