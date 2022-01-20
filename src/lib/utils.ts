import type { Row } from './types';

export const splitRowsIntoPages = (rows: [], itemsPerPage: number): never[][] => {
	return Array(Math.ceil(rows.length / itemsPerPage))
		.fill()
		.map((_, index) => index * itemsPerPage)
		.map((begin) => rows.slice(begin, begin + itemsPerPage));
};
export const countRows = (rows: []): number => {
	return rows.length;
};
export const pageCount = (rows: [], itemsPerPage: number): number => {
	return Math.ceil(countRows(rows) / itemsPerPage);
};
export const loadPageRows = (pages: [], page: number): [] => {
	return pages.length > 0 && page - 1 >= 0 ? pages[page - 1] : [];
};
export const searchArray = (arr: [], txt: string) => {
	return arr.filter((o) =>
		Object.keys(o).some((k) => o[k].toString().toLowerCase().includes(txt.toString().toLowerCase()))
	);
};
export const sort = (rows: [], key: string, asc = true): [] => {
	return rows.sort((a, b) => (asc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
};
export const requestData = async (url: string): Promise<Row> => {
	return await (await fetch(url)).json();
};
export const generateId = (len) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < len; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};
