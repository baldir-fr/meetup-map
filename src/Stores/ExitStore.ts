/**
 * A store that contains an array of the exit on the map
 */
import {Readable, writable} from "svelte/store";

export interface ExitConfig {
    nameSpace : string,
    active: boolean,
    url : string,
}

function createExitStore() {
    const {subscribe, set, update} = writable<ExitConfig[]>([]);

    return {
        subscribe,
        setExitConfig: (space: string, active: boolean, url: string): void => {
            update((configs: ExitConfig[]) => {
                let found = false;
                for (let i = 0; i < configs.length; i++) {
                    if (configs[i].nameSpace === space) {
                        configs[i].active = active;
                        configs[i].url = url;
                        found = true;
                        break;
                    }
                }

                if(!found) {
                    configs.push({nameSpace: space, active: active, url: url});
                }

                return configs;
            })
        },
        resetJitsiStore: (): void => {
            set([]);
        }
    }
}

export const exitStore = createExitStore();