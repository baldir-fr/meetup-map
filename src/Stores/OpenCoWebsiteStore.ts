import { writable } from "svelte/store";
import type { openCoWebsiteConfig } from "../Components/Configs/OpenCoWebSiteConfig";

/**
 * A store that contains an array of the configuration of the OpenWebsite of the map
 */

function createOpenCoWebsiteStore() {
    const {subscribe, set, update} = writable<openCoWebsiteConfig[]>([]);

    return {
        subscribe,
        setOpenCoWebsiteConfig: (space: string, url: string, active: boolean, onaction: boolean, messageTrigger: string, fullscreen: boolean): void => {
            update((configs: openCoWebsiteConfig[]) => {
                let found = false;
                for (let i = 0; i < configs.length; i++) {
                    if (configs[i].nameSpace === space) {
                        configs[i].url = url;
                        configs[i].active = active;
                        configs[i].onaction = onaction;
                        configs[i].messageTrigger = messageTrigger;
                        configs[i].fullscreen = fullscreen;
                        found = true;
                        break;
                    }
                }

                if(!found) {
                    configs.push({nameSpace: space, url: url, active: active, onaction: onaction, messageTrigger: messageTrigger, fullscreen: fullscreen});
                }

                return configs;
            })
        },
        resetOpenCoWebsiteStore: (): void => {
            set([]);
        }
    }
}

export const OpenCoWebsiteStore = createOpenCoWebsiteStore();