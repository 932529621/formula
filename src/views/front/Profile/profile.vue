<template>
    <v-app>
      <racenav></racenav>
      <profile></profile>
      <partner class="video_partner"></partner>
      <bottom></bottom>
      <Racefooter></Racefooter>
    </v-app>
  </template>
  
  <script>
  import racenav from "../../../components/front/homes/nav.vue";
  import profile from "../../../components/front/profile/profile.vue"
  import partner from "../../../components/front/homes/partner.vue";
  import bottom from "../../../components/front/homes/bottom.vue";
  import Racefooter from "../../../components/front/homes/Racefooter.vue";
  export default {
    components: { racenav, partner, bottom, Racefooter,profile },
    mounted() {
      window.scrollTo(0, 0);
    },
  };
  </script>
  
  <style>
  </style>