<script lang="ts">
	import {
		pageRows,
		currentPage,
		currentSortColumn,
		rowsPerPage,
		searchTerm,
		sortOrderAsc,
		tableId
	} from './stores';
	import * as utils from './utils';
	import { NoData, Pagination, Row, TableActions, Summary, HeaderCell } from './partials';
	import type { Row as TypeRow } from './types';
	import './style.min.css';

	export let columns = [];
	export let rows: TypeRow[] = [];
	export let actions = [];
	export let itemsPerPage = 10;
	export let server = null;

	if (rows.length <= 0 && !server) throw new Error('You must provide rows or server props');

	let totalPages: number;
	let totalRows: number;

	let isLoading: boolean = false;
	let noData: boolean = false;

	rowsPerPage.set(itemsPerPage);

	const loadData = async () => {
		isLoading = true;

		if (server) {
			let url = `${server}?page=${$currentPage}&itemsPerPage=${$rowsPerPage}&search=${$searchTerm}&sortColumn=${$currentSortColumn}&sortOrderAsc=${$sortOrderAsc}&filter={}`;
			let data = await utils.requestData(url);

			totalPages = data.totalPages;
			totalRows = data.totalRows;

			pageRows.set(data.rows);
			// FIXME: Maybe we shouldn't update the rowsPerPage with the value coming from the server
			rowsPerPage.set(data.itemsPerPage);
		} else {
			totalPages = utils.pageCount(rows, $rowsPerPage);
			totalRows = utils.countRows(rows);

			let sorted = $currentSortColumn ? utils.sort(rows, $currentSortColumn, $sortOrderAsc) : rows;
			let filtered = $searchTerm ? utils.searchArray(sorted, $searchTerm) : sorted;
			pageRows.set(
				await utils.loadPageRows(utils.splitRowsIntoPages(filtered, $rowsPerPage), $currentPage)
			);
		}

		noData = $pageRows.length <= 0;
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
							{#each columns as col}
								<HeaderCell {col} />
							{/each}
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
	<Summary {totalPages} {totalRows} {noData} {isLoading} />
	<Pagination {totalPages} {noData} on:pageChange />
	<div>
		<span
			class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-400"
		>
			&copy; Svelte List
		</span>
	</div>
</div>
