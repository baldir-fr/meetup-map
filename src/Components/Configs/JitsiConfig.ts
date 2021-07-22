/**
 * Declare and export the jitsiConfig interface
 */

export interface jitsiConfig {
    nameSpace : string,
    roomName: string,
    url : string,
    audioMute : boolean,
    videoMute : boolean,
    adminTags : string[],
}