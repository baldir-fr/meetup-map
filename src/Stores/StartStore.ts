/**
 * A store that contains the name of the start layer on the map
 */
import { writable } from "svelte/store";

export const startStore = writable<string[]>(["start"]);