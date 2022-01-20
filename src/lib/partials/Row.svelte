<script lang="ts">
	import DataCell from './DataCell.svelte';
	import ActionCell from './ActionCell.svelte';
	import type { Column, Row, RowAction } from '../types';

	export let row: Row;
	export let columns: Array<Column>;
	export let actions: Array<RowAction>;
</script>

<tr>
	{#each columns as column}
		<DataCell {row} {column} on:clickRow />
	{/each}

	{#if actions.length > 0}
		<ActionCell {row} {actions} />
	{/if}
</tr>
