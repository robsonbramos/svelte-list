<script>
    import { lastAction, pageRows, currentPage, currentSortColumn, rowsPerPage, searchTerm, sortOrderAsc, tableId } from './stores'
    import { countRows, loadPageRows, pageCount, searchArray, sort, splitRowsIntoPages, requestData } from './utils.js'
    import { NoData, Pagination, Row, TableActions, Summary, HeaderCell } from './partials'
    import { Spinner } from 'sveltestrap'

    export let columns = []
    export let rows = []
    export let actions = []
    export let itemsPerPage = 10
    export let server = null

    if (rows.length <= 0 && !server) throw new Error('You must provide rows or server props')

    let totalPages
    let totalRows

    let isLoading = false
    let noData = false

    rowsPerPage.set(itemsPerPage)

    const loadData = async () => {
        isLoading = true
        
        if (server) {
            let url = `${server}?page=${$currentPage}&itemsPerPage=${$rowsPerPage}&search=${$searchTerm}&sortColumn=${$currentSortColumn}&sortOrderAsc=${$sortOrderAsc}&filter={}`
            let data = await requestData(url)

            totalPages = data.totalPages
            totalRows = data.totalRows
            
            pageRows.set(data.rows)
            // FIXME: Maybe we shouldn't update the rowsPerPage with the value coming from the server
            rowsPerPage.set(data.itemsPerPage)
        } else {
            totalPages = pageCount(rows, $rowsPerPage)
            totalRows = countRows(rows)

            let sorted = $currentSortColumn ? sort(rows, $currentSortColumn, $sortOrderAsc) : rows
            let filtered = $searchTerm ? searchArray(sorted, $searchTerm) : sorted
            pageRows.set(await loadPageRows(splitRowsIntoPages(filtered, $rowsPerPage), $currentPage))
            // rowsPerPage.set(itemsPerPage)
        }

        noData = $pageRows.length <= 0
        isLoading = false
    }

    $: rows, $currentPage, $currentSortColumn, $lastAction, $rowsPerPage, $searchTerm, $sortOrderAsc, noData, loadData()

</script>

<div class="table-responsive position-relative mb-3">
    {#if isLoading}
    <div class="bg-white opacity-75 w-100 h-100 position-absolute d-flex justify-content-center align-items-center">
        <Spinner color="primary" />
    </div>
    {/if}
    <TableActions />
    <table id={$tableId} class={noData ? `table bg-white mb-0` : `table table-hover bg-white mb-0`}>
        <thead>
            <tr>
                {#each columns as col}
                <HeaderCell {col} />
                {/each}
                {#if actions.length > 0}
                <th class="text-end">
                    {actions[0].label}
                </th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#if noData}
                <tr>
                    <td colspan={columns.length + (actions.length > 0 && 1)}>
                        <NoData />
                    </td>
                </tr>
            {:else}
                {#each $pageRows as row}
                    <Row {row} {columns} {actions} on:clickRow />
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<div class="gap-2 d-flex flex-column flex-md-row justify-content-between align-items-center">
    <div>
        <Summary {totalPages} {totalRows} {noData} {isLoading} />
    </div>
    <div>
        <Pagination {totalPages} {noData} on:pageChange />
    </div>
    <div>
        <small class="text-gray-500">&copy Intelbras</small>
    </div>
</div>