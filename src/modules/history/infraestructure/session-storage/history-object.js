import History from "../../domain/history";
import HistoryId from "../../domain/value-object/history-id";
import HistoryAnimeIds from "../../domain/value-object/history-anime-ids";


export default class HistoryObject {

    /**
     * Parse history instance from object
     *
     * @param {Object} object
     */
    static fromObject(object) {
        return new History(
            new HistoryId(object.id.value),
            new HistoryAnimeIds(object.animeIds.animeIds)
        );
    }

}