<template>
  <v-app>
    <racenav></racenav>
    <choice></choice>
    <standingTable></standingTable>
    <partner class="video_partner"></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>
 
 <script>
import racenav from "../../../components/front/homes/nav.vue";
import choice from "../../../components/front/standing/choice.vue";
import standingTable from "../../../components/front/standing/standingTable.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
export default {
  components: { racenav, choice, standingTable, partner, bottom, Racefooter },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
/* .standingTable_totalrace_column span:nth-child(4){
  display: none !important;
} */
@media screen and (max-width: 1300px) {
}
@media screen and (max-width: 1050px) {
}
@media screen and (max-width: 780px) {
  .headspan {
    font-size: 1rem !important;
    text-align: center !important;
  }
  .tablespan {
    font-size: 0.5rem !important;
    text-align: center !important;
  }
  .titlespan {
    font-size: 1.5rem !important;
    white-space: pre-wrap !important;
    line-height: 3 !important;
  }
  .standingTable_title {
    height: 15% !important;
    transition: all 0.7s ease;
  }
  .choice .choice_container div li span{
    font-size: 1rem !important;
  }
  .choice .choice_container{
    grid-template-columns: 25% 27% 49%!important;
  }
  .standingTable_totalrace_head {
    grid-template-columns: 23% 23% 23% 23% !important;
  }
  .standingTable_totalrace_head span:nth-child(4) {
    display: none !important;
  }
  .standingTable_totalrace_head span:nth-child(5) {
    display: none !important;
  }
  .standingTable_totalrace_column {
    grid-template-columns: 23% 23% 23% 23% !important;
  }
  .standingTable_totalrace_column span:nth-child(4) {
    display: none !important;
  }
  .standingTable_totalrace_column span:nth-child(5) {
    display: none !important;
  }
  .standingTable_singlerace_head {
    grid-template-columns: 15% 20% 15% 25% 20% !important;
  }
  .standingTable_singlerace_head span:nth-child(4) {
    display: none !important;
  }
  .standingTable_singlerace_head span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlerace_column {
    grid-template-columns: 15% 20% 15% 25% 20% !important;
  }
  .standingTable_singlerace_column span:nth-child(4) {
    display: none !important;
  }
  .standingTable_singlerace_column span:nth-child(2) {
    display: none !important;
  }

  .standingTable_singlefastlap_head {
    grid-template-columns: 15% 20% 15% 15% 15% 20% !important;
  }
  .standingTable_singlefastlap_head span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlefastlap_head span:nth-child(4) {
    display: none !important;
  }

  .standingTable_singlefastlap_column {
    grid-template-columns: 15% 20% 15% 15% 15% 20% !important;
  }
  .standingTable_singlefastlap_column span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlefastlap_column span:nth-child(4) {
    display: none !important;
  }

  .standingTable_singlepratic1_head {
    grid-template-columns: 15% 25% 15% 15% 15% !important;
  }
  .standingTable_singlepratic1_head span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlepratic1_head span:nth-child(4) {
    display: none !important;
  }
  .standingTable_singlepratic1_column {
    grid-template-columns: 15% 25% 15% 15% 15% !important;
  }
  .standingTable_singlepratic1_column span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlepratic1_column span:nth-child(4) {
    display: none !important;
  }

  .standingTable_singlequalify_head {
    grid-template-columns: 15% 25% 15% 15% 15% 15% !important;
  }
  .standingTable_singlequalify_head span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlequalify_head span:nth-child(4) {
    display: none !important;
  }
  .standingTable_singlequalify_column {
    grid-template-columns: 15% 25% 15% 15% 15% 15% !important;
  }
  .standingTable_singlequalify_column span:nth-child(2) {
    display: none !important;
  }
  .standingTable_singlequalify_column span:nth-child(4) {
    display: none !important;
  }

  .standingTable_totaldriver_head {
    grid-template-columns: 10% 20% 15% 45% 10% !important;
  }
  .standingTable_totaldriver_head span:nth-child(1) {
    display: none !important;
  }

  .standingTable_totaldriver_column {
    grid-template-columns: 10% 20% 15% 45% 10% !important;
  }
  .standingTable_totaldriver_column span:nth-child(1) {
    display: none !important;
  }

  .standingTable_singledriver_head {
    grid-template-columns: 20% 20% 30% 20% 5% !important;
  }
  .standingTable_singledriver_column {
    grid-template-columns: 20% 20% 33% 20% 5% !important;
  }

  .standingTable_singleteam_head {
    grid-template-columns: 30% 30% 20% !important;
  }
  .standingTable_singleteam_column {
    grid-template-columns: 30% 30% 20% !important;
  }

  .standingTable_TotalFastLap_head {
    grid-template-columns: 20% 20% 40% 20% !important;
  }
  .standingTable_TotalFastLap_column {
    grid-template-columns:20% 20% 40% 20% !important;
  }
}
</style>