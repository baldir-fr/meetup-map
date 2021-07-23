import { writable } from "svelte/store";
import type { JitsiConfig } from "../Components/Configs/JitsiConfig";


/**
 * A store that contains the number of meeting rooms wanted and the configuration of every jitsi of the meeting room.
 */

export interface MeetingRooms {
    nbRooms : number,
    jitsis : JitsiConfig[],
}

const defaultMeetingRooms = {
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
};

function createMeetingRoomStore() {
    const {subscribe, update, set} = writable<MeetingRooms>(defaultMeetingRooms);

    return {
        subscribe,
        set: (value: MeetingRooms|undefined): void => {
            if (value === undefined) {
                set(defaultMeetingRooms);
            } else {
                set(value);
            }
        },
        setNbRooms: (nb : number): void => {
            update((meetingRoom : MeetingRooms) => {
                meetingRoom.nbRooms = nb;
                return meetingRoom;
            })
        },
    }
}

export const MeetingRoomStore = createMeetingRoomStore();
