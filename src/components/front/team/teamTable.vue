<template>
  <div class="teamTable">
    <div class="teamTable_outer">
      <div
        class="teamTable_container"
        v-for="(item, index) in teamlist"
        :key="index"
        @click="
          $router.push({
            name: 'Teamdetail',
            path: `/team/teamdetail`,
            query: {
              teamId: teamlist[index].id,
              teamName: teamlist[index].full_teamname,
              driverOne: teamlist[index].driver_one,
              driverTwo: teamlist[index].driver_two,
            },
          })
        "
      >
        <div class="teamTable_container_top">
          <div class="teamTable_container_round">{{ index + 1 }}</div>
          <div class="teamTable_container_day">
            {{ teamlist[index].points }}
          </div>
          <div class="teamTable_container_month">PTS</div>
          <div class="teamTable_container_team">
            {{ teamlist[index].full_teamname }}
          </div>
        </div>
        <div class="teamTable_container_middle">
          <div
            class="bordercolor"
            :style="{ backgroundColor: teamlist[index].team_color }"
          ></div>
          <img
            class="schedular_container_driver1pic"
            :src="teamlist[index].driver_one_halfpic"
          />
          <div class="teamTable_container_driver1_firstname">
            {{ driverOnefirstName[index] }}
          </div>
          <div class="teamTable_container_driver1_lastname">
            {{ driverOnelastName[index] }}
          </div>

          <div
            class="bordercolor2"
            :style="{ backgroundColor: teamlist[index].team_color }"
          ></div>
          <img
            class="schedular_container_driver2pic"
            :src="teamlist[index].driver_two_halfpic"
          />
          <div class="teamTable_container_driver2_firstname">
            {{ driverTwofirstName[index] }}
          </div>
          <div class="teamTable_container_driver2_lastname">
            {{ driverTwolastName[index] }}
          </div>
        </div>
        <div class="teamTable_container_bottom">
          <img class="schedular_container_car" :src="teamlist[index].car_pic" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getDriverDetail, getTeamdetail } from "@/plugins/http";
export default {
  data: () => ({
    teamlist: [],
    driverOnefirstName: [],
    driverTwofirstName: [],
    driverOnelastName: [],
    driverTwolastName: [],
  }),
  methods: {
   
  },
  async mounted() {
    const reslt = await getTeamdetail();
    const res = await getDriverDetail();

    if (reslt.data.Operation === "success") {
      console.log(reslt);
      
      for (let key in reslt.data.teaminfo) {
        this.teamlist.push(reslt.data.teaminfo[key]);
      }
      if (this.teamlist.length) {
        this.teamlist.forEach((item, index) => {
          if (item.driver_one && item.driver_two) {
            const driverOne = item.driver_one.split(" ");
            const driverTwo = item.driver_two.split(" ");
            this.driverOnelastName[index] = driverOne[0];
            this.driverTwolastName[index] = driverTwo[0];
            this.driverOnefirstName[index] = driverOne[1];
            this.driverTwofirstName[index] = driverTwo[1];
          }
        });
        res.data.DriverDetail.forEach((i) => {
          this.teamlist.forEach((items, index) => {
            if (i.name === items.driver_two) {
              items.driver_two_halfpic = i.driver_half_pic;
            }
            if (i.name === items.driver_one) {
              items.driver_one_halfpic = i.driver_half_pic;
            }
          });
        });
      }
    }
  },
};
</script>
  
  <style lang="scss" scoped>
.teamTable {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .teamTable_outer {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 670px);
    grid-template-rows: repeat(auto-fill, 405px);
    margin-bottom: 50px;
    column-gap: 10px;
    row-gap: 20px;

    .teamTable_container {
      width: 100%;
      height: 100%;
      // max-height: 330px;
      // max-width: 323px;
      // min-height: 330px;
      // min-width: 670px;
      border-top: 5px solid rgb(0, 0, 0);
      border-right: 5px solid rgb(0, 0, 0);
      border-top-right-radius: 15px;
      display: flex;
      flex-direction: column;
      transition: all 0.7s ease;
      min-height: 405px;
      .teamTable_container_top {
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
        .teamTable_container_round {
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
        .teamTable_container_team {
          grid-area: team;
          width: 100%;
          height: auto;
          color: rgb(0, 0, 0);
          font-size: 1.2rem;
          font-family: thin;
          white-space: nowrap;
        }
        .teamTable_container_day {
          grid-area: day;
          color: rgb(0, 0, 0);
          font-size: 2rem;
          font-family: Heavy;
          white-space: nowrap;
          justify-self: center;
        }
        .teamTable_container_month {
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
      .teamTable_container_middle {
        margin-top: 5px;
        width: 100%;
        height: 25%;
        display: grid;
        grid-template-columns: 20px auto auto 20px auto auto;
        grid-template-rows: auto auto;
        grid-template-areas:
          "border1 lastname1  driver1pic border2 lastname2 driver2pic  "
          "border1 firstname1 driver1pic border2 firstname2 driver2pic ";
        align-items: center;
        border-bottom: 1px solid rgb(148, 148, 152);
        border-top: 1px solid rgb(148, 148, 152);
        .teamTable_container_driver1_firstname {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          font-family: Heavy;
          width: auto;
          grid-area: firstname1;
          transition: all 0.7s ease;
          align-self: flex-start;
        }
        .teamTable_container_driver1_lastname {
          grid-area: lastname1;
          color: rgb(0, 0, 0);
          font-size: 1rem;
          font-family: Medium;
          transition: all 0.7s ease;
          align-self: flex-end;
        }

        .teamTable_container_driver2_firstname {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          font-family: Heavy;
          width: auto;
          grid-area: firstname2;
          transition: all 0.7s ease;
          align-self: flex-start;
        }
        .teamTable_container_driver2_lastname {
          grid-area: lastname2;
          color: rgb(0, 0, 0);
          font-size: 1rem;
          font-family: Medium;
          transition: all 0.7s ease;
          align-self: flex-end;
        }
        .bordercolor {
          width: 5px;
          height: 35px;
          background-color: #3671c6;
          border-radius: 10px;
          grid-area: border1;
        }
        .bordercolor2 {
          width: 5px;
          height: 35px;
          background-color: #3671c6;
          border-radius: 10px;

          grid-area: border2;
        }
        .schedular_container_driver1pic {
          grid-area: driver1pic;
          width: 60px;
          height: 60px;
        }
        .schedular_container_driver2pic {
          grid-area: driver2pic;
          width: 60px;
          height: 60px;
        }
      }
      .teamTable_container_bottom {
        width: 100%;
        height: 50%;
        display: flex;
        background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/schedular_map_background.png");
        background-repeat: repeat;
        background-size: 8px;
        justify-content: center;
        align-items: flex-end;
        .schedular_container_car {
          width: 500px;
          height: 150px;
        }
      }
    }
  }
}
.teamTable_container:hover {
  border-top: 5px solid #e10600 !important;
  border-right: 5px solid #e10600 !important;
  box-shadow: 5px -5px 8px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  .teamTable_container_round {
    color: #e10600 !important;
  }
}
</style>