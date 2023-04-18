<template>
  <div class="detailcontent">
    <div class="detailcontent_container" ref="detailcontent"></div>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("team", ["teamDetailInfo"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.detailcontent.innerHTML =
        this.teamDetailInfo.team_biography;
    });
    
  },
};
</script>
  
  <style lang="scss" scoped>
</style>