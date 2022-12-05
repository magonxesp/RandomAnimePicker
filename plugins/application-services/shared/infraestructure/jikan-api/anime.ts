interface AnimeImage {
	image_url: string
	small_image_url: string
	large_image_url: string
}

type AnimeImagesTypes = "jpg" | "webp"

type AnimeImages = {
	[key in AnimeImagesTypes]: AnimeImage
}

interface AnimeAired {
	from: string
	to: string
}

interface AnimeGenre {
	mal_id: number
	type: string
	name: string
	url: string
}

export interface Anime {
	mal_id: number
	url: string
	title: string
	title_english: string|null
	title_japanese: string
	synopsis: string
	type: string
	episodes: number
	duration: string
	status: string
	premiered: string
	score: number
	rating: string
	images: AnimeImages
	airing: boolean
	aired: AnimeAired
	season: string
	genres: AnimeGenre[]
	explicit_genres: AnimeGenre[]
}
