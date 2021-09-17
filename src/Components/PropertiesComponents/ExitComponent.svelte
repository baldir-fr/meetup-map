<script lang="ts">
    import { ExitStore } from "../../Stores/ExitStore";
    import { get } from "svelte/store";

    export let exitNameSpace: string;

    let exitConfig = get(ExitStore).find(e => e.nameSpace == exitNameSpace);
    let exitActive = exitConfig ? exitConfig.active : false;
    let exitUrl = exitConfig ? exitConfig.url : '';

    function changeExit() {
        ExitStore.addExit({nameSpace: exitNameSpace, active: exitActive, url: exitUrl});
    }

</script>

<div class="nes-container with-title">
    <p class="title">{exitNameSpace}</p>
    <section on:change={changeExit}>
        <label>
            <input type="checkbox" class="nes-checkbox" bind:checked={exitActive}>
            <span>Enable</span>
        </label>
        <label class={!exitActive ? "disabled" : ""}>
            URL of the next map :
            <input type="text" class="nes-input" bind:value={exitUrl} disabled="{!exitActive}">
        </label>
    </section>
</div>