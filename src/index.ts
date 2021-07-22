/// <reference path="../../../workadventure-saas/workadventure/front/dist/src/iframe_api.d.ts" />

// You can write your WorkAdventure script here, if any.
// The "WA" global object is available from anywhere.
WA.ui.registerMenuCommand('Configure the room', () => {
    WA.nav.openCoWebSite("../iframe.html", true);
});
/*Start by hiding the following layer :
    - Open/North
    - Open/East
    - Open/West
    - Close/South
    - meetingroom-6
    - meetingroom-7
 */
WA.room.hideLayer('Open/North');
WA.room.hideLayer('Open/East');
WA.room.hideLayer('Open/West');
WA.room.hideLayer('Close/South');
WA.room.hideLayer('meetingroom-6');
WA.room.hideLayer('meetingroom-7');


export {}
