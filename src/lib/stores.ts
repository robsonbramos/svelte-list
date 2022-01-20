import { readable, writable } from 'svelte/store';
import { generateId } from './utils.js';

export const pageRows = writable([]);
export const currentPage = writable(1);
export const currentSortColumn = writable(null);
export const sortOrderAsc = writable(true);
export const searchTerm = writable('');
export const rowsPerPage = writable(10);
export const tableId = readable(generateId(8));
