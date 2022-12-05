import { AnimeRepository } from "~/plugins/application-services/anime/domain/anime-repository";
import { AnimeNotFoundException } from "~/plugins/application-services/anime/domain/exception";
import { Random } from "~/plugins/application-services/shared/domain/random";
import { Anime, AnimePrimitives } from "~/plugins/application-services/anime/domain/anime";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";
import { KeyValueStorage } from "~/plugins/application-services/shared/infraestructure/persistence/key-value-storage/key-value-storage";

const ANIME_STORAGE = "anime_storage";

export class KeyValueAnimeRepository implements AnimeRepository {

	constructor(private keyValueStorage: KeyValueStorage) { }

	async random(): Promise<Anime> {
		let items = await this.keyValueStorage.get<AnimePrimitives[]>(ANIME_STORAGE) ?? [];

		if (items.length === 0) {
			throw new AnimeNotFoundException();
		}

		return Random.randomArrayElement(items.map(item => Anime.fromPrimitives(item)));
	}

	async find(id: AnimeId): Promise<Anime> {
		const animes = await this.keyValueStorage.get<AnimePrimitives[]>(ANIME_STORAGE) ?? [];
		const anime = animes.filter(item => String(item.id) == id.value).shift();

		if (!anime) {
			throw new AnimeNotFoundException();
		}

		return Anime.fromPrimitives(anime);
	}

	async save(anime: Anime) {
		const items = (await this.keyValueStorage.get<AnimePrimitives[]>(ANIME_STORAGE) ?? [])
			.filter(item => String(item.id) != anime.id.value)

		items.push(anime.toPrimitives())

		await this.keyValueStorage.set<AnimePrimitives[]>(ANIME_STORAGE, items);
	}

}
