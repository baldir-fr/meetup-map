/// <reference path="../../../workadventure.src/workadventure/front/dist/src/iframe_api.d.ts" />

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
