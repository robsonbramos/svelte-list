import { readable, writable } from 'svelte/store';
import { generateId } from './utils.js';

export let pageRows = writable([]);
export let currentPage = writable(1);
export let currentSortColumn = writable(null);
export let sortOrderAsc = writable(true);
export let lastAction = writable(true);
export let searchTerm = writable('');
export let rowsPerPage = writable(10);
export const tableId = readable(generateId(8));
