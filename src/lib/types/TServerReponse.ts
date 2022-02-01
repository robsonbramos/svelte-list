import type Row from './TRow';

export default interface TServerResponse {
	totalPages: number;
	totalRows: number;
	itemsPerPage: number;
	rows: Array<Row>;
}
