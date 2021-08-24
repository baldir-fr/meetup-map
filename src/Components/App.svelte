<script lang="ts">
    import ChooseSpace from "./ChooseSpace.svelte";
    import Miniature from "./Miniature.svelte";
    import type { SvelteComponent } from "svelte";
    import type { WorkAdventureApi } from "@workadventure/iframe-api-typings";
    import { ConferenceStore } from "../Stores/ConferenceStore";
    import { MeetingRoomStore } from "../Stores/MeetingRoomStore";
    import { OpenCoWebsiteStore } from "../Stores/OpenCoWebsiteStore";
    import { ExitStore } from "../Stores/ExitStore";
    import { StartStore } from "../Stores/StartStore";


    export let WA: WorkAdventureApi;
    let selected: { id: number, label: string, component: typeof SvelteComponent };

    function saveMetadata() {
        WA.state.conference = $ConferenceStore;
        WA.state.meetingRooms = $MeetingRoomStore;
        WA.state.receptionWebsite = $OpenCoWebsiteStore;
        WA.state.exits = $ExitStore;
        WA.state.starts = $StartStore;
    }

    function cancel() {
        WA.nav.closeCoWebSite();
    }
</script>

<div class="main-app">
    <h1>Configure the room</h1>
    <Miniature/>
    <ChooseSpace bind:selected={selected} />

    {#if selected}
        <svelte:component this="{selected.component}" />
    {/if}
</div>

<div class="main-app-btn">
    <button class="nes-btn" type="button" on:click={cancel}>Cancel</button>
    <button class="nes-btn is-primary" type="button" on:click={saveMetadata}>Save</button>
</div>


<style lang="scss">
  div.main-app {
    h1 {
      margin-top: 10px;
      margin-bottom: 25px;
      text-align: center;
    }
  }

  div.main-app-btn {
    margin-top: 10px;
    text-align: right;
    font-size: 25px;
  }
</style>
