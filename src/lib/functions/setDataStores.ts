import type { TRow } from '$lib/types';
import * as utils from '$lib/utils';
import { get } from 'svelte/store';

export default (
	data: TRow[],
	{
		totalPages,
		totalRows,
		rowsPerPage,
		pageRows,
		currentSortColumn,
		sortOrderAsc,
		searchTerm,
		currentPage
	}
): void => {
	totalPages.set(utils.pageCount(data, get(rowsPerPage)));
	totalRows.set(data.length);

	const sorted: TRow[] = get(currentSortColumn)
		? utils.sort(data, get(currentSortColumn), get(sortOrderAsc))
		: data;
	const filtered: TRow[] = get(searchTerm) ? utils.searchArray(sorted, get(searchTerm)) : sorted;

	pageRows.set(
		utils.loadPageRows(utils.sliceIntoPages(filtered, get(rowsPerPage)), get(currentPage))
	);
};
