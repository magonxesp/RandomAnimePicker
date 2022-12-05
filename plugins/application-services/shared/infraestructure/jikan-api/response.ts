import { Anime } from "~/plugins/application-services/shared/infraestructure/jikan-api/anime";
import { Pagination } from "~/plugins/application-services/shared/infraestructure/jikan-api/pagination";

export interface ResponseError {
	status?: number
	type?: string
	message?: string
	error?: string
}

export interface ResponseCollection extends ResponseError {
	data: Anime[]
	pagination: Pagination
}

export interface ResponseItem extends ResponseError {
	data: Anime
}


