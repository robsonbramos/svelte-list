<script lang="ts">
	import type { Column } from '../types';

	import { currentSortColumn, sortOrderAsc } from '../stores';
	import Icon from './Icon.svelte';

	export let col: Column;
</script>

<th>
	<div class="d-flex flex-row justify-content-around align-items-center">
		<span>
			{col.label}
		</span>

		<div>
			{#if col.sortable}
				<span
					class="cursor-pointer"
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
		</div>
	</div>
</th>
