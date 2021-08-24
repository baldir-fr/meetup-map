<script lang="ts">
    import JitsiComponent from "../PropertiesComponents/JitsiComponent.svelte"
    import { MeetingRoomStore } from "../../Stores/MeetingRoomStore";
    import { get } from "svelte/store";

    const meetingRooms = [
        { id: 1, label : "5 little rooms", nbRooms: 5},
        { id: 2, label: "1 big room and 3 little ones", nbRooms: 4 },
        { id: 3, label: "2 big rooms and 1 little", nbRooms: 3 },
        { id: 4, label: "2 big rooms and north exit", nbRooms: 2 }
    ]

    let selectedMeetingRoom = meetingRooms.find(c => c.nbRooms === get(MeetingRoomStore).nbRooms);

    function onChangeNBRooms() {
        if (selectedMeetingRoom === undefined) {
            throw Error("You MUST select a meeting rooms configuration !");
        }
        MeetingRoomStore.setNbRooms(selectedMeetingRoom.nbRooms);
    }

</script>

<div class="spaceComponent">
    <h2>Properties of the meeting rooms</h2>
</div>

<div on:change={onChangeNBRooms} class="nes-select">
    <select bind:value={selectedMeetingRoom}>
        {#each meetingRooms as meetingRoom}
            <option value="{meetingRoom}">
                {meetingRoom.label}
            </option>
        {/each}
    </select>
</div>

<p class="text">The list of the meeting rooms is displayed form left to right. (The room on top of the list is the leftest room in the map.)</p>
{#each Array($MeetingRoomStore.nbRooms) as _, i}
    <JitsiComponent jitsi={$MeetingRoomStore.jitsis[i]} />
{/each}


<style lang="scss">
  p.text {
    margin: 15px;
  }
</style>