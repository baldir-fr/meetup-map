<script lang="ts">
    import { MeetingRoomStore } from "../Stores/MeetingRoomStore";
    import miniatureConfig5 from "../../image/mini-config-5-rooms.png"
    import miniatureConfig4 from "../../image/mini-config-4-rooms.png"
    import miniatureConfig3 from "../../image/mini-config-3-rooms.png"
    import miniatureConfig2 from "../../image/mini-config-2-rooms.png"
</script>

<div class="img-miniature">
    {#if $MeetingRoomStore.nbRooms === 5}
        <img src="{miniatureConfig5}" alt="Miniature Configuration with 5 rooms"/>
    {/if}
    {#if $MeetingRoomStore.nbRooms === 4}
        <img src="{miniatureConfig4}" alt="Miniature Configuration with 4 rooms"/>
    {/if}
    {#if $MeetingRoomStore.nbRooms === 3}
        <img src="{miniatureConfig3}" alt="Miniature Configuration with 3 rooms"/>
    {/if}
    {#if $MeetingRoomStore.nbRooms === 2}
        <img src="{miniatureConfig2}" alt="Miniature Configuration with 2 rooms"/>
    {/if}

    <section class="show-space-Amphi">Amphi</section>
    <section class="show-space-MeetingRoom">Meeting Rooms</section>
    <section class="show-space-Reception">Reception</section>
</div>

<style lang="scss">
  div.img-miniature {
    position: relative;
    width: 630px;
    height: 500px;

    text-align: center;
    margin-bottom: 25px;
    margin-right: auto;
    margin-left: auto;

    img {
      width: 100%;
      height: 100%;
    }

    section {
      position: absolute;
      border: #006bb3 2px solid;
      font-size: 25px;

      display: flex;
      justify-content: center;
      align-items: center;

      &.show-space-Amphi {
        width: 370px;
        height: 325px;
        top: 175px;
        left: 0;

        &:hover {
          background: linear-gradient(45deg, rgb(255, 255, 255, .5) 1%, rgb(0, 107, 179, .5) 1%, rgb(0, 107, 179, .5) 49%, rgb(255, 255, 255, .5) 49%, rgb(255, 255, 255, .5) 51%, rgb(0, 107, 179, .5) 51%, rgb(0, 107, 179, .5) 99%, rgb(255, 255, 255, .5) 99%);
          background-size: 6px 6px;
        }
      }

      &.show-space-Reception {
        width: 152px;
        height: 203px;
        top: 297px;
        left: 478px;

        &:hover {
          background: linear-gradient(45deg, rgb(255, 255, 255, .5) 1%, rgb(0, 107, 179, .5) 1%, rgb(0, 107, 179, .5) 49%, rgb(255, 255, 255, .5) 49%, rgb(255, 255, 255, .5) 51%, rgb(0, 107, 179, .5) 51%, rgb(0, 107, 179, .5) 99%, rgb(255, 255, 255, .5) 99%);
          background-size: 6px 6px;
        }
      }

      &.show-space-MeetingRoom {
        width: 630px;
        height: 150px;
        top: 0;
        left: 0;

        &:hover {
          background: linear-gradient(45deg, rgb(255, 255, 255, .5) 1%, rgb(0, 107, 179, .5) 1%, rgb(0, 107, 179, .5) 49%, rgb(255, 255, 255, .5) 49%, rgb(255, 255, 255, .5) 51%, rgb(0, 107, 179, .5) 51%, rgb(0, 107, 179, .5) 99%, rgb(255, 255, 255, .5) 99%);
          background-size: 6px 6px;
        }
      }
    }
  }
</style>