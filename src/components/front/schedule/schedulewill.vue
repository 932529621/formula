<template>
  <div class="scheduleheld">
    <div class="scheduleheld_outer">
      <div
        class="scheduleheld_container"
        v-for="(item, index) in heldlist"
        :key="index"
      >
        <div class="scheduleheld_container_top">
          <div class="scheduleheld_container_round"> {{ heldlist[index].round }}</div>
          <div class="scheduleheld_container_day">  {{
              heldlist[index].race_date.split("-")[0].substr(0, 2) +
              "-" +
              heldlist[index].race_date.split("-")[1].substr(0, 2)
            }}</div>
          <div class="scheduleheld_container_month">{{ heldlist[index].month }}</div>
          <img
            class="scheduleheld_container_nationIcon"
            :src="heldlist[index].nation_icon"
          />
        </div>
        <div class="scheduleheld_container_middle">
          <div class="scheduleheld_container_nationName">{{ heldlist[index].nation_name }}</div>
          <div class="scheduleheld_container_arrow"></div>
          <div class="scheduleheld_container_introduction">
            {{ heldlist[index].prix_fullname }}
          </div>
        </div>
        <div class="scheduleheld_container_bottom">
          <img
            class="schedular_container_map"
            :src="heldlist[index].nation_map_circuit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    heldlist: [],
   
  }),
  mounted(){
    this.ScheduleInfos.forEach(e => {
        if(e.prix_status === 'will'){
          this.heldlist.push(e);
        }
        
    });
  },
  
  computed: {
    ...mapState("schedule", ["ScheduleInfos"]),
  },
};
</script>

<style lang="scss" scoped>
.scheduleheld {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  .scheduleheld_outer {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 330px);
    grid-template-rows: repeat(auto-fill, 323px);
    column-gap: 5px;
    row-gap: 30px;
    margin-left: 4.5%;
    .scheduleheld_container {
      width: 100%;
      height: 100%;
      max-height: 330px;
      max-width: 323px;
      min-height: 330px;
      border-top: 5px solid rgb(0, 0, 0);
      border-right: 5px solid rgb(0, 0, 0);
      border-top-right-radius: 15px;
      display: flex;
      flex-direction: column;
      transition: all 0.7s ease;
      .scheduleheld_container_top {
        width: 100%;
        height: 30%;
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto auto;
        grid-template-areas:
          "rounds rounds rounds"
          "day day nationIcond "
          "month finishwrap finishwrap";
        align-items: center;
        .scheduleheld_container_round {
          grid-area: rounds;
          width: 100%;
          height: auto;
          color: #e10600;
          font-size: 1.5em;
          font-family: Heavy;
          white-space: nowrap;
        }
        .scheduleheld_container_day {
          grid-area: day;
          color: rgb(0, 0, 0);
          font-size: 1.5em;
          font-family: Heavy;
          white-space: nowrap;
        }
        .scheduleheld_container_month {
          grid-area: month;
          background-color: rgb(0, 0, 0);
          color: rgb(255, 255, 255);
          font-size: 1rem;
          font-family: Heavy;
          border-radius: 5px;
          padding: 0 10px;
          text-align: center;
        }
        .scheduleheld_container_nationIcon {
          grid-area: nationIcond;
          width: 50px;
          height: 35px;
          margin-right: 5px;
          border-radius: 5px;
          justify-self: center;
        }
      }
      .scheduleheld_container_middle {
        margin-top: 5px;
        width: 100%;
        height: 30%;
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        align-items: center;
        border-bottom: 1px solid rgb(148, 148, 152);
        border-top: 1px solid rgb(148, 148, 152);
        .scheduleheld_container_nationName {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          font-family: Heavy;
          width: auto;
        }
        .scheduleheld_container_arrow {
          margin-right: 10px;
          width: 10.5px;
          height: 10px;
          border-bottom-right-radius: 2.5px;
          border-right: 2px solid #e10600;
          border-bottom: 2px solid #e10600;
          transform: rotate(-45deg);
        }
        .scheduleheld_container_introduction {
          color: rgb(0, 0, 0);
          font-size: 1rem;
          font-family: Medium;
          grid-column-start: 1;
          grid-column-end: 3;
        }
      }
      .scheduleheld_container_bottom {
        width: 100%;
        height: 45%;
        display: flex;
        background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/schedular_map_background.png");
        background-repeat: repeat;
        background-size: 8px;
        justify-content: center;
        .schedular_container_map {
          min-width: 195px;
          min-height: 145px;
        }
      }
    }
  }
}
.scheduleheld_container:hover {
  border-top: 5px solid #e10600 !important;
  border-right: 5px solid #e10600 !important;
  cursor: pointer;
}
</style>