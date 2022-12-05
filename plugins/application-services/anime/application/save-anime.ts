import { AnimeRepository } from "~/plugins/application-services/anime/domain/anime-repository";
import { Anime } from "~/plugins/application-services/anime/domain/anime";

export class SaveAnime {

    constructor(private repository: AnimeRepository) { }

    async save(anime: Anime): Promise<void> {
        await this.repository.save(anime);
    }

}
