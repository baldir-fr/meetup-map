<script lang="ts">
    import {exitStore} from "../../Stores/exitStore";
    import {get} from "svelte/store";

    export let exitNameSpace: string

    let exitConfig = get(exitStore).find(exit => exit.nameSpace === exitNameSpace);
    let active = exitConfig ? exitConfig.active : true;
    let exitUrl = exitConfig ? exitConfig.url : ''; //TODO: Get the default value from the map.json

    function changeExitConfig():void {
        exitStore.setExitConfig(exitNameSpace, active, exitUrl);
    }
</script>

<form on:change={() => changeExitConfig()}>
    <label>
        <input type="checkbox" bind:checked={active}>
        Active
    </label>
    <label>
        URL of the next map :
        <input type="text" bind:value={exitUrl} disabled="{!active}">
    </label>
</form>