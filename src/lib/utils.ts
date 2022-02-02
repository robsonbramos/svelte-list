import type { TRow } from './types';

export const splitRowsIntoPages = (rows: TRow[], itemsPerPage: number): TRow[][] => {
	return Array(Math.ceil(rows.length / itemsPerPage))
		.fill(undefined)
		.map((_, index) => index * itemsPerPage)
		.map((begin) => rows.slice(begin, begin + itemsPerPage));
};

export const sliceIntoPages = (rows: TRow[], itemsPerPage: number): TRow[][] => {
	const res = [];
	for (let i = 0; i < rows.length; i += itemsPerPage) {
		const chunk = rows.slice(i, i + itemsPerPage);
		res.push(chunk);
	}
	return res;
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

export const requestData = async (input: RequestInfo, init?: RequestInit): Promise<any> => {
	return await (await fetch(input, init)).json();
};
export const generateId = (len: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < len; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const urlBuilder = {
	url: null,
	params: [],
	setUrl: function (url: string): typeof urlBuilder {
		this.url = url;
		return this;
	},
	addParam: function (key: string, value: string): typeof urlBuilder {
		if (!!key && !!value) this.params = [...this.params, { key, value }];
		return this;
	},
	get: function (): string {
		let queryString = '';
		let queryArray = [];

		for (let i = 0; i < this.params.length; i++) {
			queryArray = [...queryArray, `${this.params[i].key}=${this.params[i].value}`];
		}

		queryString = queryArray.join('&');

		return `${this.url}?${queryString}`;
	}
};

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
export const mergeDeep = (target, source) => {
	const isObject = (obj) => obj && typeof obj === 'object';

	if (!isObject(target) || !isObject(source)) {
		return source;
	}

	Object.keys(source).forEach((key) => {
		const targetValue = target[key];
		const sourceValue = source[key];

		if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
			target[key] = targetValue.concat(sourceValue);
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
		} else {
			target[key] = sourceValue;
		}
	});

	return target;
};
