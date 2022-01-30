<!-- <script lang="ts">
	import Grid from '$lib/Grid.svelte';

	let columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'E-mail', type: 'email', sortable: true },
		{ key: 'address', label: 'Address', type: 'address' },
		{ key: 'phone', label: 'Phone', type: 'phone' },
		{ key: 'salary', label: 'Salary', type: 'currency' },
		{ key: 'status', label: 'Status', type: 'bool' },
		{ key: 'role', label: 'Role', type: 'label' }
	];

	let rows = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john@test.com',
			status: true,
			address: 'Av. João da Silva, 123',
			phone: '(48) 90000-0000',
			salary: 18000,
			options: { currency: 'BRL' }
		},
		{ id: 2, name: 'Walt Disney', email: 'walt@disney.com', status: true, role: 'Admin' },
		{ id: 3, name: 'Paul McCartney', email: 'paul@beattles.com', status: false, role: 'Revenda' },
		{ id: 4, name: 'Tommy Hilfinger', email: 'tommy@fashion.com' },
		{ id: 5, name: 'Ayrton Senna', email: 'senna@speed.com' },
		{ id: 6, name: 'Steven Spielberg', email: 'steven@movies.com' },
		{ id: 7, name: 'Martin Scorsese', email: 'martin@films.com' },
		{ id: 8, name: 'Silvo Santos', email: 'silvio@sbt.com.br' }
	];

	const remove = (id) => {
		rows = rows.filter((r) => r.id != id);
	};

	let actions = [
		{ label: 'Delete', color: 'danger', callback: (row) => remove(row.id) },
		{
			label: 'View',
			color: 'info',
			callback: (row) => {
				alert(row.name);
			}
		}
	];
</script>

<Grid {columns} bind:rows {actions} itemsPerPage={6} /> -->
