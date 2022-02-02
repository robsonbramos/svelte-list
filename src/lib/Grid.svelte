<script lang="ts">
	import {
		pageRows,
		currentPage,
		currentSortColumn,
		rowsPerPage,
		searchTerm,
		sortOrderAsc,
		tableId,
		totalPages,
		totalRows
	} from './stores';
	import * as utils from './utils';
	import type { TColumn, TRow, TRowAction, TServerResponse } from './types';
	import { NoData, Pagination, Row, TableActions, Summary, HeaderCell } from './partials';
	import './style.min.css';
	import loadDataFromUrl from './functions/loadDataFromUrl';
	import loadDataFromServer from './functions/loadDataFromServer';
	import loadDataFromRows from './functions/loadDataFromRows';
	import { get } from 'svelte/store';

	export let columns: TColumn[] = [];
	export let rows: TRow[] = null;
	export let actions: TRowAction[] = [];

	export let itemsPerPage: number = 10;

	export let server: string = null;
	export let url: string = null;

	if (!url && !server && !rows) throw new Error('You must provide rows, url or server props');

	let isLoading: boolean = false;
	let noData: boolean = false;

	rowsPerPage.set(itemsPerPage);

	const setPageFilters = (data: TRow[]): TRow[] => {
		const sorted: TRow[] = get(currentSortColumn)
			? utils.sort(data, get(currentSortColumn), get(sortOrderAsc))
			: data;
		return get(searchTerm) ? utils.searchArray(sorted, get(searchTerm)) : sorted;
	};

	const setPageRows = (filteredData: TRow[]): void => {
		pageRows.set(
			utils.loadPageRows(utils.sliceIntoPages(filteredData, get(rowsPerPage)), get(currentPage))
		);
	};

	const setTotals = (data: TRow[]): void => {
		totalPages.set(utils.pageCount(data, get(rowsPerPage)));
		totalRows.set(data.length);
	};

	const loadData = async () => {
		isLoading = true;

		let data: TRow[];

		if (!!rows && rows.length > 0) {
			data = await loadDataFromRows(rows);
			setPageFilters(data);
			setPageRows(data);
			setTotals(data);
		}

		if (!!url) {
			data = await loadDataFromUrl(url);
			setPageFilters(data);
			setPageRows(data);
			setTotals(data);
		}

		if (!!server) {
			const res: TServerResponse = await loadDataFromServer(server, {
				currentPage: get(currentPage),
				rowsPerPage: get(rowsPerPage),
				searchTerm: get(searchTerm),
				currentSortColumn: get(currentSortColumn),
				sortOrderAsc: get(sortOrderAsc)
			});

			data = res.rows || [];

			setPageRows(data);
			setTotals(data);
		}

		if (columns.length <= 0) {
			let columnsArray = [];
			let keys = Object.keys($pageRows[0]);
			for (let i = 0; i < keys.length; i++) {
				columnsArray = [...columnsArray, { key: keys[i] }];
			}
			columns = columnsArray;
		}

		console.log(columns);

		isLoading = false;
	};

	$: rows,
		$currentPage,
		$currentSortColumn,
		$rowsPerPage,
		$searchTerm,
		$sortOrderAsc,
		noData,
		loadData();
</script>

<!-- <TableActions /> -->

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto">
		<div class="py-2 align-middle inline-block min-w-full">
			<div class="overflow-hidden border-b border-gray-200">
				{#if isLoading}
					<div
						class="bg-white opacity-75 w-100 h-100 position-absolute d-flex justify-content-center align-items-center"
					>
						<span>LOADING...</span>
					</div>
				{/if}
				<table id={$tableId} class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							{#if columns}
								{#each columns as col}
									<HeaderCell {col} />
								{/each}
							{:else}
								{#each Object.keys($pageRows[0]) as label}
									<th>{label}</th>
								{/each}
							{/if}

							{#if actions.length > 0}
								<th
									class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Actions
								</th>
							{/if}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#if noData}
							<tr>
								<td colspan={columns.length + (actions.length > 0 && 1)}>
									<NoData />
								</td>
							</tr>
						{:else}
							{#each $pageRows as row}
								<Row {row} {columns} {actions} on:clickRow />
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<div class="mt-2 px-4 gap-2 flex flex-col md:flex-row md:text-center justify-between align-middle">
	<Summary totalPages={$totalPages} totalRows={$totalRows} {noData} {isLoading} />
	<Pagination totalPages={$totalPages} {noData} on:pageChange />
	<div>
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-400"
		>
			&copy; Svelte List
		</span>
	</div>
</div>
