<template>
  <v-app>
    <racenav></racenav>
    <scheduledetailback></scheduledetailback>
    <!-- <scheduledetailtop></scheduledetailtop>
    <scheduledetailbottom></scheduledetailbottom> -->
    <router-view></router-view>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>
  
  <script>
import racenav from "../../../components/front/homes/nav.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
import scheduledetailback from "../../../components/front/schedule/scheduleheldback.vue";
// import scheduledetailtop from "../../../components/front/schedule/scheduleheldtop.vue";
// import scheduledetailbottom from "../../../components/front/schedule/scheduleheldbottom.vue";

export default {
  components: { racenav, partner, bottom, Racefooter, scheduledetailback },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
  
  <style>
</style>