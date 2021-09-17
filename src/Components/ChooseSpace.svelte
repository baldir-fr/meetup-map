<script lang="ts">
    import ReceptionSpace from "./SpacesComponents/ReceptionSpace.svelte"
    import AmphiSpace from "./SpacesComponents/AmphiSpace.svelte"
    import MeetingRoomSpace from "./SpacesComponents/MeetingRoomSpace.svelte"
    import ExitStartSpace from "./SpacesComponents/ExitStartSpace.svelte"

    const spaces = [
        { id: 1, label: "Amphi", component: AmphiSpace },
        { id: 2, label: "Reception", component: ReceptionSpace },
        { id: 3, label: "Meeting Room", component: MeetingRoomSpace },
        { id: 4, label: "Exit/Start", component: ExitStartSpace }
    ]

    export let selected = spaces[0];

</script>

<div class="select nes-select">
    <select bind:value={selected}>
        {#each spaces as space}
            <option value="{space}">
                {space.label}
            </option>
        {/each}
    </select>
</div>
