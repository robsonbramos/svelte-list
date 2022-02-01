import type { Row } from '.';

/**
 * @description the column for your table
 */
export default class Column {
	key: string;
	label: string;
	type?: string; // TODO: create a type for the "type" property
	sortable: boolean;
	template?: (row: Row) => string;
	hint?: string;
}
