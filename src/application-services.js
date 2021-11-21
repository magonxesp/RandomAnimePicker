import SessionStorageAnimeRepository from "./modules/anime/infraestructure/session/session-storage-anime-repository";
import SessionStorageHistoryRepository from "./modules/history/infraestructure/session-storage/session-storage-history-repository";
import JikanApiAnimeRepository from "./modules/anime/infraestructure/jikan-api/jikan-api-anime-repository";
import SaveAnime from "./modules/anime/application/save-anime";
import CreateHistoryEntry from "./modules/history/application/create-history-entry";
import CurrentHistory from "./modules/history/application/current-history";
import AnimeFinder from "./modules/anime/application/anime-finder";

const applicationServices = { };

/**
 * Infraesctructure services
 */
applicationServices["anime_repository.session_storage"] = new SessionStorageAnimeRepository();
applicationServices["anime_repository.jikan_api"] = new JikanApiAnimeRepository();
applicationServices["history_repository.session_storage"] = new SessionStorageHistoryRepository();

/**
 * Application services
 */
applicationServices["anime_finder.api"] = new AnimeFinder(applicationServices["anime_repository.jikan_api"]);
applicationServices["anime_finder.session"] = new AnimeFinder(applicationServices["anime_repository.session_storage"]);
applicationServices["save_anime"] = new SaveAnime(applicationServices["anime_repository.session_storage"]);
applicationServices["create_history_entry"] = new CreateHistoryEntry(applicationServices["history_repository.session_storage"]);
applicationServices["current_history"] = new CurrentHistory(applicationServices["history_repository.session_storage"]);

/**
 * Get service
 *
 * @param {string} name
 *
 * @returns {any}
 */
export function service(name) {
    if (typeof applicationServices[name] === 'undefined') {
        throw new Error(`The application service ${name} does not exists`);
    }

    return applicationServices[name];
}

/**
 * Get the AnimeFinder service.
 *
 * @param {string} storage
 *      The storage type.
 *      - "api" for find on myanimelist api (default)
 *      - "session" for find on session storage
 *
 * @returns {AnimeFinder}
 */
export function animeFinder(storage = "api") {
    switch (storage) {
        case "api":
            return service("anime_finder.api");
        case "session":
            return service("anime_finder.session");
        default:
            throw new Error(`unsupported storage type ${storage}`);
    }
}

/**
 * Get the CreateHistoryEntry service.
 *
 * @returns {CreateHistoryEntry}
 */
export function createHistoryEntry() {
    return service("create_history_entry");
}

/**
 * Get the CurrentHistory service.
 *
 * @returns {CurrentHistory}
 */
export function currentHistory() {
    return service("current_history");
}

/**
 * Get the SaveAnime service.
 *
 * @returns {SaveAnime}
 */
export function saveAnime() {
    return service("save_anime");
}