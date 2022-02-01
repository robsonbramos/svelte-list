export default async ({ server, url, rows }): void => {
	// Load data from server
	if (server) {
		let url = `${server}?page=${$currentPage}&itemsPerPage=${$rowsPerPage}&search=${$searchTerm}&sortColumn=${$currentSortColumn}&sortOrderAsc=${$sortOrderAsc}&filter={}`;
		let data = await utils.requestData(url);

		let totalPages = data.totalPages;
		let totalRows = data.totalRows;

		pageRows.set(data.rows);
		// FIXME: Maybe we shouldn't update the rowsPerPage with the value coming from the server
		rowsPerPage.set(data.itemsPerPage);
	}

	// Load data from URL
	if (url) {
	}

	// Load data from variable
	if (rows) {
	}

	function setStuff() {
		let totalPages = utils.pageCount(rows, $rowsPerPage);
		let totalRows = utils.countRows(rows);

		let sorted = $currentSortColumn ? utils.sort(rows, $currentSortColumn, $sortOrderAsc) : rows;
		let filtered = $searchTerm ? utils.searchArray(sorted, $searchTerm) : sorted;
		pageRows.set(
			await utils.loadPageRows(utils.splitRowsIntoPages(filtered, $rowsPerPage), $currentPage)
		);
	}

	noData = $pageRows.length <= 0;
};
