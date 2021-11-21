import History from "../domain/history";
import HistoryId from "../domain/value-object/history-id";
import { v4 as uuidv4 } from "uuid";
import HistoryAnimeIds from "../domain/value-object/history-anime-ids";


export default class CreateHistoryEntry {

    /**
     * CreateHistoryEntry constructor.
     *
     * @param {HistoryRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Add anime to the history
     *
     * @param {AnimeId} animeId
     */
    async createEntry(animeId) {
        let history = await this.repository.current();

        if (!history) {
            history = new History(new HistoryId(uuidv4()), new HistoryAnimeIds([]));
        }

        history.animeIds.add(animeId);

        await this.repository.save(history);
    }

}