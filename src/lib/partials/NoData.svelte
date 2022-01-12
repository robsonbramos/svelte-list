<script>
    import BsIcon from "$lib/components/BsIcon.svelte";
</script>

<div class="d-flex justify-content-center">
    <div class="empty text-center rounded-3 p-5">
        <slot name="image">
            <BsIcon name="search" size=30 class="d-block text-gray-300 mb-3" />
        </slot>
        <h5 class="text-gray-600">No Data</h5>
        <p class="text-gray-500 mb-3">Oops! It seems there is no data available right now.</p>
        <span class="btn btn-outline-primary rounded-pill">Refresh</span>
    </div>
</div>
    