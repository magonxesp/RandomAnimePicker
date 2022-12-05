import { Anime } from "~/plugins/application-services/shared/infraestructure/jikan-api/anime";
import { Pagination } from "~/plugins/application-services/shared/infraestructure/jikan-api/pagination";

export interface ResponseCollection {
	data: Anime[]
	pagination: Pagination
}

export interface ResponseItem {
	data: Anime
}
