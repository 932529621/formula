<template>
  <div class="scheduleheld">
    <div class="scheduleheld_outer">
      <div
        class="scheduleheld_container"
        v-for="(item, index) in heldlist"
        :key="index"
        @click="$router.push({
          name:'Driverdetail',
          path:`/driver/driverdetail`,
          query:{
            driverId:heldlist[index].id,
            driverlastName:heldlist[index].last_name,
            team:heldlist[index].team,
          }
        });"
      >
        <div class="scheduleheld_container_top">
          <div class="scheduleheld_container_round">{{index+1}}</div>
          <div class="scheduleheld_container_day">{{heldlist[index].points}}</div>
          <div class="scheduleheld_container_month">PTS</div>
          <div class="scheduleheld_container_team">{{heldlist[index].team}}</div>
        </div>
        <div class="scheduleheld_container_middle">
          <div class="bordercolor" :style="{backgroundColor:heldlist[index].team_color}"></div>
          <div class="scheduleheld_container_nationName">{{heldlist[index].last_name}}</div>
          <div class="scheduleheld_container_introduction">{{heldlist[index].first_name}}</div>
          <img
            class="scheduleheld_container_nationIcon"
            :src="heldlist[index].nation_icon"
          />
        </div>
        <div class="scheduleheld_container_bottom">
          <img
            class="schedular_container_numbericon"
            :src="heldlist[index].driver_number_icon"/>
          <img
            class="schedular_container_map"
            :src="heldlist[index].driver_half_pic"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data: () => ({
    heldlist: [],
  }),
  mounted() {
    this.$axios
      .get("http://127.0.0.1:8080/api/driverbrief/getdriverbrief")
      .then((res) => {
        if (res.status === 200) {
          for (let key in res.data) {
            this.heldlist.push(res.data[key]);
          } 
          // console.log(this.heldlist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
   
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
    row-gap: 50px;
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
          "rounds . ."
          "rounds . day "
          "team . month";
        align-items: center;
        .scheduleheld_container_round {
          grid-area: rounds;
          width: 100%;
          height: auto;
          color: rgb(0, 0, 0);
          font-size: 3rem;
          font-family: Heavy;
          white-space: nowrap;
          justify-self: center;
          transition: all 0.7s ease;
        }
        .scheduleheld_container_team {
          grid-area: team;
          width: 100%;
          height: auto;
          color: rgb(0, 0, 0);
          font-size: 1.2rem;
          font-family: thin;
          white-space: nowrap;
        }
        .scheduleheld_container_day {
          grid-area: day;
          color: rgb(0, 0, 0);
          font-size: 2rem;
          font-family: Heavy;
          white-space: nowrap;
          justify-self: center;
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
      }
      .scheduleheld_container_middle {
        margin-top: 5px;
        width: 100%;
        height: 25%;
        display: grid;
        grid-template-columns: 20px auto auto;
        grid-template-rows: auto auto;
        grid-template-areas:
          "bordercolor introduction nationIcond"
          "bordercolor nationname nationIcond";
        align-items: center;
        border-bottom: 1px solid rgb(148, 148, 152);
        border-top: 1px solid rgb(148, 148, 152);
        .scheduleheld_container_nationName {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          font-family: Heavy;
          width: auto;
          grid-area: nationname;
          align-self: flex-start;
          transition: all 0.7s ease;
        }
        .bordercolor {
          width: 5px;
          height: 35px;
          align-self: center;
          justify-self: center;
          border-radius: 10px;
          grid-row-start: 1;
          grid-row-end: 3;
        }
        .scheduleheld_container_nationIcon {
          grid-area: nationIcond;
          width: 50px;
          height: 35px;
          margin-right: 5px;
          border-radius: 5px;
          justify-self: center;
        }

        .scheduleheld_container_introduction {
          grid-area: introduction;
          color: rgb(0, 0, 0);
          font-size: 1rem;
          font-family: Medium;
          align-self: flex-end;
          transition: all 0.7s ease;
        }
      }
      .scheduleheld_container_bottom {
        width: 100%;
        height: 50%;
        display: flex;
        background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/schedular_map_background.png");
        background-repeat: repeat;
        background-size: 8px;
        justify-content: space-between;
        align-items: flex-end;
        .schedular_container_map {
          width: 180px;
          height: 180px;
        }
        .schedular_container_numbericon {
          width: 60px;
          height: 50px;
          background-color: rgb(255, 255, 255);
        }
      }
    }
  }
}
.scheduleheld_container:hover {
  border-top: 5px solid #e10600 !important;
  border-right: 5px solid #e10600 !important;
  box-shadow: 5px -5px 8px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  .scheduleheld_container_round {
    color: #e10600 !important;
  }
}
</style>