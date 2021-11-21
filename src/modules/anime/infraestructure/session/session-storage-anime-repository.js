import AnimeRepository from "../../domain/anime-repository";
import AnimeNotFoundException from "../../domain/exceptions/anime-not-found-exception";
import Random from "../../../shared/domain/random";
import {
    sessionStorageGetAllObjects,
    sessionStorageGetById,
    sessionStoragePersistObject
} from "../../../shared/infraestructure/persistence/session-storage";
import AnimeObject from "./anime-object";


const ANIME_STORAGE = "anime_storage";

export default class SessionStorageAnimeRepository extends AnimeRepository {

    async random() {
        let items = await sessionStorageGetAllObjects(ANIME_STORAGE);

        if (items.length === 0) {
            throw new AnimeNotFoundException();
        }

        items = items.map(item => AnimeObject.fromObject(item));
        return Random.randomArrayElement(items);
    }

    async find(id) {
        const anime = await sessionStorageGetById(ANIME_STORAGE, id.value);

        if (!anime) {
            throw new AnimeNotFoundException();
        }

        return AnimeObject.fromObject(anime);
    }

    async save(anime) {
        await sessionStoragePersistObject(ANIME_STORAGE, anime);
    }

}