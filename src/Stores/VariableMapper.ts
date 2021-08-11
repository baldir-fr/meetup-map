import type {Readable} from "svelte/store";

/**
 * A function that maps a WorkAdventure variable to a Svelte store
 *
 * The store is initialized with the value of the variable.
 */
export function mapVariableToStore(variableName: string, store: Readable<unknown>&{set(this: void, value: unknown): void;}) {
    store.set(WA.state.loadVariable(variableName));

    store.subscribe((value) => {
        WA.state.saveVariable(variableName, value);
    });

    WA.state.onVariableChange(variableName).subscribe((value: unknown) => {
        store.set(value);
    });
}
