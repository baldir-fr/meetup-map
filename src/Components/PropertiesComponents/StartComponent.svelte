<script lang="ts">
    import { ExitStore } from "../../Stores/ExitStore";
    import { StartStore } from "../../Stores/StartStore";

    let starts: string[] = [];

    function changeStart(): void {
        StartStore.set(starts);
    }
</script>

<div class="nes-container with-title">
    <p class="title">Start</p>
    <p>Choose the entry point of your map. Use #[entry_point] at the end of the url of the map to enter by this entry point.</p>
    <p>Default entry will always be 'south'. (even if disable as entry point.)</p>
    <form on:change={() => changeStart()}>
        {#each $ExitStore as exit}
            {#if exit.active }
                <label class="chooseStart">
                    <input type="checkbox" class="nes-checkbox" bind:group={starts} value="{exit.nameSpace}">
                    <span>{exit.nameSpace}</span>
                </label>
            {/if}
        {/each}
    </form>
</div>