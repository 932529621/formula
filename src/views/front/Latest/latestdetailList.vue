<template>
  <v-app>
    <racenav></racenav>
    <latestlistTop></latestlistTop>
    <latestlistbottom></latestlistbottom>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>
import racenav from "../../../components/front/homes/nav.vue";
import latestlistTop from "../../../components/front/Latest/latestlistTop.vue";
import latestlistbottom from "../../../components/front/Latest/latestlistbottom.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  components: {
    racenav,
    latestlistTop,
    latestlistbottom,
    partner,
    bottom,
    Racefooter,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>