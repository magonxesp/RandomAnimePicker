import { v4 as uuidv4 } from "uuid";
import { HistoryRepository } from "~/plugins/application-services/history/domain/history-repository";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";
import { History } from "~/plugins/application-services/history/domain/history";
import { HistoryNotFoundException } from "~/plugins/application-services/history/domain/excepction";


export class CreateHistoryEntry {

	constructor(private repository: HistoryRepository) { }

	async createEntry(animeId: string) {
		let history;

		try {
			history = await this.repository.current();
		} catch (exception) {
			if (exception instanceof HistoryNotFoundException) {
				history = History.fromPrimitives({ id: uuidv4(), animeIds: [] });
			} else {
				throw exception
			}
		}

		history.animeIds.push(new AnimeId(animeId));
		await this.repository.save(history);
	}

}
