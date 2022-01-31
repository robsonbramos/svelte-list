<script lang="ts">
	import { currentPage, rowsPerPage } from '../stores';

	export let totalPages: number;
	export let totalRows: number;
	export let noData: boolean;
	export let isLoading: boolean;
</script>

<small class="text-gray-500">
	{#if isLoading}
		<span class="text-gray-700">Loading summary...</span>
	{:else if noData}
		No records to show
	{:else}
		Showing <strong>{$rowsPerPage * $currentPage - $rowsPerPage + 1}</strong> to
		{#if $currentPage === totalPages}
			<strong>{$rowsPerPage * $currentPage - ($rowsPerPage * $currentPage - totalRows)}</strong>
		{:else}
			<strong>{$rowsPerPage * $currentPage}</strong>
		{/if}
		of
		<strong>{totalRows}</strong> results
	{/if}
</small>
