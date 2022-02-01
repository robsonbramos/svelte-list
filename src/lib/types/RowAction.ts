import type { Row } from '.';

export default class RowAction {
	label: string;
	callback: (row: Row) => void;
	type?: string;
	fn: () => void;
}
