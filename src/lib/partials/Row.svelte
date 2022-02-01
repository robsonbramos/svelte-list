<script lang="ts">
	import DataCell from './DataCell.svelte';
	import ActionCell from './ActionCell.svelte';
	import type { TColumn, TRow, TRowAction } from '../types';

	export let row: TRow;
	export let columns: Array<TColumn>;
	export let actions: Array<TRowAction>;
</script>

<tr>
	{#each columns as column}
		<DataCell {row} {column} on:clickRow />
	{/each}

	{#if actions.length > 0}
		<ActionCell {row} {actions} />
	{/if}
</tr>
