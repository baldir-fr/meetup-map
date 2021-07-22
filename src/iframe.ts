/// <reference path="../../../workadventure-saas/workadventure/front/dist/src/iframe_api.d.ts" />
// @ts-ignore
import App from "./Components/App.svelte";
import "../style/style.scss";

const app = new App({
    target: document.body,
    props: {
        WA: WA,
    }
});

export default app;