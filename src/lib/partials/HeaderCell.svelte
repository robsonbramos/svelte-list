<script>
    import BsIcon from '$lib/components/BsIcon.svelte'
    import { currentSortColumn, sortOrderAsc } from '../stores'

    export let col
</script>

<th>
    <div class="d-flex flex-row justify-content-around align-items-center">
        <span>
            {col.label}
        </span>

        <div>
        {#if col.sortable}
            <span
                class="cursor-pointer"
                on:click={() => {
                    currentSortColumn.set(col.key)
                    sortOrderAsc.set(!$sortOrderAsc)
                }}
            >
            {#if $currentSortColumn === col.key}
                {#if $sortOrderAsc}
                    <BsIcon name="arrow-up" size=12 />
                {:else}
                    <BsIcon name="arrow-down" size=12 />
                {/if}
            {:else}
                <BsIcon name="arrow-down-up" size=12 />
            {/if}
            </span>
        {/if}
        </div>
    </div>
</th>
