import type TRow from './TRow';

export default interface TServerResponse {
	totalPage?: number;
	totalRows?: number;
	itemsPerPage?: number;
	rows: Array<TRow>;
}
