import { writable } from "svelte/store";
import type { OpenCoWebSiteConfig } from "../Components/Configs/OpenCoWebSiteConfig";

/**
 * A store that contains an array of the configuration of the OpenCoWebSite of the map
 */

export const OpenCoWebsiteStore = writable<OpenCoWebSiteConfig>(
    {
        nameSpace: "reception",
        url: '',
        active: 0,
        onaction : false,
        messageTrigger: '',
        fullscreen : false,
});
