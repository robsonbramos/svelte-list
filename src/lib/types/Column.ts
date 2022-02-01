import type { Row } from '.';

export default class Column {
	key: string;
	label: string;
	type?: string; // TODO: create a type for the "type" property
	sortable: boolean;
	template?: (row: Row) => string;
	hint?: string;
}
