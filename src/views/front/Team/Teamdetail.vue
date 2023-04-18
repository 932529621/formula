<template>
  <v-app>
    <racenav></racenav>
    <teamTop></teamTop>
    <vrcar></vrcar>
    <detailNews></detailNews>
    <teamcontent v-if="isgetTeamInfo"></teamcontent>
    <detailSwiper></detailSwiper>
    <detailAlsolike></detailAlsolike>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

    <script>
import { getDriverDetail, getteamdetailById } from "@/plugins/http";
import racenav from "../../../components/front/homes/nav.vue";
import teamTop from "../../../components/front/team/teamdetailTop.vue";
import vrcar from "../../../components/front/team/teamdetailvrcar.vue";
import detailNews from "../../../components/front/driver/driverdetailAboutNews.vue";
import teamcontent from "../../../components/front/team/teamdetailcontent.vue";
import detailSwiper from "../../../components/front/team/teamdetailSwiper.vue";
import detailAlsolike from "../../../components/front/driver/driverdetailAlsolike.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  components: {
    racenav,
    partner,
    bottom,
    Racefooter,
    teamTop,
    vrcar,
    detailSwiper,
    teamcontent,
    detailNews,
    detailAlsolike,
  },
  data:()=>({
    teamlist:[],
    isgetTeamInfo:false
  }),
 async mounted() {
    window.scrollTo(0, 0);
    // this.$axios
    //   .get(`http://127.0.0.1:8080/api/teamdetail/getteamdetail?teamname=${this.$route.query.teamName}&teamId=${this.$route.query.teamId}`,)
    //   .then((res) => {
    //     console.log(res);
        
    //     if (res.status === 200) {
    //         const teamInfo={...res.data[0]};
    //         this.$store.dispatch('team/getteamDetail',teamInfo);
    //         this.isgetTeamInfo=true
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //   console.log('父');
    const reslt=await getteamdetailById({teamname:this.$route.query.teamName,teamId:this.$route.query.teamId})
    const res = await getDriverDetail();
    if (reslt.data.Operation === "success") {
      console.log(reslt.data[0]);
        this.teamlist.push(reslt.data[0]);
      if (this.teamlist.length) {
        res.data.DriverDetail.forEach((i) => {
          this.teamlist.forEach((items, index) => {
            if (i.name === items.driver_two) {
              items.driver_two_halfpic = i.driver_pic;
            }
            if (i.name === items.driver_one) {
              items.driver_one_halfpic = i.driver_pic;
            }
          });
        });

      }
      this.isgetTeamInfo=true
      this.$store.dispatch('team/getteamDetail',this.teamlist[0]);
    }
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
      h4{
        font-family: Lobster;
        font-size: 2rem;
      }
    }
  }
}
@media screen and (max-width: 1300px) {
  .detailTop_left_title,.detailTop_left_content{
    font-size: 1rem !important;
  }
}
@media screen and (max-width: 1050px) {
  // .detailTop_left_title,.detailTop_left_content{
  //   font-size: .8rem !important;
  // }
  
}
@media screen and (max-width: 780px) {
 .teamdetail_Top_container{
  flex-direction: column !important;
 }
 .teamdetail_left,.teamdetail_right{
  width: 100% !important;
 }
}
</style>