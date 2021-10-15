export interface  CustomPage<T> {
	content: Array<T>,
    pageNumber: number,
	pageSize: number,
	totalElements: number,
}