<script lang="ts">
    import JitsiComponent from "../PropertiesComponents/JitsiComponent.svelte";
    import YoutubeComponent from "../PropertiesComponents/YoutubeComponent.svelte";
    import { ConferenceStore } from "../../Stores/ConferenceStore";
</script>

<div class="spaceComponent">
    <h2>Properties of the amphi</h2>
    <label>
        <input type="radio" class="nes-radio" bind:group={$ConferenceStore.typeConference} value={1}>
        <span>Little conference (50 peoples or less)</span>
    </label>
    <label>
        <input type="radio" class="nes-radio" bind:group={$ConferenceStore.typeConference} value={2}>
        <span>Big conference (more than 50 peoples)</span>
    </label>
</div>

<JitsiComponent jitsi={$ConferenceStore.jitsi} />
{#if $ConferenceStore.typeConference === 2}
    <YoutubeComponent youtube={$ConferenceStore.youtube} />
{/if}