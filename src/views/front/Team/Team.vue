<template>
  <v-app>
    <racenav></racenav>
    <teamTitle></teamTitle>
    <teamTable></teamTable>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>
  
  <script>
import racenav from "../../../components/front/homes/nav.vue";
import teamTitle from "../../../components/front/team/teamTitle.vue";
import teamTable from "../../../components/front/team/teamTable.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  components: { racenav, partner, bottom, Racefooter, teamTitle, teamTable },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
  
  <style lang="scss">
@media screen and (max-width: 1300px) {
  .schedule_main_title {
    font-size: 3rem !important;
  }
  .shedule_sub_title {
    font-size: 0.8rem !important;
  }
}
@media screen and (max-width: 1050px) {
  .schedule_main_title {
    font-size: 2.8rem !important;
  }
  .shedule_sub_title {
    font-size: 0.7rem !important;
  }
}
@media screen and (max-width: 780px) {
  .schedule_main_title {
    font-size: 2.5rem !important;
  }
  .shedule_sub_title {
    font-size: 0.8rem !important;
  }
  .shedule_title_left {
    width: 100% !important;
  }
  .teamTable_container {
    max-width: 435px !important;
  }
  .schedular_container_car {
    width: 450px !important;
    height: 125px !important;
  }
  .teamTable_container_driver1_firstname,.teamTable_container_driver2_firstname{
    font-size: 1.2rem !important;
  }
}
</style>