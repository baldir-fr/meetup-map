<script lang="ts">
    import {get} from "svelte/store";
    import {OpenCoWebsiteStore} from "../../Stores/OpenCoWebsiteStore";

    export let OpenCoWebSiteNameSpace: string;

    let OpenCoWebSiteConfig = get(OpenCoWebsiteStore).find(opws => opws.nameSpace === OpenCoWebSiteNameSpace);
    let OpenCoWebSite = OpenCoWebSiteConfig ? OpenCoWebSiteConfig.active ? 1 : 0 : 1;
    let onaction = OpenCoWebSiteConfig ? OpenCoWebSiteConfig.onaction : false;
    let fullscreen = OpenCoWebSiteConfig ? OpenCoWebSiteConfig.fullscreen : false;
    let OpenCoWebSiteUrl = OpenCoWebSiteConfig ? OpenCoWebSiteConfig.url : '';
    let messageTrigger = OpenCoWebSiteConfig ? OpenCoWebSiteConfig.messageTrigger : '';

    function changeOpenCoWebSiteConfig() {
        OpenCoWebsiteStore.setOpenCoWebSiteConfig(OpenCoWebSiteNameSpace, OpenCoWebSiteUrl, (OpenCoWebSite === 1), onaction, messageTrigger, fullscreen);
    }
</script>

<div>
    <p>Do you want an OpenCoWebSite in your reception ?</p>
    <label>
        <input type="radio" bind:group={OpenCoWebSite} value={1}>
        Yes
    </label>
    <label>
        <input type="radio" bind:group={OpenCoWebSite} value={0}>
        No
    </label>

    <form on:change={() => changeOpenCoWebSiteConfig()}>
        <label>URL :
            <input type="text" bind:value={OpenCoWebSiteUrl} disabled="{OpenCoWebSite === 0}">
        </label>
        <label>
            <input type="checkbox" bind:checked={onaction} disabled="{OpenCoWebSite === 0}">
            Trigger by action
        </label>
        <label>Message trigger :
            <input type="text" bind:value={messageTrigger} disabled="{OpenCoWebSite === 0}">
        </label>
        <label>
            <input type="checkbox" bind:checked={fullscreen} disabled="{OpenCoWebSite === 0}">
            Fullscreen
        </label>
    </form>
</div>