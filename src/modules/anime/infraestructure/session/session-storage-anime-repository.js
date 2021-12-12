import AnimeRepository from "../../domain/anime-repository";
import AnimeNotFoundException from "../../domain/exceptions/anime-not-found-exception";
import Random from "../../../shared/domain/random";
import AnimeObject from "./anime-object";
import { sessionStorage } from "../../../shared/infraestructure/persistence/key-value-storage/json-key-value-storage";


const ANIME_STORAGE = "anime_storage";

export default class SessionStorageAnimeRepository extends AnimeRepository {

    async random() {
        let items = await sessionStorage().getAllObjects(ANIME_STORAGE);

        if (items.length === 0) {
            throw new AnimeNotFoundException();
        }

        items = items.map(item => AnimeObject.fromObject(item));
        return Random.randomArrayElement(items);
    }

    async find(id) {
        const anime = await sessionStorage().getById(ANIME_STORAGE, id.value);

        if (!anime) {
            throw new AnimeNotFoundException();
        }

        return AnimeObject.fromObject(anime);
    }

    async save(anime) {
        await sessionStorage().persistObject(ANIME_STORAGE, anime);
    }

}