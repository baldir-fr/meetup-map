import { writable } from "svelte/store";
import type { jitsiConfig } from "../Components/Configs/JitsiConfig";


/**
 * A store that contains the number of meeting rooms wanted and the configuration of every jitsi of the meeting room.
 */

interface meetingRooms {
    nbRooms : number,
    jitsis : jitsiConfig[],
}

function createMeetingRoomStore() {
    const {subscribe, update} = writable<meetingRooms>({
        nbRooms : 5,
        jitsis : [
            {
                nameSpace : "meetingRoom/meetingroom-1/bottom",
                roomName : "meetingroom-1",
                url : '',
                audioMute : false,
                videoMute : false,
                adminTags : ["expert"],
            },
            {
                nameSpace : "meetingRoom/meetingroom-2/bottom",
                roomName : "meetingroom-2",
                url : '',
                audioMute : false,
                videoMute : false,
                adminTags : ["expert"],
            },
            {
                nameSpace : "meetingRoom/meetingroom-3/bottom",
                roomName : "meetingroom-3",
                url : '',
                audioMute : false,
                videoMute : false,
                adminTags : ["expert"],
            },
            {
                nameSpace : "meetingRoom/meetingroom-4/bottom",
                roomName : "meetingroom-4",
                url : '',
                audioMute : false,
                videoMute : false,
                adminTags : ["expert"],
            },
            {
                nameSpace : "meetingRoom/meetingroom-5/bottom",
                roomName : "meetingroom-5",
                url : '',
                audioMute : false,
                videoMute : false,
                adminTags : ["expert"],
            },
        ]
    });

    return {
        subscribe,
        setNbRooms: (nb : number): void => {
            update((meetingRoom : meetingRooms) => {
                meetingRoom.nbRooms = nb;
                return meetingRoom;
            })
        },
    }
}

export const MeetingRoomStore = createMeetingRoomStore();