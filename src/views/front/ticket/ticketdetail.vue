<template>
  <v-app>
    <racenav></racenav>
    <ticketdetailtop v-if="isgetTickInfo"></ticketdetailtop>
    <Ticketdetailmain v-if="isgetTickInfo"></Ticketdetailmain>
    <partner class="video_partner"></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>
  
  <script>
import { getcalendar } from "@/plugins/http";
import racenav from "../../../components/front/homes/nav.vue";
import ticketdetailtop from "../../../components/front/ticket/tiketdetailTop.vue";
import Ticketdetailmain from "../../../components/front/ticket/ticketdetailMain.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  data: () => ({
    isgetTickInfo: false,
  }),
  methods: {
    async getticketinfo() {
      const res = await getcalendar();
      console.log(res);
      this.$store.dispatch("ticket/getticketDetail", [...res.data.schedules]);
      this.isgetTickInfo=true;;

      // this.$axios
      //   .get("http://127.0.0.1:8080/api/ticket/getticketinfo")
      //   .then((res) => {
      //     if (res.status === 200) {
      //       const ticketInfo = [];
      //       for (let key in res.data) {
      //         ticketInfo.push(res.data[key]);
      //       }
      //       this.$store.dispatch("ticket/getticketDetail", ticketInfo);
      //       this.isgetTickInfo++;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    getsingleticketinfo() {
      this.$axios
        .get(
          `http://127.0.0.1:8080/api/ticket/getsingleticketinfo?prixName=${this.$route.query.prixName}`
        )
        .then((res) => {
          if (res.status === 200) {
            const singleticketinfo = [];
            for (let key in res.data) {
              singleticketinfo.push(res.data[key]);
            }
            this.$store.dispatch(
              "ticket/getsingleticketinfo",
              singleticketinfo
            );
            this.isgetTickInfo++;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    racenav,
    ticketdetailtop,
    Ticketdetailmain,
    partner,
    bottom,
    Racefooter,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getticketinfo();
    this.getsingleticketinfo();
  },
};
</script>
  
  <style>
</style>