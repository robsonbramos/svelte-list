# Grid

## Usage example

### Local Data

```html
<script>
	import Grid from '$lib/components/grid/Grid.svelte';

	let columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'E-mail', type: 'email', sortable: true }
	];

	let rows = [
		{ name: 'Paul McCartney', email: 'paul@beattles.com' },
		{ name: 'Tommy Hilfinger', email: 'tommy@fashion.com' },
		{ name: 'Ayrton Senna', email: 'senna@speed.com' },
		{ name: 'Steven Spielberg', email: 'steven@movies.com' },
		{ name: 'Martin Scorsese', email: 'martin@films.com' },
		{ name: 'Silvo Santos', email: 'silvio@sbt.com.br' }
	];

	let actions = [
		{
			label: 'Edit',
			color: 'warning',
			callback: (row) => {
				alert(row.name);
			}
		},
		{
			label: 'Delete',
			color: 'danger',
			callback: (row) => {
				alert(row.name);
			}
		},
		{
			label: 'View',
			color: 'info',
			callback: (row) => {
				alert(row.name);
			}
		}
	];
</script>

<Grid {columns} {rows} {actions} itemsPerPage="4" />
```

### Remote Data

You can simply remove the `rows` option and place the `server` option instead.

```html
<script>
	import Grid from '$lib/components/grid/Grid.svelte';

	let server = 'https://my-data-endpoint.test';

	let columns = [
		{ key: 'name', label: 'Name', sortable: true },
		{ key: 'email', label: 'E-mail', type: 'email', sortable: true }
	];

	let actions = [
		{
			label: 'Edit',
			color: 'warning',
			callback: (row) => {
				alert(row.name);
			}
		},
		{
			label: 'Delete',
			color: 'danger',
			callback: (row) => {
				alert(row.name);
			}
		},
		{
			label: 'View',
			color: 'info',
			callback: (row) => {
				alert(row.name);
			}
		}
	];
</script>

<Grid {columns} {server} {actions} itemsPerPage="4" />
```

Your server must be ready to deal with the incoming request. The following is an example of how you could implement such functionality in Nodejs:

```javascript
import http from 'http';
import url from 'url';
import { loadPageRows, splitRowsIntoPages, countRows, pageCount } from './utils.js';

// You should retrieve the data from your database or somewhere else
const data = [
	{ name: 'Paul McCartney', email: 'paul@beattles.com' },
	{ name: 'Tommy Hilfinger', email: 'tommy@fashion.com' },
	{ name: 'Ayrton Senna', email: 'senna@speed.com' },
	{ name: 'Steven Spielberg', email: 'steven@movies.com' },
	{ name: 'Martin Scorsese', email: 'martin@films.com' },
	{ name: 'Silvo Santos', email: 'silvio@sbt.com.br' }
];

const requestListener = function (req, res) {
	let query = url.parse(req.url, true).query;

	let rows = loadPageRows(splitRowsIntoPages(data, query.itemsPerPage), query.page);

	let pageNum = query.page;
	let totalPages = pageCount(data, query.itemsPerPage);
	let totalRows = countRows(data);

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.writeHead(200);
	res.end(
		JSON.stringify({
			pageNum: pageNum,
			rows: rows,
			totalPages: totalPages,
			totalRows: totalRows
		})
	);
};

const server = http.createServer(requestListener);
server.listen(5000);
```

## Options

### columns

Columns must be an array of objects that define the structure of your table.

Available properties

### rows

Rows is required only if you are not fetching remote data from your server through the `server` option.

### server

Server is required only if you are not passing the `rows` option.

### itemsPerPage

Total rows that should be shown per page. The default value is `10`.
