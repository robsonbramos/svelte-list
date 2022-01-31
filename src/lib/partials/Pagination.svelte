<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scrollTo } from '../actions';
	import { tableId, currentPage } from '../stores';

	export let totalPages: number;
	export let noData: boolean;

	const dispatch = createEventDispatcher();
	const onPageChange = () => dispatch('pageChange', $currentPage);

	$: pages = [...Array(totalPages).keys()];

	const setPage = (page) => {
		currentPage.set(page);
		onPageChange();
	};
</script>

{#if !noData}
	<div class="gap-2 md:text-center">
		{#if $currentPage - 1 > 0}
			<span
				on:click={() => setPage($currentPage - 1)}
				class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium"
			>
				Previous
			</span>
		{:else}
			<span
				class="bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium"
			>
				First page
			</span>
		{/if}
		{#if $currentPage + 1 <= totalPages}
			<span
				on:click={() => setPage($currentPage + 1)}
				class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium"
			>
				Next
			</span>
		{:else}
			<span
				class="bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium"
			>
				Last page
			</span>
		{/if}
	</div>
{/if}

<!-- {#if !noData}
	<nav aria-label="Page navigation">
		<ul class="pagination cursor-pointer mb-0">
			<li class={$currentPage === 1 ? 'page-item disabled' : 'page-item'}>
				<span class="page-link" on:click={() => setPage($currentPage - 1)}>Previous</span>
			</li>

			{#each pages as page, i}
				<li class={$currentPage === page + 1 ? 'page-item' : 'page-item'}>
					<span class="page-link" on:click={() => setPage(page + 1)} use:scrollTo={`#${$tableId}`}>
						{page + 1}
					</span>
				</li>
			{/each}

			<li class={$currentPage === totalPages ? 'page-item disabled' : 'page-item'}>
				<span class="page-link" on:click={() => setPage($currentPage + 1)}>Next</span>
			</li>
		</ul>
	</nav>
{/if} -->
