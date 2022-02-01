import type { TRow, TServerResponse } from './types';

export const splitRowsIntoPages = (rows: TRow[], itemsPerPage: number): TRow[][] => {
	return Array(Math.ceil(rows.length / itemsPerPage))
		.fill(undefined)
		.map((_, index) => index * itemsPerPage)
		.map((begin) => rows.slice(begin, begin + itemsPerPage));
};

export const countRows = (rows: TRow[]): number => {
	return rows.length;
};

export const pageCount = (rows: TRow[], itemsPerPage: number): number => {
	return Math.ceil(countRows(rows) / itemsPerPage);
};

export const loadPageRows = (pages: TRow[][], page: number): TRow[] => {
	return pages.length > 0 && page - 1 >= 0 ? pages[page - 1] : [];
};

export const searchArray = (arr: TRow[], txt: string): TRow[] => {
	return arr.filter((row: TRow) =>
		Object.keys(row).some((key: string) =>
			row[key].toString().toLowerCase().includes(txt.toString().toLowerCase())
		)
	);
};

export const sort = (rows: TRow[], key: string, asc = true): TRow[] => {
	return rows.sort((a, b) => (asc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
};

export const requestData = async (url: string): Promise<TServerResponse> => {
	return await (await fetch(url)).json();
};
export const generateId = (len: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < len; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};
