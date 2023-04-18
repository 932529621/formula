<template>
  <v-app>
    <racenav></racenav>
    <top></top>
    <ticketCalendar></ticketCalendar>
    <partner class="video_partner"></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>
import racenav from "../../../components/front/homes/nav.vue";
import top from "../../../components/front/ticket/top.vue";
import ticketCalendar from "../../../components/front/ticket/ticketCalendar.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  data: () => ({
    cheapestList: [],
  }),
  components: { racenav, top, ticketCalendar, partner, bottom, Racefooter },
  async mounted() {
    window.scrollTo(0, 0);
    
   
    // this.$axios
    //   .get("http://127.0.0.1:8080/api/ticket/getcheapestinfo")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       for (let key in res.data) {
    //         this.cheapestList.push(res.data[key]);
    //       }
    //       this.$store.dispatch("ticket/getcheapestinfo", this.cheapestList);
    //       this.isgetTicketInfo=true;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style>
</style>