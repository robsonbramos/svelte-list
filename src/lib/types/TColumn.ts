import type Row from './TRow';

/**
 * @interface TColumn
 * @description Defines the types for the members of a table column.
 */
export default interface TColumn {
	/**
	 * @member key
	 * @type string
	 * @description The key corresponds to the identity value for your row. It's generally an `id` field from you database.
	 */
	key: string;
	/**
	 * @member label
	 * @type string
	 * @description Represents the label that will be render inside the header cell of the column.
	 */
	label: string;
	/**
	 * @member type
	 * @type string
	 * @description The type of a column defines how data will be rendered inside the cells.
	 */
	type?: string; // TODO: create a type for the "type" property
	/**
	 * @member sortable
	 * @type boolean
	 * @description If the data for this column should be sortable, true or false
	 */
	sortable: boolean;
	template?: (row: Row) => string;
	hint?: string;
}
