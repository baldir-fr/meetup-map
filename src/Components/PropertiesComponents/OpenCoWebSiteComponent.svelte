<script lang="ts">
    import type { OpenCoWebSiteConfig } from "../Configs/OpenCoWebSiteConfig";

    export let openCoWebSite: OpenCoWebSiteConfig

</script>

<div class="nes-container with-title">
    <p class="title">OpenCoWebSite</p>
    <section class="centered">
        <p>Do you want an OpenCoWebSite in your reception ?</p>
        <label>
            <input type="radio" class="nes-radio" bind:group={openCoWebSite.active} value={1}>
            <span>Yes</span>
        </label>
        <label>
            <input type="radio" class="nes-radio" bind:group={openCoWebSite.active} value={0}>
            <span>No</span>
        </label>
    </section>

    <section>
        <label class={!openCoWebSite.active ? "disabled" : ""}>
            URL :
            <input type="text" class="nes-input" bind:value={openCoWebSite.url} disabled={!openCoWebSite.active}>
        </label>
        <label class={!openCoWebSite.active ? "disabled" : ""}>
            <input type="checkbox" class="nes-checkbox" bind:checked={openCoWebSite.fullscreen} disabled={!openCoWebSite.active}>
            <span>Fullscreen</span>
        </label>
    </section>
    <section>
        <label class={!openCoWebSite.active ? "disabled" : ""}>
            <input type="checkbox" class="nes-checkbox" bind:checked={openCoWebSite.onaction} disabled={!openCoWebSite.active}>
            <span>Trigger by action</span>
        </label>
        <label class={!openCoWebSite.active || !openCoWebSite.onaction ? "disabled" : ""}>
            Message trigger :
            <input type="text" class="nes-input" bind:value={openCoWebSite.messageTrigger} disabled={!openCoWebSite.active || !openCoWebSite.onaction}>
        </label>
    </section>
</div>
