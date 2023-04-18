<template>
  <v-app>
    <div class="lastestlistTop">
      <div class="lastestlistTop_title"> 2022 BAHRAIN</div>

      <div class="lastestlistTop_date">18-20 MAR</div>
    </div>
    <div class="schedulebar">
      <div class="schedulebar_container">
        <span
          :class="{ 'schedulebarActive' : schedulebarActive === 'Schedule'  }"          
          @click="changeSchedule()"
        >
        Schedule
        </span>
        <span
          :class="{  'schedulebarActive' : schedulebarActive === 'Circuit'   }"          
          @click="changeCircuit()"
        >
        Circuit
        </span>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0);
  },
  data: () => ({
    schedulebarList: ["Schedule", "Circuit"],
    schedulebarActive: 'Schedule',
  }),
  methods: {
    changeSchedule() {
      this.schedulebarActive = 'Schedule';
      this.$router.push('/schedule/scheduledetail')
    },
    changeCircuit() {
      this.schedulebarActive = 'Circuit';
      this.$router.push('/schedule/scheduledetail/circuit')
    },
 
  },
  computed:{
    schedulePath(){
      return 
    }
  }
};
</script>

<style lang="scss" scoped>
.lastestlistTop {
  width: 100%;
  height: 70vh;
  background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_banner_pic/Bahrain.jpg");
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .lastestlistTop_title {
    color: rgb(255, 255, 255);
    font-size: 5rem;
    position: sticky;
    top: 30%;
    transform: translateY(-50%);
    font-family: Heavy;
  }
  .lastestlistTop_date {
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    font-family: medium;
    background-color: #15151e;
    padding: 5px;
    border-radius: 10px;
  }
}
.schedulebar {
  width: 100%;
  height: 50px;
  background-color: #15151e;
  display: flex;
  justify-content: center;
  align-items: center;
  .schedulebar_container {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    line-height: 2.5;
    span {
      color: rgb(255, 255, 255);
      font-size: 1.2rem;
      font-family: Medium;
      text-align: center;
    }
    .schedulebarActive {
      border-bottom: 2px solid red;
    }
  }
}
</style>