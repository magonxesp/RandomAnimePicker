import { AggregateRoot } from "~/plugins/application-services/shared/domain/aggregate-root";
import { HistoryId } from "~/plugins/application-services/shared/domain/history/history-id";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";


export type HistoryPrimitives = {
	id: string,
	animeIds: string[]
}

export class History extends AggregateRoot {

    constructor(
			public readonly id: HistoryId,
			public readonly animeIds: AnimeId[]
		) {
        super();
    }

    getId() {
        return this.id.value;
    }

		toPrimitives(): HistoryPrimitives {
			return {
				id: this.id.value,
				animeIds: this.animeIds.map(id => id.value)
			}
		}

		static fromPrimitives(primitives: HistoryPrimitives): History {
			return new History(
				new HistoryId(primitives.id),
				primitives.animeIds.map(id => new AnimeId(id))
			)
		}

}
