<script lang="ts">
	import Grid from '$lib/Grid.svelte';

	let columns = [
		{ key: 'avatar', label: 'Avatar' },
		{ key: 'name', label: 'Name', sortable: true, hint: 'email' },
		{ key: 'username', label: 'Username' },
		{ key: 'email', label: 'E-mail', type: 'email', sortable: true },
		{ key: 'phone', label: 'Phone', type: 'phone' }
	];

	let server = {
		url: 'http://localhost:3333',
		queryFields: {
			itemsPerPage: 'qtdPorPagina'
		}
	};

	let actions = [
		{ type: 'delete', label: 'Delete', fn: (row) => alert(`Deleting ${row.name}`) },
		{ type: 'view', label: 'View', fn: (row) => alert(`View ${row.name}`) }
	];
</script>

<Grid {columns} {server} {actions} itemsPerPage={2} />
