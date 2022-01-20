<script lang="ts">
	import { scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { searchTerm, rowsPerPage } from '../stores';
	import Icon from './Icon.svelte';

	let searchEnabled: boolean = false;
	let exportEnabled: boolean = false;
	let recordsEnabled: boolean = false;
	let search: string = '';
	let recordsPerPage: number = $rowsPerPage;

	const widthSearch = tweened(0, { duration: 1000, easing: cubicOut });
	const widthExport = tweened(0, { duration: 1000, easing: cubicOut });
	const widthRecords = tweened(0, { duration: 1000, easing: cubicOut });

	const enableAction = () => {
		searchEnabled = false;
		exportEnabled = false;
		recordsEnabled = false;

		return true;
	};

	const handleFields = () => {
		widthSearch.set(searchEnabled ? 200 : 0);
		widthExport.set(exportEnabled ? 200 : 0);
		widthRecords.set(recordsEnabled ? 200 : 0);
	};

	$: searchEnabled, exportEnabled, recordsEnabled, handleFields();
	$: search, searchTerm.set(search);
	$: recordsPerPage, rowsPerPage.set(recordsPerPage);
</script>

<div class="d-flex flex-row justify-content-between align-items-center mb-2">
	<div class="actions gap-1">
		<!-- SEARCH -->
		<span class="action-item cursor-pointer" on:click={() => (searchEnabled = enableAction())}>
			<Icon name="search" size={12} class={searchEnabled && 'text-primary'} />
		</span>
		<div class="action-item" style={`width:${$widthSearch}px`}>
			{#if searchEnabled}
				<input
					out:scale={{ delay: 500 }}
					type="text"
					bind:value={search}
					class="form-control form-control-sm"
				/>
			{/if}
		</div>

		<!-- EXPORT -->
		<!-- <span class="action-item cursor-pointer" on:click={() => exportEnabled = enableAction()}>
            <Icon name="fileRarmarkArrowDown" size=12 />
        </span>
        <div
            class="action-item"
            style={`width:${$widthExport}px`}
        >
            {#if exportEnabled}
            <input out:scale={{delay:500}} type="text" class="form-control form-control-sm" />
            {/if}
        </div> -->

		<!-- RECORDS PER PAGE -->
		<span class="action-item cursor-pointer" on:click={() => (recordsEnabled = enableAction())}>
			<Icon name="listOl" size={12} />
		</span>
		<div class="action-item" style={`width:${$widthRecords}px`}>
			{#if recordsEnabled}
				<select
					out:scale={{ delay: 500 }}
					bind:value={recordsPerPage}
					type="text"
					class="form-select form-select-sm"
				>
					<option selected={false} disabled={true}>Items per page</option>
					<option>5</option>
					<option>10</option>
					<option>25</option>
					<option>50</option>
					<option>100</option>
				</select>
			{/if}
		</div>
	</div>
</div>

<style>
	.actions {
		display: grid;
	}

	.action-item {
		grid-row: 1/2;
	}
</style>
