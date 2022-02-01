import type { Row, ServerResponse } from './types';

export const splitRowsIntoPages = (rows: Row[], itemsPerPage: number): Row[][] => {
	return Array(Math.ceil(rows.length / itemsPerPage))
		.fill(undefined)
		.map((_, index) => index * itemsPerPage)
		.map((begin) => rows.slice(begin, begin + itemsPerPage));
};

export const countRows = (rows: Row[]): number => {
	return rows.length;
};

export const pageCount = (rows: Row[], itemsPerPage: number): number => {
	return Math.ceil(countRows(rows) / itemsPerPage);
};

export const loadPageRows = (pages: [], page: number): [] => {
	return pages.length > 0 && page - 1 >= 0 ? pages[page - 1] : [];
};

export const searchArray = (arr: [], txt: string): Row[] => {
	return arr.filter((row: Row) =>
		Object.keys(row).some((key: string) =>
			row[key].toString().toLowerCase().includes(txt.toString().toLowerCase())
		)
	);
};

export const sort = (rows: Row[], key: string, asc = true): Row[] => {
	return rows.sort((a, b) => (asc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
};

export const requestData = async (url: string): Promise<ServerResponse> => {
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
