import http from 'http';
import url from 'url';
import { loadPageRows, splitRowsIntoPages, countRows, pageCount } from './utils.js';

const data = [
	{
		name: 'John Doe',
		email: 'john@test.com',
		address: 'Av. João da Silva, 123',
		phone: '(48) 90000-0000',
		salary: 18000,
		options: { currency: 'BRL' }
	},
	{ name: 'Walt Disney', email: 'walt@disney.com', salary: 25000, options: { currency: 'USD' } },
	{ name: 'Paul McCartney', email: 'paul@beattles.com' },
	{ name: 'Tommy Hilfinger', email: 'tommy@fashion.com' },
	{ name: 'Ayrton Senna', email: 'senna@speed.com' },
	{ name: 'Steven Spielberg', email: 'steven@movies.com' },
	{ name: 'Martin Scorsese', email: 'martin@films.com' },
	{ name: 'Silvo Santos', email: 'silvio@sbt.com.br' }
];

const requestListener = function (req, res) {
	let query = url.parse(req.url, true).query;

	// let rows = data

	// if (query.sortColumn !== null) rows = sort(rows, query.sortColumn, query.sortOrderAsc)

	let rows = loadPageRows(splitRowsIntoPages(data, query.itemsPerPage), query.page);
	// rows = loadPageRows(splitRowsIntoPages(rows, query.itemsPerPage), query.page)

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
server.listen(8081);
