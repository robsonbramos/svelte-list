<script lang="ts">
	import type { Row, RowAction } from '../types';
	import css from '../themes/bootstrap.json';

	export let row: Row;
	export let actions: Array<RowAction>;
</script>

<td>
	<div class={css.actionCellContainer}>
		{#each actions as action}
			<span
				class={`mx-1 cursor-pointer text-${action.color ?? 'light'}`}
				on:click={() => {
					action.callback(row);
				}}
			>
				<div class="d-flex justify-content-between">
					{@html action.label}
				</div>
			</span>
		{/each}
	</div>
</td>
