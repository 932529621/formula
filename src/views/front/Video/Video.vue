<template>
  <v-app>
    <racenav></racenav>
    <news v-if="hasinfo"></news>
    <highlight v-if="hasinfo"></highlight>
    <interview v-if="hasinfo"></interview>
    <onboard v-if="hasinfo"></onboard>
    <div class="videoempty"></div>
    <morevideos v-if="hasinfo"></morevideos>
    <partner class="video_partner"></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import highlight from "../../../components/front/homes/highlight.vue";
import racenav from "../../../components/front/homes/nav.vue";
import news from "../../../components/front/homes/news.vue";
import interview from "../../../components/front/video/interview.vue";
import onboard from "../../../components/front/video/onboard.vue"; 
import morevideos from "../../../components/front/video/morevideos.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  components: {
    racenav,
    news,
    interview,
    onboard,
    highlight,
    morevideos,
    partner,
    bottom,
    Racefooter,
  },
  data: () => ({
    hasinfo: false,
  }),
  async created() {
    window.scrollTo(0, 0);
    window.onload = () => {
      this.isloading = false;
    };
    await this.$store.dispatch("videos/getvideoDetail");

    if (this.videoInfo ) {
      this.hasinfo = true;
    }
  },
  computed: {
    ...mapState("videos", ["videoInfo"]),
  },
};
</script>

<style lang="scss">
.video_partner {
  margin-top: 50px;
}
.videoempty {
  background-color: rgb(247, 244, 241);
  height: 50px;
  margin-bottom: 3%;
}

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
    .latest_news_container::before {
      display: none;
    }
  }
}
@media screen and (max-width: 780px) {
  .main {
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
    .latest_news_container::before {
      display: none;
    }
  }
  .morenews_title {
    height: 5% !important;
  }
}
</style>