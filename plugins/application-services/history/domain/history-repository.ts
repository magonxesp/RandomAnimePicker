import { History } from "~/plugins/application-services/history/domain/history";

export interface HistoryRepository {
    all(): Promise<History[]>
    current(): Promise<History>
    save(history: History): Promise<void>
}
