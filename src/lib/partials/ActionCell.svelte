<script>
    import { lastAction } from "../stores";
    import BsIcon from '$lib/components/BsIcon.svelte'

    export let row
    export let actions
</script>

<td>
    <div class="d-flex flex-row justify-content-end align-items-center">
        {#each actions as action}
        <span
            class={`mx-1 cursor-pointer text-${action.color ?? 'light'}`}
            on:click={async () => {
                await action.callback(row);
                lastAction.set(action);
            }}
        >
            <div class="d-flex justify-content-between">
                <BsIcon name="gear-fill" size=10 class="me-2 p-1" />
                <!-- {action.label} -->

            </div>
        </span>
        {/each}
    </div>
</td>

          