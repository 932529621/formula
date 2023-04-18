<template>
  <div>

      <scheduledetailtop></scheduledetailtop>
      <scheduledetailbottom></scheduledetailbottom>

  </div>
</template>

<script>
import scheduledetailbottom from "../../../components/front/schedule/scheduleheldbottom.vue";
import scheduledetailtop from "../../../components/front/schedule/scheduleheldtop.vue";
export default {
  components: { scheduledetailtop, scheduledetailbottom },
};
</script>

<style>
</style>