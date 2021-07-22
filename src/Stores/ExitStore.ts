import { writable } from "svelte/store";
import type { exitConfig } from "../Components/Configs/ExitConfig";
/**
 * A store that contains an array of the exit on the map
 */

function createExitStore() {
    const { subscribe, update } = writable<exitConfig[]>(
        [
            {
                nameSpace: 'north',
                active: false,
                url: '',
            },
            {
                nameSpace: 'east',
                active: false,
                url: '',
            },
            {
                nameSpace: 'south',
                active: true,
                url: '',
            },
            {
                nameSpace: 'west',
                active: false,
                url: '',
            }
        ]);

    return {
        subscribe,
        addExit: (newExit: exitConfig): void => {
            update((configs: exitConfig[]) => {
                let found = false;
                for (let config of configs) {
                    if (config.nameSpace === newExit.nameSpace) {
                        config.url = newExit.url;
                        config.active = newExit.active;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    configs.push(newExit);
                }

                return configs;
            })
        }
    }
}

export const ExitStore = createExitStore();