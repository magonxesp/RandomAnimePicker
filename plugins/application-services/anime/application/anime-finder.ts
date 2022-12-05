import { AnimeRepository } from "~/plugins/application-services/anime/domain/anime-repository";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { AnimeId } from "~/plugins/application-services/shared/domain/anime/anime-id";

export class AnimeFinder {

    constructor(private repository: AnimeRepository) { }

    async random(): Promise<Anime> {
        return await this.repository.random();
    }

    async find(id: string): Promise<Anime> {
        return await this.repository.find(new AnimeId(id));
    }

}
