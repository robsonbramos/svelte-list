import type TRow from './TRow';

export default interface TRowAction {
	label: string;
	callback: (row: TRow) => void;
	type?: string;
	fn: (row) => void;
}
