<script lang="ts">
	import type { TColumn } from '../types';
	import { currentSortColumn, sortOrderAsc } from '../stores';
	import Icon from './Icon.svelte';

	export let col: TColumn;
</script>

<th
	scope="col"
	class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
>
	<span class="inline-block align-middle">{@html col.label || col.key}</span>
	{#if col.sortable}
		<span
			class="inline-block align-middle ml-2"
			on:click={() => {
				currentSortColumn.set(col.key);
				sortOrderAsc.set(!$sortOrderAsc);
			}}
		>
			{#if $currentSortColumn === col.key}
				{#if $sortOrderAsc}
					<Icon name="arrowUp" />
				{:else}
					<Icon name="arrowDown" />
				{/if}
			{:else}
				<Icon name="arrowDownUp" />
			{/if}
		</span>
	{/if}
</th>
