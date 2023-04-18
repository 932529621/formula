<template>
  <div class="ticket_top" ref="ticketVideo">
    <video autoplay loop muted :src="backvideo[0].video_path"></video>
    <div class="ticket_back"></div>
    <span> F1® TICKETS RACE CALENDAR </span>
  </div>
</template>

<script>
import {
  getVideos,
} from "@/plugins/http";
import { mapState } from "vuex";
export default {
  data: () => ({
    backvideo: null,
  }),
  methods: {
    ticketVideo() {
      if (window.scrollY > 0) {
        this.$refs.ticketVideo.style.height = "50vh";
      } else {
        this.$refs.ticketVideo.style.height = "90vh";
      }
    },
  },
 async mounted() {
    window.addEventListener("scroll", this.ticketVideo, false);
    const res=await getVideos();
    this.backvideo=res.data.videos.filter((item)=>{
      if(item.video_status==='Ticket Banner'){
        return item.video_path;
      }
    })
    console.log( this.backvideo);
    
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.ticketVideo, false);
  },
};
</script>

<style lang="scss">
.ticket_top {
  width: 100vw;
  height: 60vh;
  position: relative;
  transition: all 1s ease;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
  }
  .ticket_back {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, black, transparent);
    position: absolute;
    z-index: 10;
  }
  span {
    bottom: 10%;
    left: 5%;
    font-family: Heavy;
    color: white;
    text-transform: uppercase;
    font-size: 2.5rem;
    line-height: 36px;
    position: absolute;
    z-index: 10;
    text-shadow: 0px 0px 10px rgb(255 255 255 / 90%);
  }
}
</style>