<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Column, Row } from '../types';
	import Icon from './Icon.svelte';

	export let row: Row;
	export let column: Column;

	const dispatch = createEventDispatcher();

	const onClickRow = () => dispatch('clickRow', row);
</script>

<!-- FIXME: on click should be on div not td... but that should be solving by replacing table with div list -->
<td on:click={onClickRow} class="text-red-500 cursor-pointer">
	<div class="d-flex flex-row align-items-center">
		{#if ![undefined, null].includes(row[column.key])}
			<!-- E-MAIL -->
			{#if column.type === 'email'}
				<div style="pointer-events:none!important">
					<Icon name="envelope" size={10} class="me-2" />
					<a href="mailto:{row[column.key]}">
						{row[column.key]}
					</a>
				</div>

				<!-- ADDRESS -->
			{:else if column.type === 'address'}
				<Icon name="geoAlt" size={10} class="me-2" />
				<em>
					{row[column.key]}
				</em>
			{:else if column.type === 'phone'}
				<!-- PHONE -->
				<Icon name="telephone" size={10} class="me-2" />
				{row[column.key]}
			{:else if column.type === 'currency'}
				<!-- CURRENCY -->
				<div class="ms-auto">
					{row[column.key].toLocaleString('pt-BR', {
						style: 'currency',
						currency: row.options.currency ?? 'USD'
					})}
				</div>
			{:else if column.type === 'label'}
				<!-- LABEL -->
				<div>
					<span class="badge border border-secondary text-dark">
						{row[column.key]}
					</span>
				</div>
			{:else if column.type === 'info'}
				<!-- INFO -->
				<div>
					<span
						class="text-info"
						style="text-decoration-line: underline; text-decoration-style: dotted; text-decoration-thickness: 1px;"
					>
						{row[column.key]}
					</span>
				</div>
			{:else if column.type === 'bool'}
				<!-- BOOL -->
				<div class="m-auto">
					{#if row[column.key]}
						<span class="text-success"><Icon name="checkCircle" size={12} /></span>
					{:else}
						<span class="text-danger"><Icon name="xCircle" size={12} /></span>
					{/if}
				</div>
			{:else}
				<!-- GENERAL -->
				{@html row[column.key]}
			{/if}

			<!-- NO DATA -->
		{:else}
			<div class="m-auto">
				<Icon name="dashLg" size={14} />
			</div>
		{/if}
	</div>
</td>
