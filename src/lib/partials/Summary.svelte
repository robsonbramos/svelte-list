<script lang="ts">
	import { currentPage } from '../stores';
	import css from '../themes/bootstrap.json';

	export let totalPages: number;
	export let totalRows: number;
	export let noData: boolean;
	export let isLoading: boolean;
</script>

<small class={css.summaryContainer}>
	{#if isLoading}
		<span class="text-gray-700">Loading summary...</span>
	{:else if noData}
		No records to show
	{:else}
		Total: <strong>{totalRows}</strong> rows | Page: <strong>{$currentPage} / {totalPages}</strong>
	{/if}
</small>
