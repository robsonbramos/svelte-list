export default interface TServerRequest {
	url: string;
	page: number;
	itemsPerPage: number;
	search: string;
	sortColumn: string;
	sortOrderAsc: boolean;
}
