import AggregateRoot from "../../shared/domain/aggregate-root";

export default class History extends AggregateRoot {

    /**
     * History constructor.
     *
     * @param {HistoryId} id
     * @param {HistoryAnimeIds} animeIds
     */
    constructor(id, animeIds) {
        super();

        this.id = id;
        this.animeIds = animeIds;
    }

    getId() {
        return this.id.value;
    }

}