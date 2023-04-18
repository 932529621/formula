<template>
  <v-app>
    <racenav></racenav>
    <top></top>
    <div class="home_empty"></div>
    <highlight ></highlight>
    <calendar></calendar>
    <!-- standing -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>

import top from "../../../components/front/homes/top.vue";
import racenav from "../../../components/front/homes/nav.vue";
import highlight from "../../../components/front/homes/highlight.vue";
import calendar from "../../../components/front/homes/calendar.vue";
import standing from "../../../components/front/homes/standing.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  data: () => ({
    isloading: true,
  }),
  async mounted() {
    window.scrollTo(0, 0);
    window.onload = () => {
      this.isloading = false;
    };
   
  },
  components: {
    top,
    racenav,
    highlight,
    calendar,
    standing,
    partner,
    bottom,
    Racefooter,
  },
};
</script>

<style lang="scss">
* {
  scroll-behavior: smooth;
}
.home_empty {
  margin-top: 50px;
}
.home_loding {
  background: transparent;
  overflow: hidden;
  position: fixed;
  top: 70px;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  width: 100%;
  z-index: 999;
}

@media screen and (max-width: 1300px) {
  .banner_h1 {
    font-size: 2.5em !important;
  }
  .banner_h2 {
    font-size: 0.8em !important;
  }
  .video_title,
  .hightlight_prix {
    font-size: 1.8em !important;
  }
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
    .latest_news_container::after {
      font-size: 1.5em !important;
      top: -5%;
      left: 0;
    }
  }
  .race_standing_header_title_content {
    font-size: 2em !important;
  }
}
@media screen and (max-width: 1050px) {
  .banner_h1 {
    font-size: 2em !important;
  }
  .banner_h2 {
    font-size: 0.6em !important;
  }
  .video_title,
  .hightlight_prix {
    font-size: 1.6em !important;
  }
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
    .latest_news_container::after {
      font-size: 1.2em !important;
      top: -1%;
      left: 10%;
    }
    .latest_news_container::before {
      display: none;
    }
  }
  .race_standing_header_title_content {
    font-size: 1.6em !important;
  }
  .race_standing_driver:nth-child(odd) {
    min-width: 270px !important;
    height: 250px !important;
  }
  .race_standing_driver_middle {
    min-width: 300px !important;
    height: 280px !important;
  }
  .race_standing_driver_bottom_lastname {
    font-size: 1.2em !important;
  }
  .race_standing_driver_bottom_firstname {
    font-size: 1.8em !important;
  }
}
@media screen and (max-width: 780px) {
  .banner_h1 {
    font-size: 1.5em !important;
  }
  .banner_h2 {
    font-size: 0.4em !important;
  }
  .video_title,
  .hightlight_prix {
    font-size: 1.2em !important;
  }
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
    .latest_news_container::after {
      font-size: 1em !important;
    }
    .latest_news_container::before {
      display: none;
    }
  }
  .race_standing_header_title_content {
    font-size: 1.3em !important;
  }
  .race_standing_driver:first-child {
    display: none !important;
  }
  .race_standing_driver:last-child {
    display: none !important;
  }
  .race_standing_driver_middle {
    min-width: 270px !important;
    height: 250px !important;
  }
  .race_standing_driver_bottom_lastname {
    font-size: 0.8em !important;
  }
  .race_standing_driver_bottom_firstname {
    font-size: 1.5em !important;
  }
  .race_standing_table_container {
    width: 90% !important;
  }
  .race_standing_table_right {
    width: 25% !important;
  }
  .bottom_banner_title {
    font-size: 1.2em !important;
  }
  .bottom_banner_content {
    font-size: 0.8em !important;
  }
  .bottom_banner {
    justify-content: space-around;
  }
}
</style>