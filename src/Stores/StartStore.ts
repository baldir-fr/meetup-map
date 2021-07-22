import { writable } from "svelte/store";

/**
 * A store that contains the name of the start layer on the map
 */

export const StartStore = writable<string[]>();