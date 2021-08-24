/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

// You can write your WorkAdventure script here, if any.
// The "WA" global object is available from anywhere.
import type { TypeConference } from "./Stores/ConferenceStore";
import {get} from "svelte/store";
import type {MeetingRooms} from "./Stores/MeetingRoomStore";
import {OpenCoWebsiteStore} from "./Stores/OpenCoWebsiteStore";
import {ExitStore} from "./Stores/ExitStore";
import {StartStore} from "./Stores/StartStore";
import type {JitsiConfig} from "./Components/Configs/JitsiConfig";
import type {OpenCoWebSiteConfig} from "./Components/Configs/OpenCoWebSiteConfig";
import type {ExitConfig} from "./Components/Configs/ExitConfig";
import type {YoutubeConfig} from "./Components/Configs/YoutubeConfig";

/*Start by hiding the following layer :
    - Open/North
    - Open/East
    - Open/West
    - Close/South
    - meetingroom-6
    - meetingroom-7
 */
WA.room.hideLayer('Open/North');
WA.room.hideLayer('Open/East');
WA.room.hideLayer('Open/West');
WA.room.hideLayer('Close/South');
WA.room.hideLayer('meetingroom-6');
WA.room.hideLayer('meetingroom-7');

WA.onInit().then(() => {
    if (WA.player.tags.includes('configure') || WA.player.tags.includes('admin')) {
        WA.ui.registerMenuCommand('Configure the room', () => {
            WA.nav.openCoWebSite("../iframe.html", true);
        });
    }
    applyMetadata();
});

function applyMetadata() {
    deleteJitsi();
    applyConference();
    applyMeetingRooms();
    applyOpenCoWebSite();
    applyExit();
    applyStart();
}

function applyConference() {
    const conference = WA.state.conference as TypeConference|undefined;
    if (conference === undefined) {
        return;
    }

    if (conference.typeConference === 1) {
        applyJitsiConfig(conference.jitsi);
        applyJitsiConfig(conference.jitsi, "jitsiAmphi/jitsiBetween");
        applyJitsiConfig(conference.jitsi, "jitsiAmphi/jitsiYoutube");
    } else if (conference.typeConference === 2) {
        applyJitsiConfig(conference.jitsi);
        applyYoutubeConfig(conference.youtube);
    }
}

WA.state.onVariableChange("conference").subscribe(applyConference);

