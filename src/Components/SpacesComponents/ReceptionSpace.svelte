<script lang="ts">
    import OpenCoWebSiteComponent from "../PropertiesComponents/OpenCoWebSiteComponent.svelte";
    import { OpenCoWebsiteStore } from "../../Stores/OpenCoWebsiteStore";

</script>

<div class="spaceComponent">
    <h2>Properties of the reception</h2>
</div>
<OpenCoWebSiteComponent openCoWebSite={$OpenCoWebsiteStore}/>