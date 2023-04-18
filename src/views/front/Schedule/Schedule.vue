<template>
  <v-app>
    <racenav></racenav>
    <scheduleTitle></scheduleTitle>
    <scheduleheld v-if="hasinfo"></scheduleheld>
    <scheduleholding v-if="hasinfo"></scheduleholding>
    <schedulewill v-if="hasinfo"></schedulewill>
    <partner></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import racenav from "../../../components/front/homes/nav.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
import scheduleTitle from "../../../components/front/schedule/scheduleTitle.vue";
import scheduleheld from "../../../components/front/schedule/scheduleheld.vue";
import scheduleholding from "../../../components/front/schedule/scheduleholding.vue";
import schedulewill from "../../../components/front/schedule/schedulewill.vue";
export default {
  components: {
    racenav,
    scheduleTitle,
    scheduleheld,
    scheduleholding,
    schedulewill,
    partner,
    bottom,
    Racefooter,
  },
  computed: {
    ...mapState("schedule", ["ScheduleInfos"]),
  },
  data: () => ({
    schedules: [],
    hasinfo:false,
  }),
 async created() {
    window.scrollTo(0, 0);
   await this.$axios
      .get(`http://127.0.0.1:8080/api/home/getcalendar`)
      .then((res) => {
        if (res.status === 200) {
          res.data.schedules.forEach((e) => {
            this.schedules.push({
              ...e,
              first_driver_info: {},
              second_driver_info: {},
              third_driver_info: {},
            });
          });
          console.log(this.schedules);
        }
      })
      .catch((err) => {
        console.log(err);
      });
   await this.$axios
      .get(`http://127.0.0.1:8080/api/driverbrief/getdriverbrief`)
      .then((res) => {
        if (res.status === 200) {
          this.schedules.forEach((e) => {
            for (const i in res.data) {
              if (e.first_driver_no === res.data[i].driver_number) {
                e.first_driver_info = { ...res.data[i] };
              }
              if (e.second_driver_no === res.data[i].driver_number) {
                e.second_driver_info = { ...res.data[i] };
              }
              if (e.third_driver_no === res.data[i].driver_number) {
                e.third_driver_info = { ...res.data[i] };
              }
            }
          });
          this.$store.dispatch("schedule/getScheduleInfo", this.schedules);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      if(this.ScheduleInfos){
        this.hasinfo=true;
      }
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1300px) {
  .schedule_main_title {
    font-size: 3rem !important;
  }
  .shedule_sub_title {
    font-size: 0.8rem;
  }
}
@media screen and (max-width: 1050px) {
  .schedule_main_title {
    font-size: 2.5rem !important;
  }
  .shedule_sub_title {
    font-size: 0.7rem !important;
  }
}
@media screen and (max-width: 780px) {
  .schedule_main_title {
    font-size: 3rem !important;
  }
  .shedule_sub_title {
    font-size: 0.8rem !important;
  }
  .schedule_title_container {
    flex-direction: column !important;
  }
  .schedulewill_container_calendar_position {
    display: none !important;
  }
}
</style>