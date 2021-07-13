import {writable} from "svelte/store";
import type {jitsiConfig} from "../Components/Configs/JitsiConfig";
import type {youtubeConfig} from "../Components/Configs/YoutubeConfig";



/**
 * A store that contains the type of conference that the user want in the amphi
 * 1 : Little conference, only jitsi
 * 2 : Big conference, jitsi on stage and youtube for audience
 */

interface TypeConference {
    typeConference : number,
    jitsi : jitsiConfig,
    youtube : youtubeConfig;
}

export const ConferenceStore = writable<TypeConference>();