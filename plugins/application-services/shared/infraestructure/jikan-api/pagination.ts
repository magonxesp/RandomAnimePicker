export interface Pagination {
	last_visible_pag: number
	has_next_page: boolean
	items: {
		count: number,
		total: number,
		per_page: number
	}
}
