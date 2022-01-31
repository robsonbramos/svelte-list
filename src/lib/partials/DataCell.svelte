<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Column, Row } from '../types';
	import Icon from './Icon.svelte';

	export let row: Row;
	export let column: Column;

	const dispatch = createEventDispatcher();

	const onClickRow = () => dispatch('clickRow', row);
</script>

<!-- <td class="px-6 py-4 whitespace-nowrap">
	<div class="flex items-center">
		<div class="flex-shrink-0 h-10 w-10">
			<img
				class="h-10 w-10 rounded-full"
				src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
				alt=""
			/>
		</div>
		<div class="ml-4">
			<div class="text-sm font-medium text-gray-900">Jane Cooper</div>
			<div class="text-sm text-gray-500">jane.cooper@example.com</div>
		</div>
	</div>
</td>
<td class="">
	<div class="text-sm text-gray-900">Regional Paradigm Technician</div>
	<div class="text-sm text-gray-500">Optimization</div>
</td>
<td class="px-6 py-4 whitespace-nowrap">
	<span
		class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
	>
		Active
	</span>
</td>
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> Admin </td>
<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
	<a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
</td> -->

<!-- FIXME: on click should be on div not td... but that should be solving by replacing table with div list -->
<td on:click={onClickRow} class="text-sm px-4 py-3 whitespace-nowrap">
	{#if ![undefined, null].includes(row[column.key])}
		{#if column.template}
			{@html column.template(row)}
		{:else}
			<!-- E-MAIL -->
			{#if column.type === 'email'}
				<a href="mailto:{row[column.key]}" class="gap-1 flex justify-start align-middle">
					<Icon name="mail" />
					<span>
						{row[column.key]}
					</span>
				</a>

				<!-- ADDRESS -->
			{:else if column.type === 'address'}
				<div class="gap-1 flex justify-start align-middle">
					<Icon name="locationMarker" />
					<em>
						{@html row[column.key]}
					</em>
				</div>
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
					<span
						class="px-2 inline-flex text-xs leading-5 font-semibold rounded-md border-1 border-gray-300 text-gray-500"
					>
						{@html row[column.key]}
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
						<span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
						>
							Active
						</span>
					{:else}
						<span
							class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
						>
							Inactive
						</span>
					{/if}
				</div>
			{:else}
				<!-- GENERAL -->
				<div class="text-gray-900">{@html row[column.key]}</div>
			{/if}

			{#if column.hint}
				<div class="text-gray-500">{@html row[column.hint]}</div>
			{/if}
		{/if}

		<!-- NO DATA -->
	{:else}
		<div class="m-auto text-gray-400">
			<Icon name="minus" />
		</div>
	{/if}
</td>
