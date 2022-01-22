<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scrollTo } from '../actions';
	import { tableId, currentPage } from '../stores';
	import css from '../themes/bootstrap.json';

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
		<ul class={css.paginationListGroup}>
			<li class={$currentPage === 1 ? css.paginationListItemDisabled : css.paginationListItem}>
				<span class={css.paginationPageLink} on:click={() => setPage($currentPage - 1)}
					>Previous</span
				>
			</li>

			{#each pages as page, i}
				<li
					class={$currentPage === page + 1 ? css.paginationListItemActive : css.paginationListItem}
				>
					<span
						class={css.paginationPageLink}
						on:click={() => setPage(page + 1)}
						use:scrollTo={`#${$tableId}`}
					>
						{page + 1}
					</span>
				</li>
			{/each}

			<li
				class={$currentPage === totalPages
					? css.paginationListItemDisabled
					: css.paginationListItem}
			>
				<span class={css.paginationPageLink} on:click={() => setPage($currentPage + 1)}>Next</span>
			</li>
		</ul>
	</nav>
{/if}
