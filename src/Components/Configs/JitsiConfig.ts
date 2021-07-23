/**
 * Declare and export the jitsiConfig interface
 */

export interface JitsiConfig {
    nameSpace : string,
    roomName: string,
    url : string,
    audioMute : boolean,
    videoMute : boolean,
    adminTags : string[],
}
