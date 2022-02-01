import type { Row } from '.';

export default class ServerResponse {
	totalPages: number;
	totalRows: number;
	itemsPerPage: number;
	rows: Array<Row>;
}
