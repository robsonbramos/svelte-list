<script lang="ts">
	import Icon from './Icon.svelte';
	import css from '../themes/bootstrap.json';
</script>

<div class={css.noDataContainer}>
	<div class={css.noDataContent}>
		<slot name="image">
			<Icon name="search" size={30} class={css.noDataIcon} />
		</slot>
		<h5 class={css.noDataTitle}>No Data</h5>
		<p class={css.noDataText}>Oops! It seems there is no data available right now.</p>
		<span class={css.noDataRefreshLink}>Refresh</span>
	</div>
</div>
