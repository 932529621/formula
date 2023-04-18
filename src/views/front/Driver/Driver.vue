<template>
  <v-app>
    <racenav></racenav>
    <driverTitle></driverTitle>
    <driverTable></driverTable>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>
import racenav from "../../../components/front/homes/nav.vue";
import driverTitle from "../../../components/front/driver/driverTitle.vue";
import driverTable from "../../../components/front/driver/driverTable.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  components: {
    racenav,
    partner,
    bottom,
    Racefooter,
    driverTitle,
    driverTable,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" > 
  @media screen and (max-width: 1300px) {
  .schedule_main_title{
    font-size: 3rem !important;
  }
  .shedule_sub_title{
    font-size: .8rem !important;
  }
}
@media screen and (max-width: 1050px) {
  .schedule_main_title{
    font-size: 3rem !important;
  }
  .shedule_sub_title{
    font-size: .8rem !important;
  }
}
@media screen and (max-width: 780px) {
  .schedule_main_title{
    font-size: 2rem !important;
  }
  .shedule_sub_title{
    font-size: .8rem !important;
  }
  .shedule_title_left{
    width: 100% !important;
  }
}
</style>