<script lang="ts">
    import ChooseSpace from "./ChooseSpace.svelte";
    import Miniature from "./Miniature.svelte";
    import type { jitsiConfig } from "./Configs/JitsiConfig";
    import type { youtubeConfig } from "./Configs/YoutubeConfig";
    import type { WorkAdventureApi } from "../../../../workadventure-saas/workadventure/front/dist/src/iframe_api.js"
    import type { SvelteComponent } from "svelte";
    import { ConferenceStore } from "../Stores/ConferenceStore";
    import { MeetingRoomStore } from "../Stores/MeetingRoomStore";
    import { OpenCoWebsiteStore } from "../Stores/OpenCoWebsiteStore";
    import { ExitStore } from "../Stores/ExitStore";
    import { StartStore } from "../Stores/StartStore";
    import { get } from "svelte/store";


    export let WA: WorkAdventureApi;
    let selected: { id: number, label: string, component: typeof SvelteComponent };

    function saveMetadata() {
        deleteJitsi();
        saveConference();
        saveMeetingRooms();
        saveOpenCoWebSite();
        saveExit();
        saveStart();
    }

    function saveConference() {
        if ($ConferenceStore.typeConference === 1) {
            saveJitsiConfig($ConferenceStore.jitsi);
            saveJitsiConfig($ConferenceStore.jitsi, "jitsiAmphi/jitsiBetween");
            saveJitsiConfig($ConferenceStore.jitsi, "jitsiAmphi/jitsiYoutube");
        } else if ($ConferenceStore.typeConference === 2) {
            saveJitsiConfig($ConferenceStore.jitsi);
            saveYoutubeConfig($ConferenceStore.youtube);
        }
    }

    function saveMeetingRooms() {
        let meetingRooms = get(MeetingRoomStore);
        if (meetingRooms.nbRooms === 2) {
            for (let i = 0; i < meetingRooms.nbRooms; i++) {
                saveJitsiConfig(meetingRooms.jitsis[i], "meetingRoom/meetingroom-" + (i + 6) + "/bottom");
                WA.room.showLayer("meetingroom-" + (i + 6));
            }

            WA.room.hideLayer("meetingroom-1");
            WA.room.hideLayer("meetingroom-2");
            WA.room.hideLayer("meetingroom-3");
            WA.room.hideLayer("meetingroom-4");
            WA.room.hideLayer("meetingroom-5");
        }
        if (meetingRooms.nbRooms === 3) {
            saveJitsiConfig(meetingRooms.jitsis[0], "meetingRoom/meetingroom-6/bottom");
            saveJitsiConfig(meetingRooms.jitsis[1]);
            saveJitsiConfig(meetingRooms.jitsis[2], "meetingRoom/meetingroom-7/bottom");

            WA.room.showLayer("meetingroom-3");
            WA.room.showLayer("meetingroom-6");
            WA.room.showLayer("meetingroom-7");

            WA.room.hideLayer("meetingroom-1");
            WA.room.hideLayer("meetingroom-2");
            WA.room.hideLayer("meetingroom-4");
            WA.room.hideLayer("meetingroom-5");
        }
        if (meetingRooms.nbRooms === 4) {
            saveJitsiConfig(meetingRooms.jitsis[0], "meetingRoom/meetingRoom/meetingroom-6/bottom");
            WA.room.showLayer("meetingroom-6");

            WA.room.hideLayer("meetingroom-1");
            WA.room.hideLayer("meetingroom-2");
            WA.room.hideLayer("meetingroom-7");

            for (let i = 1; i < meetingRooms.nbRooms; i++) {
                saveJitsiConfig(meetingRooms.jitsis[i]);
                WA.room.showLayer("meetingroom-" + (i + 2));
            }
        }
        if (meetingRooms.nbRooms === 5) {
            for (let jitsi of meetingRooms.jitsis) {
                saveJitsiConfig(jitsi);
            }
            WA.room.hideLayer("meetingroom-6");
            WA.room.hideLayer("meetingroom-7");

            WA.room.showLayer("meetingroom-1");
            WA.room.showLayer("meetingroom-2");
            WA.room.showLayer("meetingroom-3");
            WA.room.showLayer("meetingroom-4");
            WA.room.showLayer("meetingroom-5");
        }
    }

    function saveJitsiConfig(jitsiConfig: jitsiConfig, name?: string) {
        WA.room.setProperty(name ? name : jitsiConfig.nameSpace, "jitsiRoom", jitsiConfig.roomName);
        if (jitsiConfig.url !== '') {
            WA.room.setProperty(name ? name : jitsiConfig.nameSpace, "jitsiUrl", jitsiConfig.url);
        }
        let jitsiConfigFormat = `{ \"startWithAudioMuted\": ${jitsiConfig.audioMute}, \"startWithVideoMuted\": ${jitsiConfig.videoMute} } `;
        WA.room.setProperty(name ? name : jitsiConfig.nameSpace, "jitsiConfig", jitsiConfigFormat);
    }

    function saveYoutubeConfig(youtubeConfig: youtubeConfig) {
        WA.room.setProperty(youtubeConfig.nameSpace, "OpenCoWebSite", "https://www.youtube.com/embed/live_stream?channel=" + youtubeConfig.channelID);
        let youtubeConfigFormat = `${youtubeConfig.fullscreen ? 'fullscreen' : ''}; ${youtubeConfig.autoplay ? 'autoplay' : ''}; ${youtubeConfig.pictureInPicture ? 'picture-in-picture' : ''}`;
        WA.room.setProperty(youtubeConfig.nameSpace, "OpenCoWebSitePolicy", youtubeConfigFormat);
    }

    function saveOpenCoWebSite() {
        if ($OpenCoWebsiteStore.active) {
            WA.room.setProperty($OpenCoWebsiteStore.nameSpace, 'OpenCoWebSite', $OpenCoWebsiteStore.url);
            let OpenCoWebSiteConfigFormat = `${$OpenCoWebsiteStore.fullscreen ? 'fullscreen' : undefined}`;
            WA.room.setProperty($OpenCoWebsiteStore.nameSpace, 'OpenCoWebSitePolicy', OpenCoWebSiteConfigFormat);
            if ($OpenCoWebsiteStore.onaction) {
                WA.room.setProperty($OpenCoWebsiteStore.nameSpace, 'OpenCoWebSiteTrigger', 'onaction');
                WA.room.setProperty($OpenCoWebsiteStore.nameSpace, 'OpenCoWebSiteTriggerMessage', $OpenCoWebsiteStore.messageTrigger);
            }
        } else {
            WA.room.setProperty($OpenCoWebsiteStore.nameSpace, "OpenCoWebSite", undefined);
        }
    }

    function saveExit() {
        for (let exit of get(ExitStore)) {
            if (exit.nameSpace === "north") {
                if (exit.active) {
                    WA.room.showLayer("Open/North");
                    WA.room.hideLayer("Close/North");
                    WA.room.setProperty("Exit/Open/North/bottom", "exitUrl", exit.url);
                } else {
                    WA.room.hideLayer("Open/North");
                    WA.room.showLayer("Close/North");
                    WA.room.setProperty("Exit/Open/North/bottom", "exitUrl", undefined);
                }
            }
            if (exit.nameSpace === "south") {
                if (exit.active) {
                    WA.room.showLayer("Open/South");
                    WA.room.hideLayer("Close/South");
                    WA.room.setProperty("Exit/Open/South/bottom", "exitUrl", exit.url);
                } else {
                    WA.room.hideLayer("Open/South");
                    WA.room.showLayer("Close/South");
                    WA.room.setProperty("Exit/Open/South/bottom", "exitUrl", undefined);
                }
            }
            if (exit.nameSpace === "east") {
                if (exit.active) {
                    WA.room.showLayer("Open/East");
                    WA.room.hideLayer("Close/East");
                    WA.room.setProperty("Exit/Open/East/bottom", "exitUrl", exit.url);
                } else {
                    WA.room.hideLayer("Open/East");
                    WA.room.showLayer("Close/East");
                    WA.room.setProperty("Exit/Open/East/bottom", "exitUrl", undefined);
                }
            }
            if (exit.nameSpace === "west") {
                if (exit.active) {
                    WA.room.showLayer("Open/West");
                    WA.room.hideLayer("Close/West");
                    WA.room.setProperty("Exit/Open/West/bottom", "exitUrl", exit.url);
                } else {
                    WA.room.hideLayer("Open/West");
                    WA.room.showLayer("Close/West");
                    WA.room.setProperty("Exit/Open/West/bottom", "exitUrl", undefined);
                }
            }
        }
    }

    function saveStart() {
        for (let start of $StartStore) {
            if (start == "north") {
                WA.room.setTiles([
                    {x: 22, y: 1, tile: start, layer: 'start'},
                    {x: 22, y: 2, tile: start, layer: 'start'},
                    {x: 23, y: 1, tile: start, layer: 'start'},
                    {x: 23, y: 2, tile: start, layer: 'start'}
                ]);
            } else if (start == "east") {
                WA.room.setTiles([
                    {x: 43, y: 16, tile: start, layer: 'start'},
                    {x: 43, y: 17, tile: start, layer: 'start'},
                    {x: 44, y: 16, tile: start, layer: 'start'},
                    {x: 44, y: 17, tile: start, layer: 'start'}
                ]);
            } else if (start == "south") {
                WA.room.setTiles([
                    {x: 30, y: 34, tile: start, layer: 'start'},
                    {x: 30, y: 35, tile: start, layer: 'start'},
                    {x: 31, y: 34, tile: start, layer: 'start'},
                    {x: 31, y: 35, tile: start, layer: 'start'}
                ]);
            } else if (start == "west") {
                WA.room.setTiles([
                    {x: 1, y: 11, tile: start, layer: 'start'},
                    {x: 1, y: 12, tile: start, layer: 'start'},
                    {x: 2, y: 11, tile: start, layer: 'start'},
                    {x: 2, y: 12, tile: start, layer: 'start'}
                ]);
            }
        }
    }

    function deleteJitsi() {
        WA.room.setProperty("jitsiAmphi/jitsiStage", "jitsiRoom", undefined);
        WA.room.setProperty("jitsiAmphi/jitsiBetween", "jitsiRoom", undefined);
        WA.room.setProperty("jitsiAmphi/jitsiYoutube", "jitsiRoom", undefined);

        WA.room.setProperty("meetingRoom/meetingroom-1/bottom", "jitsiRoom", undefined);
        WA.room.setProperty("meetingRoom/meetingroom-2/bottom", "jitsiRoom", undefined);
        WA.room.setProperty("meetingRoom/meetingroom-3/bottom", "jitsiRoom", undefined);
        WA.room.setProperty("meetingRoom/meetingroom-4/bottom", "jitsiRoom", undefined);
        WA.room.setProperty("meetingRoom/meetingroom-5/bottom", "jitsiRoom", undefined);
        WA.room.setProperty("meetingRoom/meetingroom-6/bottom", "jitsiRoom", undefined);
        WA.room.setProperty("meetingRoom/meetingroom-7/bottom", "jitsiRoom", undefined);
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