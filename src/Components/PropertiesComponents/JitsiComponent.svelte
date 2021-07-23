<script lang="ts">
    import type { JitsiConfig } from "../Configs/JitsiConfig";

    export let jitsi: JitsiConfig;
    let showMore: boolean = false;

</script>

<div class="nes-container with-title">
    <p class="title">Jitsi</p>
    <h2>{ jitsi.roomName }</h2>

    <section>
        <label>
            Name of the jitsi room :
            <input type="text" class="nes-input" bind:value={jitsi.roomName}>
        </label>
    </section>

    <section>
        <label>
            <input type="checkbox" class="nes-checkbox" bind:checked={jitsi.audioMute}>
            <span>Start with audio mute</span>
        </label>
        <label>
            <input type="checkbox" class="nes-checkbox" bind:checked={jitsi.videoMute}>
            <span>Start with video mute</span>
        </label>
    </section>

    <section>
        <p>You need to have the '{jitsi.adminTags}' tag to be moderator of this jitsi.</p>
    </section>

    <label class="right">
        <input type="checkbox" class="nes-checkbox" bind:checked={showMore}>
        <span> More options</span>
    </label>
    {#if showMore}
        <section>
            <label>
                Url of the jitsi server :
                <input type="text" class="nes-input" bind:value={jitsi.url}>
            </label>
            <p>(If empty the jitsi room will use the default jitsi server of your workadventure version)</p>
        </section>
    {/if}
</div>
