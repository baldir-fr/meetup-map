<script lang="ts">
    import { get } from "svelte/store";
    import { exitStore } from "../../Stores/exitStore";
    import { startStore } from "../../Stores/startStore";

    let exitActives = get(exitStore).map(exit => {
        if (exit.active === true){
            return exit.nameSpace;
        }
    });
    let starts: string[] = [];

    function changeStart(): void {
        console.log('starts : ', starts);
        startStore.set(starts);
        console.log($startStore);
    }
</script>

<div>
    <p>Default entry point of the map : (If more than one is checked, users will start randomly at one or another.)</p>
    <form on:change={() => changeStart()}>
        {#each exitActives as startPossible}
            <label>
                <input type="checkbox" bind:group={starts} value="{startPossible}">
                {startPossible}
            </label>
        {/each}
    </form>
</div>