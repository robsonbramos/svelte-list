<script lang="ts">
	import type { TRow, TRowAction } from '../types';

	export let row: TRow;
	export let actions: Array<TRowAction>;
</script>

<td>
	<div class="text-xs flex align-middle justify-center">
		{#each actions as action}
			{#if action.type === 'delete'}
				<span
					class="mx-1 text-red-500"
					on:click={() => {
						action.fn(row);
					}}
				>
					<div class="flex justify-between">
						{@html action.label}
					</div>
				</span>
			{:else if action.type === 'view'}
				<span
					class="mx-1 text-blue-500"
					on:click={() => {
						action.fn(row);
					}}
				>
					<div class="flex justify-between">
						{@html action.label}
					</div>
				</span>
			{:else}
				<span
					class="mx-1 text-blue-500"
					on:click={() => {
						action.fn(row);
					}}
				>
					<div class="flex justify-between">
						{@html action.label}
					</div>
				</span>
			{/if}
		{/each}
	</div>
</td>
