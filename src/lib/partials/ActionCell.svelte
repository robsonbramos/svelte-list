<script>
	import { lastAction } from '../stores';

	export let row;
	export let actions;
</script>

<td>
	<div class="d-flex flex-row justify-content-end align-items-center">
		{#each actions as action}
			<span
				class={`mx-1 cursor-pointer text-${action.color ?? 'light'}`}
				on:click={async () => {
					await action.callback(row);
					lastAction.set(action);
				}}
			>
				<div class="d-flex justify-content-between">
					{@html action.label}
				</div>
			</span>
		{/each}
	</div>
</td>
