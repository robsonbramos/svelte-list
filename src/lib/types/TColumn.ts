import type Row from './TRow';

export default interface TColumn {
	key: string;
	label: string;
	type?: string; // TODO: create a type for the "type" property
	sortable: boolean;
	template?: (row: Row) => string;
	hint?: string;
}
