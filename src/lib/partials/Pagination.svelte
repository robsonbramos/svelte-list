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
	<nav aria-label="Page navigation">
		<ul class="pagination cursor-pointer mb-0">
			<li class={$currentPage === 1 ? 'page-item disabled' : 'page-item'}>
				<span class="page-link" on:click={() => setPage($currentPage - 1)}>Previous</span>
			</li>

			{#each pages as page, i}
				<li class={$currentPage === page + 1 ? 'page-item active' : 'page-item'}>
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
{/if}
