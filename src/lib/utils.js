export const splitRowsIntoPages = (rows, itemsPerPage) =>
	Array(Math.ceil(rows.length / parseInt(itemsPerPage)))
		.fill()
		.map((_, index) => index * parseInt(itemsPerPage))
		.map((begin) => rows.slice(begin, begin + parseInt(itemsPerPage)));
export const countRows = (rows) => rows.length;
export const pageCount = (rows, itemsPerPage) => Math.ceil(countRows(rows) / itemsPerPage);
export const loadPageRows = (pages, page) =>
	pages.length > 0 && page - 1 >= 0 ? pages[page - 1] : [];
export const searchArray = (arr, txt) =>
	arr.filter((o) =>
		Object.keys(o).some((k) => o[k].toString().toLowerCase().includes(txt.toString().toLowerCase()))
	);
export const sort = (rows, key, asc = true) =>
	rows.sort((a, b) => (asc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])));
export const requestData = async (url) => await (await fetch(url)).json();
export const generateId = (len) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < len; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};
