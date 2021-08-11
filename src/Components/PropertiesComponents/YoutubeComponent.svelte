<script lang="ts">
    import type { YoutubeConfig } from "../Configs/YoutubeConfig";

    export let youtube: YoutubeConfig;

</script>

<div class="nes-container with-title">
    <p class="title">Youtube</p>
    <section>
        <label>
            URL Live Stream:
            <input type="text" class="nes-input" bind:value={youtube.channelID}>
        </label>
    </section>
    <section>
        <label>
            <input type="checkbox" class="nes-checkbox" bind:checked={youtube.fullscreen}>
            <span>Fullscreen</span>
        </label>
        <label>
            <input type="checkbox" class="nes-checkbox" bind:checked={youtube.autoplay}>
            <span>Autoplay</span>
        </label>
        <label>
            <input type="checkbox" class="nes-checkbox" bind:checked={youtube.pictureInPicture}>
            <span>Picture-in-picture</span>
        </label>
    </section>
</div>
