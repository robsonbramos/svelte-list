<script lang="ts">
	import type { Column } from '../types';
	import { currentSortColumn, sortOrderAsc } from '../stores';
	import Icon from './Icon.svelte';

	export let col: Column;
</script>

<th
	scope="col"
	class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
>
	<span class="inline-block align-middle">{@html col.label}</span>
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
					<Icon name="arrowUp" size={12} />
				{:else}
					<Icon name="arrowDown" size={12} />
				{/if}
			{:else}
				<Icon name="arrowDownUp" size={12} />
			{/if}
		</span>
	{/if}
</th>
