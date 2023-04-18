<template>
  <div class="ticket_top" ref="ticketVideo">
    <img
      :src="topinfo.nation_banner_pic"
      alt=""
    />
    <div class="ticket_back"></div>
    <span class="ticket_title_date">{{topinfo.race_date}}</span>
    <span class="ticket_title_subtitle">
      {{topinfo.prix_fullname}}
    </span>
  </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
export default {
  data:()=>({
    topinfo:null,
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
  computed:{
    ...mapState('ticket',['ticketDetailInfo'])
  },
  mounted() {
    window.addEventListener("scroll", this.ticketVideo, false);
    console.log(this.ticketDetailInfo);
    let topinfo;
    topinfo=this.ticketDetailInfo.filter((i)=>{
      return i.id===this.$route.query.ticketId;
    })
    this.topinfo=topinfo[0];
  
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    min-width: 70vh;
  }
  .ticket_back {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, black, transparent);
    position: absolute;
    z-index: 10;
  }
  .ticket_title_date{
    bottom: 20%;
    left: 5%;
    font-size:1.2rem !important;

  }
  .ticket_title_subtitle{
    bottom: 10%;
    left: 5%;
  }

  span {
   
    font-family: Heavy;
    color: white;
    text-transform: uppercase;
    font-size: 2rem;
    line-height: 36px;
    position: absolute;
    z-index: 10;
    text-shadow: 0px 0px 10px rgb(255 255 255 / 90%);
  }
}
</style>