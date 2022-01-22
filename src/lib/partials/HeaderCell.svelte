<script lang="ts">
	import type { Column } from '../types';
	import { currentSortColumn, sortOrderAsc } from '../stores';
	import Icon from './Icon.svelte';
	import css from '../themes/bootstrap.json';

	export let col: Column;
</script>

<th>
	<div class={css.headerCellContainer}>
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
