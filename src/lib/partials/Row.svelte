<script>
	import DataCell from './DataCell.svelte';
	import ActionCell from './ActionCell.svelte';

	export let row;
	export let columns;
	export let actions;
</script>

<tr>
	{#each columns as column}
		<DataCell {row} {column} on:clickRow />
	{/each}

	{#if actions.length > 0}
		<ActionCell {row} {actions} />
	{/if}
</tr>
