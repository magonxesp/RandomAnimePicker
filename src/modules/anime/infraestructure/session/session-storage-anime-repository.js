import AnimeRepository from "../../domain/anime-repository";
import AnimeNotFoundException from "../../domain/exceptions/anime-not-found-exception";
import Random from "../../../shared/domain/random";


const ANIME_ITEM = "anime_item";
const ANIME_ITEMS = "anime_items";

export default class SessionStorageAnimeRepository extends AnimeRepository {

    async random() {
        const json = sessionStorage.getItem(ANIME_ITEMS);

        if (!json) {
            throw new AnimeNotFoundException();
        }

        const items = JSON.parse(json);
        const itemKey = Random.randomArrayElement(items);

        return JSON.parse(sessionStorage.getItem(itemKey));
    }

    async find(id) {
        const json = sessionStorage.getItem(`${ANIME_ITEM}_${id.value}`);

        if (!json) {
            throw new AnimeNotFoundException();
        }

        const anime = JSON.parse(json);

        if (!anime) {
            throw new AnimeNotFoundException();
        }

        return anime;
    }

    async save(anime) {
        let items = [];
        const itemKey = `${ANIME_ITEM}_${anime.id.value}`;
        const json = sessionStorage.getItem(ANIME_ITEMS);

        if (json) {
            items = JSON.parse(json);
        }

        if (items.filter(_itemKey => _itemKey === itemKey).length === 0) {
            items.push(itemKey);
        }

        sessionStorage.setItem(itemKey, JSON.stringify(anime));
        sessionStorage.setItem(ANIME_ITEMS, JSON.stringify(items));
    }

}