import { HistoryRepository } from "~/plugins/application-services/history/domain/history-repository";
import { History } from "~/plugins/application-services/history/domain/history";

export class CurrentHistory {

    constructor(private repository: HistoryRepository) { }

    async current(): Promise<History> {
        return await this.repository.current();
    }

}
