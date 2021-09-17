<script lang="ts">
    import StartComponent from "../PropertiesComponents/StartComponent.svelte";
    import ExitComponent from "../PropertiesComponents/ExitComponent.svelte";
    import { MeetingRoomStore } from "../../Stores/MeetingRoomStore";

</script>

<div class="spaceComponent">
    <h2>Properties of the exits and start</h2>
</div>

{#if $MeetingRoomStore.nbRooms === 2}
    <ExitComponent exitNameSpace="north"/>
{/if}
<ExitComponent exitNameSpace="east"/>
<ExitComponent exitNameSpace="south"/>
<ExitComponent exitNameSpace="west"/>

<StartComponent/>
