<template>
  <v-app>
    <racenav></racenav>
    <swiper v-if="hasinfo"></swiper>
    <news v-if="hasinfo"></news>
    <morenews v-if="hasinfo"></morenews>
    <drivermarket v-if="hasinfo"></drivermarket>
    <technical v-if="hasinfo"></technical>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import racenav from "../../../components/front/homes/nav.vue";
import news from "../../../components/front/homes/news.vue";
import morenews from "../../../components/front/Latest/morenews.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
import drivermarket from "../../../components/front/Latest/drivermarket.vue";
import technical from "../../../components/front/Latest/technical.vue";
import swiper from "../../../components/front/Latest/swiper.vue";
export default {
  components: {
    racenav,
    swiper,
    news,
    morenews,
    technical,
    drivermarket,
    partner,
    bottom,
    Racefooter,
  },
  data: () => ({
    isloading: true,
    desserts: [],
    hasinfo:false,
  }),
  computed: {
    ...mapState("latest", ["latesInfo"]),
  },
 async created() {
    window.scrollTo(0, 0);
    window.onload = () => {
      this.isloading = false;
    };
   await this.$store.dispatch("latest/getlatestDetail");
   
    if(this.latesInfo){
      this.hasinfo=true;
    }
  },
};
</script>

<style lang="scss" >
@media screen and (max-width: 1300px) {
  .main {
    .latest_news_container {
      .top_news {
        .top_news_right {
          .top_news_right_left > div {
            width: 270px;
            height: 180px;
          }
          .top_news_right_right > div {
            width: 270px;
            height: 180px;
          }
        }
      }
    }
    .latest_news_container::after{
        font-size: 1.5em !important;
        top: -5%;
        left: 0;
      }
  }
  .swiper_news_title {
    font-size: 1.8em !important;
  }
}
@media screen and (max-width: 1050px) {
  .main {
    .latest_news_container {
      .top_news {
        flex-direction: column;
        .top_news_right {
          gap: 0;

          .top_news_right_left > div {
            width: 330px;
            height: 210px;
          }
          .top_news_right_right > div {
            width: 330px;
            height: 210px;
          }
        }
      }
    }
    .latest_news_container::after{
        font-size: 1.2em !important;
        top:-1%;
        left: 10%;
      }
    .latest_news_container::before {
      display: none;
    }
  }
  .swiper_news_title {
    font-size: 1.5em !important;
  }
}
@media screen and (max-width: 780px) {
  .main {
    margin-top: 10% !important;
    .latest_news_container {
      .top_news {
        flex-direction: column;
        .top_news_right {
          gap: 10px;

          .top_news_right_left > div {
            width: 180px;
            height: 90px;
          }
          .top_news_right_right > div {
            width: 180px;
            height: 90px;
          }
        }
      }
    }
    .latest_news_container::after{
        font-size: 1em !important;
      }
    .latest_news_container::before {
      display: none;
    }
  }
  .swiper_news_title {
    font-size: 1em !important;
  }
}
</style>