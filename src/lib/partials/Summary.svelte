<script>
    import { currentPage } from '../stores'

    export let totalPages
    export let totalRows
    export let noData
    export let isLoading
</script>

<small class="text-gray-700">
    {#if isLoading}
        <span class="text-gray-700">Loading summary...</span>
    {:else}
        {#if noData}
            No records to show
        {:else}
            Total: <strong>{totalRows}</strong> rows | Page: <strong>{$currentPage} / {totalPages}</strong>
        {/if}
    {/if}
</small>