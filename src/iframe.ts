/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import App from "./Components/App.svelte";
import "../style/style.scss";
import {mapVariableToStore} from "./Stores/VariableMapper";
import {MeetingRoomStore} from "./Stores/MeetingRoomStore";

WA.onInit().then(() => {
    //mapVariableToStore('meetingRooms', MeetingRoomStore);
});

const app = new App({
    target: document.body,
    props: {
        WA: WA,
    }
});

export default app;
