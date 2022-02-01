<script lang="ts">
	import Grid from '$lib/Grid.svelte';

	let columns = [
		{
			key: 'name',
			label: 'Name',
			sortable: true,
			hint: 'email'
		},
		{ key: 'username', label: 'Username' },
		{ key: 'email', label: 'E-mail', type: 'email', sortable: true },
		{
			key: 'address',
			label: 'Address',
			template: (row) => {
				return `${row.address.street}, ${row.address.suite} - ${row.address.city} <br> ${row.address.zipcode}`;
			}
		},
		{ key: 'phone', label: 'Phone', type: 'phone' },
		{ key: 'website', label: 'Website', type: 'website' },
		{
			key: 'company',
			label: 'Company',
			template: (row) => {
				return `${row.company.name}`;
			}
		}
	];

	let url = 'https://jsonplaceholder.typicode.com/users';

	let actions = [
		{ type: 'delete', label: 'Delete', fn: (row) => alert(`Deleting ${row.name}`) },
		{ type: 'view', label: 'View', fn: (row) => alert(`View ${row.name}`) }
	];
</script>

<Grid {columns} {url} {actions} itemsPerPage={6} />