function applyMeetingRooms() {
    const meetingRooms = WA.state.meetingRooms as MeetingRooms|undefined;
    if (meetingRooms === undefined) {
        return;
    }

    if (meetingRooms.nbRooms === 2) {
        for (let i = 0; i < meetingRooms.nbRooms; i++) {
            applyJitsiConfig(meetingRooms.jitsis[i], "meetingRoom/meetingroom-" + (i + 6) + "/bottom");
            WA.room.showLayer("meetingroom-" + (i + 6));
        }

        WA.room.hideLayer("meetingroom-1");
        WA.room.hideLayer("meetingroom-2");
        WA.room.hideLayer("meetingroom-3");
        WA.room.hideLayer("meetingroom-4");
        WA.room.hideLayer("meetingroom-5");
    }
    if (meetingRooms.nbRooms === 3) {
        applyJitsiConfig(meetingRooms.jitsis[0], "meetingRoom/meetingroom-6/bottom");
        applyJitsiConfig(meetingRooms.jitsis[1]);
        applyJitsiConfig(meetingRooms.jitsis[2], "meetingRoom/meetingroom-7/bottom");

        WA.room.showLayer("meetingroom-3");
        WA.room.showLayer("meetingroom-6");
        WA.room.showLayer("meetingroom-7");

        WA.room.hideLayer("meetingroom-1");
        WA.room.hideLayer("meetingroom-2");
        WA.room.hideLayer("meetingroom-4");
        WA.room.hideLayer("meetingroom-5");
    }
    if (meetingRooms.nbRooms === 4) {
        applyJitsiConfig(meetingRooms.jitsis[0], "meetingRoom/meetingRoom/meetingroom-6/bottom");
        WA.room.showLayer("meetingroom-6");

        WA.room.hideLayer("meetingroom-1");
        WA.room.hideLayer("meetingroom-2");
        WA.room.hideLayer("meetingroom-7");

        for (let i = 1; i < meetingRooms.nbRooms; i++) {
            applyJitsiConfig(meetingRooms.jitsis[i]);
            WA.room.showLayer("meetingroom-" + (i + 2));
        }
    }
    if (meetingRooms.nbRooms === 5) {
        for (let jitsi of meetingRooms.jitsis) {
            applyJitsiConfig(jitsi);
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

WA.state.onVariableChange("meetingRooms").subscribe(applyMeetingRooms);


function applyJitsiConfig(jitsiConfig: JitsiConfig, name?: string) {
    WA.room.setProperty(name ? name : jitsiConfig.nameSpace, "jitsiRoom", jitsiConfig.roomName);
    if (jitsiConfig.url !== '') {
        WA.room.setProperty(name ? name : jitsiConfig.nameSpace, "jitsiUrl", jitsiConfig.url);
    }
    let jitsiConfigFormat = `{ \"startWithAudioMuted\": ${jitsiConfig.audioMute}, \"startWithVideoMuted\": ${jitsiConfig.videoMute} } `;
    WA.room.setProperty(name ? name : jitsiConfig.nameSpace, "jitsiConfig", jitsiConfigFormat);
}

function applyYoutubeConfig(youtubeConfig: YoutubeConfig) {
    WA.room.setProperty(youtubeConfig.nameSpace, "OpenCoWebSite", "https://www.youtube.com/embed/live_stream?channel=" + youtubeConfig.channelID);
    let youtubeConfigFormat = `${youtubeConfig.fullscreen ? 'fullscreen' : ''}; ${youtubeConfig.autoplay ? 'autoplay' : ''}; ${youtubeConfig.pictureInPicture ? 'picture-in-picture' : ''}`;
    WA.room.setProperty(youtubeConfig.nameSpace, "OpenCoWebSitePolicy", youtubeConfigFormat);
}

function applyOpenCoWebSite() {
    const receptionWebsite = WA.state.receptionWebsite as OpenCoWebSiteConfig|undefined;
    if (receptionWebsite === undefined) {
        return;
    }
    if (receptionWebsite.active) {
        WA.room.setProperty(receptionWebsite.nameSpace, 'OpenCoWebSite', receptionWebsite.url);
        let OpenCoWebSiteConfigFormat = `${receptionWebsite.fullscreen ? 'fullscreen' : undefined}`;
        WA.room.setProperty(receptionWebsite.nameSpace, 'OpenCoWebSitePolicy', OpenCoWebSiteConfigFormat);
        if (receptionWebsite.onaction) {
            WA.room.setProperty(receptionWebsite.nameSpace, 'OpenCoWebSiteTrigger', 'onaction');
            WA.room.setProperty(receptionWebsite.nameSpace, 'OpenCoWebSiteTriggerMessage', receptionWebsite.messageTrigger);
        }
    } else {
        WA.room.setProperty(receptionWebsite.nameSpace, "OpenCoWebSite", undefined);
    }
}

WA.state.onVariableChange("receptionWebsite").subscribe(applyOpenCoWebSite);

function applyExit() {
    const exits = WA.state.exits as ExitConfig[]|undefined;
    if (exits === undefined) {
        return;
    }
    for (let exit of exits) {
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

WA.state.onVariableChange("exits").subscribe(applyExit);



function applyStart() {
    const starts = WA.state.starts as string[]|undefined;
    if (starts === undefined) {
        return;
    }

    for (let start of starts) {
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

WA.state.onVariableChange("starts").subscribe(applyStart);

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


export {}
