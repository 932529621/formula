<template>
  <v-app>
    <racenav></racenav>
    <detailTop></detailTop>
    <detailNews></detailNews>
    <capacity></capacity>
    <detailcontent v-if="isgetInfo"></detailcontent>
    <detailSwiper></detailSwiper>
    <detailAlsolike></detailAlsolike>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>
  
  <script>
import racenav from "../../../components/front/homes/nav.vue";
import detailTop from "../../../components/front/driver/driverdetailTop.vue";
import detailNews from "../../../components/front/driver/driverdetailAboutNews.vue";
import detailSwiper from "../../../components/front/driver/driverdetailSwiper.vue";
import detailcontent from "../../../components/front/driver/driverdetailcontent.vue";
import detailAlsolike from "../../../components/front/driver/driverdetailAlsolike.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
import capacity from "../../../components/front/driver/drivercapacity.vue";

export default {
  components: {
    racenav,
    partner,
    bottom,
    Racefooter,
    detailTop,
    detailSwiper,
    detailcontent,
    detailNews,
    detailAlsolike,
    capacity
  },
  data:()=>({
    isgetInfo:false
  }),
  mounted() { 
  window.scrollTo(0, 0); 
    this.$axios
      .get(`http://127.0.0.1:8080/api/driverdetail/getdriverdetail/?driverlastName=${this.$route.query.driverlastName}&driverId=${this.$route.query.driverId}`,)
      .then((res) => {
        if (res.status === 200) {
            const driverInfo={...res.data[0]};
            this.$store.dispatch('driver/getdriverDetail',driverInfo);
            this.isgetInfo=true
            // console.log(driverInfo.id);
            // console.log(this.$route.query.driverlastName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

};

</script>
  
<style lang="scss" > 
.detailcontent {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .detailcontent_container {
    width: 93%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-width: 100px;
    min-height: 100px;
    padding: 20px 40px 55px 40px;
    .text {
      h3 {
        color: rgb(0, 0, 0);
        font-family: Heavy;
        font-size: 2.5rem;
        margin-bottom: 20px;
      }
      p {
        color: #1e1e1e;
        font-family: Heavy;
        font-size: 1.1rem;
        line-height: 2.3;
        vertical-align: baseline;

      }
    }
  }
}
@media screen and (max-width: 1300px) {
  .detailTop_right_title{
    font-size:1.5rem  !important;
  }
  .detailTop_right_content{
    font-size:1rem  !important;
  }
  .aboutNews_column{
    min-width: 280px !important;
    max-height:350px !important;
  }
  .aboutNews_container{
    row-gap: 15px !important;
  }
}
@media screen and (max-width: 1050px) {
  .detailTop_right_title{
    font-size:1.2rem  !important;
  }
  .detailTop_right_content{
    font-size:.8rem  !important;
  }
}
@media screen and (max-width: 780px) {
  .aboutNews_column{
    min-width: 180px !important;
    max-height: 240px !important;
  }
  .aboutNews_columnBottom{
    padding: 0 10px !important;
  }
  .aboutNews_column_time{
    font-size: 0.5rem !important;
    svg{
      width: 20!important;
      height: 20!important;
    }
  }
  .aboutNews_column_content{
    font-size: 0.5rem !important;
    margin-bottom: 5% !important;
  }
  .aboutNews_column_category{
    font-size: 1rem !important;
  }
  .detailTop_right_title{
    font-size:1.2rem  !important;
    width: 60% !important;
  }
  .detailTop_right_content{
    font-size:.8rem  !important;
    width: 30% !important;
  }
  .detailTop_driverName{
    font-size: 2.2rem !important;
  }
  .detailTop_container{
   flex-direction: column !important;
  }
  .detailTop_container_left{
    width: 100% !important;
  }
  .detailTop_container_right{
    width: 100% !important;
  }
  .detailTop_container_right_column{
    justify-content: space-evenly !important;
  }
  .SwiperContainer{
    height: 410px !important;
  }
  .swiper_intro div{
    font-size: .5rem !important; 
  }
  .swiper_intro{
    overflow: auto !important;
    padding: 5px 5px 0px 60px !important;
  }
  .detail_alsolike_title{
    font-size:1.8rem !important;
  }
  .detail_alsolike{
    justify-content: flex-start !important;
  }
  .alsolike_items{
    width: 190px !important;
    height: 220px !important;
  }
  .alsolike_container{
    column-gap: 5px !important;
    justify-content: center !important;
  }
}
</style>