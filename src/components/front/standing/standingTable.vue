<template>
  <!-- v-if="this.TotalFastLap[this.TotalFastLap.length-1]==='total_fastlap'"    -->
  <div class="standingTable">
   
    <div
    v-if="this.Totalrace[this.Totalrace.length - 1] === 'total_race'"
      class="standingTable_container" :key="Math.floor((Math.random()*1000)+1)"
    >
      <div class="standingTable_title">
           <div class="titlespan"> <i>{{ Totalrace[0].season }}</i>  <i>RACE</i> <i>RESULTS</i> </div>
      </div>
      <div class="standingTable_total_content">
        <div class="standingTable_totalrace_head">
          <span
            class="headspan"
            v-for="(item, index) in tabletotalracehead"
            :key="index"
            >{{ tabletotalracehead[index] }}</span
          >
        </div>
        <div
          class="standingTable_totalrace_column"
          v-for="(item, index) in this.Totalrace"
          :key="index"
        >
          <span class="tablespan">{{ Totalrace[index].grand_prix }}</span>
          <span class="tablespan">{{ Totalrace[index].race_date }}</span>
          <span class="tablespan">{{ Totalrace[index].winner }}</span>
          <span class="tablespan">{{ Totalrace[index].team }}</span>
          <span class="tablespan">{{ Totalrace[index].laps }}</span>
          <span class="tablespan">{{ Totalrace[index].time_record }}</span>
        </div>
      </div>
   
    </div>
  
    <div
    v-if="this.TotalDriver[this.TotalDriver.length - 1] === 'total_driver'"
      class="standingTable_container"       
      :key="Math.floor((Math.random()*1000)+1)"

    >
      <div class="standingTable_title">
        <span class="titlespan">
         <i>{{ TotalDriver[0].season }} </i> <i>DRIVER</i> <i>STANDINGS</i> </span
        >
      </div>
      <div class="standingTable_total_content">
        <div class="standingTable_totaldriver_head">
          <span
            class="headspan"
            v-for="(item, index) in tabletotaldriverhead"
            :key="index"
            >{{ tabletotaldriverhead[index] }}</span
          >
        </div>
        <div
          class="standingTable_totaldriver_column"
          v-for="(item, index) in this.TotalDriver"
          :key="index"
        >
          <span class="tablespan">{{ TotalDriver[index].season }}</span>
          <span class="tablespan">{{ TotalDriver[index].position }}</span>
          <span class="tablespan">{{ TotalDriver[index].driver }}</span>
          <span class="tablespan">{{ TotalDriver[index].nation }}</span>
          <span class="tablespan">{{ TotalDriver[index].team }}</span>
          <span class="tablespan">{{ TotalDriver[index].total_points }}</span>
        </div>
      </div>
    </div>

    <div
    v-if="this.TotalTeam[this.TotalTeam.length - 1] === 'total_team'"
      class="standingTable_container" :key="Math.floor((Math.random()*1000)+1)"
    >
      <div class="standingTable_title">
        <span class="titlespan"> 
          <i>{{ TotalTeam[0].season }}</i> <i>TEAM</i> <i>STANDING</i>  </span>
      </div>
      <div class="standingTable_total_content">
        <div class="standingTable_TotalTeam_head">
          <span
            class="headspan"
            v-for="(item, index) in tabletotalteamhead"
            :key="index"
            >{{ tabletotalteamhead[index] }}</span
          >
        </div>
        <div
          class="standingTable_TotalTeam_column"
          v-for="(item, index) in this.TotalTeam"
          :key="index"
        >
          <span class="tablespan">{{ TotalTeam[index].total_position }}</span>
          <span class="tablespan">{{ TotalTeam[index].team }}</span>
          <span class="tablespan">{{ TotalTeam[index].total_points }}</span>
        </div>
      </div>
    </div>

    <div
    v-if="this.TotalFastLap[this.TotalFastLap.length - 1] === 'total_fastlap'"
      class="standingTable_container" :key="Math.floor((Math.random()*1000)+1)"
    >
      <div class="standingTable_title">
        <span class="titlespan">
          <i>{{ TotalFastLap[0].season }}</i> <i>FASTLAP</i> <i>RECORD</i>    </span
        >
      </div>
      <div class="standingTable_total_content">
        <div class="standingTable_TotalFastLap_head">
          <span
            class="headspan"
            v-for="(item, index) in tabletotalfastlaphead"
            :key="index"
            >{{ tabletotalfastlaphead[index] }}</span
          >
        </div>
        <div
          class="standingTable_TotalFastLap_column"
          v-for="(item, index) in this.TotalFastLap"
          :key="index"
        >
          <span class="tablespan">{{ TotalFastLap[index].grand_prix }}</span>
          <span class="tablespan">{{ TotalFastLap[index].driver }}</span>
          <span class="tablespan">{{ TotalFastLap[index].team }}</span>
          <span class="tablespan">{{ TotalFastLap[index].time_record }}</span>
        </div>
      </div>
    </div>
    <!-- ↓ -->
    <div
    v-if="
        this.SingleRace[this.SingleRace.length - 1] === 'single_race' ||
        this.SingleFastLap[this.SingleFastLap.length - 1] ===
          'single_fastlap' ||
        this.SinglePratice1[this.SinglePratice1.length - 1] ===
          'single_pratic1' ||
        this.SinglePratice2[this.SinglePratice2.length - 1] ===
          'single_pratic2' ||
        this.SinglePratice3[this.SinglePratice3.length - 1] ===
          'single_pratic3' ||
        this.SingleQualify[this.SingleQualify.length - 1] ===
          'single_qualifying'
      "
      class="standingTable_container"
      :key="Math.floor((Math.random()*1000)+1)"
    >
      <div class="standingTable_title">
        <span class="titlespan"> <i>{{ SingleRace[0].title }}</i>   </span>
      </div>
      <div class="standingTable_sub_title">
        <div class="standingTable_sub_arrow" @click="changeAddrequireIndex()">
          <svg
            t="1663332489157"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4044"
            width="60"
            height="60"
          >
            <path
              d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z"
              p-id="4045"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <span class="sub_titlespan"> {{ this.requireList[0] }} </span>
        <div
          class="standingTable_sub_arrow"
          @click="changeReducerequireIndex()"
        >
          <svg
            t="1663332678825"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9721"
            width="60"
            height="60"
          >
            <path
              d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
              p-id="9722"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </div>
      <div
        v-if="
          this.SingleRace[this.SingleRace.length - 1] === 'single_race' &&
          this.requireList[0] === 'RACE'
        "
        class="standingTable_total_content"
        :key="Math.floor((Math.random()*1000)+1)"
      >
        <div class="standingTable_singlerace_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesingleracehead"
            :key="index"
            >{{ tablesingleracehead[index] }}</span
          >
        </div>
        <div
          class="standingTable_singlerace_column"
          v-for="(item, index) in this.SingleRace"
          :key="index"
        >
          <!-- {{$store.commit(
              "standingDetail/getsingleTableIndex",
              index
            )}} 取index值触发死循环 2022-9-16-->
          <span class="tablespan">{{ SingleRace[index].position }}</span>
          <span class="tablespan">{{ SingleRace[index].driver_number }}</span>
          <span class="tablespan">{{ SingleRace[index].driver_name }}</span>
          <span class="tablespan">{{ SingleRace[index].team }}</span>
          <span class="tablespan">{{ SingleRace[index].laps }}</span>
          <span class="tablespan">{{ SingleRace[index].Time_Retired }}</span>
          <span class="tablespan">{{ SingleRace[index].points }}</span>
        </div>
      </div>
      <!-- 改于2023.4-10 合并表pratice -->
      <div
        v-if="
          this.SingleFastLap[this.SingleFastLap.length - 1] === 'single_fastlap'
        "
        class="standingTable_total_content"
      >
        <div class="standingTable_singlefastlap_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesinglefastlaphead"
            :key="index"
            >{{ tablesinglefastlaphead[index] }}</span
          >
        </div>
        <div
          class="standingTable_singlefastlap_column"
          v-for="(item, index) in this.SingleFastLap"
          :key="index"
        >
          <!-- {{$store.commit(
              "standingDetail/getsingleTableIndex",
              index
            )}} 取index值触发死循环 2022-9-16-->
          <span class="tablespan">{{ SingleFastLap[index].position }}</span>
          <span class="tablespan">{{
            SingleFastLap[index].driver_number
          }}</span>
          <span class="tablespan">{{ SingleFastLap[index].driver_name }}</span>
          <span class="tablespan">{{ SingleFastLap[index].team }}</span>
          <span class="tablespan">{{ SingleFastLap[index].laps }}</span>
          <span class="tablespan">{{ SingleFastLap[index].time_of_day }}</span>
          <span class="tablespan">{{ SingleFastLap[index].date }}</span>
          <span class="tablespan">{{ SingleFastLap[index].avg_speed }}</span>
        </div>
      </div>

      <div
        v-if="
          this.singleRaceList[this.singleRaceList.length - 1] ===
          'single_pratic1'
        "
        class="standingTable_total_content"
      >
        <div class="standingTable_singlepratic1_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesinglepratice1head"
            :key="index"
            >{{ tablesinglepratice1head[index] }}</span
          >
        </div>
        <div
          class="standingTable_singlepratic1_column"
          v-for="(item, index) in this.SinglePratice1"
          :key="index"
        >
          <!-- {{$store.commit(
              "standingDetail/getsingleTableIndex",
              index
            )}} 取index值触发死循环 2022-9-16-->
          <span class="tablespan">{{ SinglePratice1[index].position }}</span>
          <span class="tablespan">{{
            SinglePratice1[index].driver_number
          }}</span>
          <span class="tablespan">{{ SinglePratice1[index].driver_name }}</span>
          <span class="tablespan">{{ SinglePratice1[index].team }}</span>
          <span class="tablespan">{{ SinglePratice1[index].record }}</span>
          <span class="tablespan">{{ SinglePratice1[index].GAP }}</span>
          <span class="tablespan">{{ SinglePratice1[index].laps }}</span>
        </div>
      </div>

      <div
        v-if="
          this.singleRaceList[this.singleRaceList.length - 1] ===
          'single_pratic2'
        "
        class="standingTable_total_content"
      >
        <div class="standingTable_singlepratic1_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesinglepratice1head"
            :key="index"
            >{{ tablesinglepratice1head[index] }}</span
          >
        </div>
        <div
          class="standingTable_singlepratic1_column"
          v-for="(item, index) in this.SinglePratice2"
          :key="index"
        >
          <!-- {{$store.commit(
              "standingDetail/getsingleTableIndex",
              index
            )}} 取index值触发死循环 2022-9-16-->
          <span class="tablespan">{{ SinglePratice2[index].position }}</span>
          <span class="tablespan">{{
            SinglePratice2[index].driver_number
          }}</span>
          <span class="tablespan">{{ SinglePratice2[index].driver_name }}</span>
          <span class="tablespan">{{ SinglePratice2[index].team }}</span>
          <span class="tablespan">{{ SinglePratice2[index].record }}</span>
          <span class="tablespan">{{ SinglePratice2[index].GAP }}</span>
          <span class="tablespan">{{ SinglePratice2[index].laps }}</span>
        </div>
      </div>

      <div
        v-if="
          this.singleRaceList[this.singleRaceList.length - 1] ===
          'single_pratic3'
        "
        class="standingTable_total_content"
      >
        <div class="standingTable_singlepratic1_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesinglepratice1head"
            :key="index"
            >{{ tablesinglepratice1head[index] }}</span
          >
        </div>
        <div
          class="standingTable_singlepratic1_column"
          v-for="(item, index) in this.SinglePratice3"
          :key="index"
        >
          <!-- {{$store.commit(
              "standingDetail/getsingleTableIndex",
              index
            )}} 取index值触发死循环 2022-9-16-->
          <span class="tablespan">{{ SinglePratice3[index].position }}</span>
          <span class="tablespan">{{
            SinglePratice3[index].driver_number
          }}</span>
          <span class="tablespan">{{ SinglePratice3[index].driver_name }}</span>
          <span class="tablespan">{{ SinglePratice3[index].team }}</span>
          <span class="tablespan">{{ SinglePratice3[index].record }}</span>
          <span class="tablespan">{{ SinglePratice3[index].GAP }}</span>
          <span class="tablespan">{{ SinglePratice3[index].laps }}</span>
        </div>
      </div>

      <div
        v-if="
          this.SingleQualify[this.SingleQualify.length - 1] ===
          'single_qualifying'
        "
        class="standingTable_total_content"
      >
        <div class="standingTable_singlequalify_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesinglequalifyinghead"
            :key="index"
            >{{ tablesinglequalifyinghead[index] }}</span
          >
        </div>
        <div
          class="standingTable_singlequalify_column"
          v-for="(item, index) in this.SingleRace"
          :key="index"
        >
          <!-- {{$store.commit(
              "standingDetail/getsingleTableIndex",
              index
            )}} 取index值触发死循环 2022-9-16-->
          <span class="tablespan">{{ SingleQualify[index].position }}</span>
          <span class="tablespan">{{
            SingleQualify[index].driver_number
          }}</span>
          <span class="tablespan">{{ SingleQualify[index].driver_name }}</span>
          <span class="tablespan">{{ SingleQualify[index].team }}</span>
          <span class="tablespan">{{ SingleQualify[index].Q1 }}</span>
          <span class="tablespan">{{ SingleQualify[index].Q2 }}</span>
          <span class="tablespan">{{ SingleQualify[index].Q3 }}</span>
          <span class="tablespan">{{ SingleQualify[index].laps }}</span>
        </div>
      </div>
    </div>
    <!-- ↑ -->
    <div
    v-if="this.SingleDriver[this.SingleDriver.length - 1] === 'single_driver'"
      class="standingTable_container"
      :key="Math.floor((Math.random()*1000)+1)"
    >
      <div class="standingTable_title">
        <span class="titlespan"> {{ SingleDriver[0].title }} </span>
      </div>
      <div class="standingTable_total_content">
        <div class="standingTable_singledriver_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesingledriverhead"
            :key="index"
            >{{ tablesingledriverhead[index] }}</span
          >
        </div>
        <div
          class="standingTable_singledriver_column"
          v-for="(item, index) in this.SingleDriver"
          :key="index"
        >
          <span class="tablespan">{{ SingleDriver[index].grand_prix }}</span>
          <span class="tablespan">{{ SingleDriver[index].date }}</span>
          <span class="tablespan">{{ SingleDriver[index].team }}</span>
          <span class="tablespan">{{ SingleDriver[index].position }}</span>
          <span class="tablespan">{{ SingleDriver[index].points }}</span>
        </div>
      </div>
    </div>

    <div
    v-if="this.SingleTeam[this.SingleTeam.length - 1] === 'single_team'"
      class="standingTable_container"
      :key="Math.floor((Math.random()*1000)+1)"
    >
      <div class="standingTable_title">
        <span class="titlespan"> {{ SingleTeam[0].title }} </span>
      </div>
      <div class="standingTable_total_content">
        <div class="standingTable_singleteam_head">
          <span
            class="headspan"
            v-for="(item, index) in tablesingleteamhead"
            :key="index"
            >{{ tablesingleteamhead[index] }}</span
          >
        </div>
        <div
          class="standingTable_singleteam_column"
          v-for="(item, index) in this.SingleTeam"
          :key="index"
        >
          <span class="tablespan">{{ SingleTeam[index].grand_prix }}</span>
          <span class="tablespan">{{ SingleTeam[index].date }}</span>
          <span class="tablespan">{{ SingleTeam[index].points }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    
    tabletotaldriverhead: ["SEASON", "POS", "WINNER", "NATION", "CAR", "PTS"],
    tabletotalracehead: ["GRAND PRIX", "DATE", "WINNER", "CAR", "LAPS", "TIME"],
    tabletotalteamhead: ["POS", "TEAM", "PTS"],
    tabletotalfastlaphead: ["GRAND PRIX", "DRIVER", "CAR", "TIME"],

    tablesingleteamhead: ["GRAND PRIX", "DATE", "PTS"],
    tablesingleracehead: [
      "POS",
      "NO",
      "DRIVER",
      "CAR",
      "LAPS",
      "TIME/RETIRED",
      "PTS",
    ],
    tablesingledriverhead: [
      "GRAND PRIX",
      "DATE",
      "CAR",
      "POS",
      "PTS",
    ],

    tablesinglefastlaphead: [
      "POS",
      "NO",
      "DRIVER",
      "CAR",
      "LAPS",
      "TIME",
      "DATE",
      "AVG SPEED",
    ],
    tablesinglequalifyinghead: [
      "POS",
      "NO",
      "DRIVER",
      "CAR",
      "Q1",
      "Q2",
      "Q3",
      "LAPS",
    ],
    tablesinglepratice1head: [
      "POS",
      "NO",
      "DRIVER",
      "CAR",
      "TIME",
      "GAP",
      "LAPS",
    ],
    tablesinglepratice2head: [
      "POS",
      "NO",
      "DRIVER",
      "CAR",
      "TIME",
      "GAP",
      "LAPS",
    ],
    tablesinglepratice3head: [
      "POS",
      "NO",
      "DRIVER",
      "CAR",
      "TIME",
      "GAP",
      "LAPS",
    ],
    requireList: [
      "RACE",
      "FASTLAP",
      "PRATICE1",
      "PRATICE2",
      "PRATICE3",
      "QUALIFYING",
    ],
    singleRaceList:[],
  }),
  computed: {
    ...mapState("standingDetail", [
      "TotalDriver",
      "TotalFastLap",
      "Totalrace",
      "TotalTeam",

      "SingleRace",
      "SingleTeam",
      "SingleDriver",

      "SingleFastLap",
      "SinglePratice1",
      "SinglePratice2",
      "SinglePratice3",
      "SingleQualify",

      "singleTableYear",
      "singleTableitems",
    ]),

  },
  methods: {
    getsingleTableIndex(index) {
        
        this.singTableIndex = index;

    },
    changeAddrequireIndex() {
    
        const requires = this.requireList.pop();
        this.requireList.unshift(requires);
        this.getsinglerace();
    

      console.log(this.requireList);
    },
    changeReducerequireIndex() {
     this.$nextTick(()=>{
      const requires = this.requireList.shift();
        this.requireList.push(requires);
        this.getsinglerace();
     })
        
 

      console.log(this.requireList);
    },
    getsinglerace() {
      this.$axios
        .get(
          `http://127.0.0.1:8080/api/standingdetail/getStandingSingleRace/?year=${this.singleTableYear}&require=${this.requireList[0]}&items=${this.singleTableitems}`
        )
        .then((res) => {
          if (res.status === 200) {
            this.singleRaceList=[];
            for (let key in res.data) {
              this.singleRaceList.push(res.data[key]);
            }
            this.$store.commit(
              "standingDetail/getStandingRaceData",
              this.singleRaceList
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  *{
    user-select: none;
  }

  i{
    font-style: normal !important;
    display:inline-block !important;
    transform:translateY(150%) ;
  }
  i:nth-child(1){
   animation: titlefont 1s ease-in-out .5s 1 forwards;
  }
  i:nth-child(2){
    animation: titlefont 1s ease-in-out .8s 1 forwards;
  }
  i:nth-child(3){
    animation: titlefont 1s ease-in-out 1.1s 1 forwards;
  }
  .font-out{
    animation: titlefontout 1s ease-in-out .1s 1 forwards;
  }
  @keyframes titlefont{
    0%{
      transform: translateY(150%);
    }
    100%{
      transform: translateY(0%);
    }
  }
  @keyframes titlefontout{
    0%{
      transform: translateY(0%);
    }
    100%{
      transform: translateY(150%);
    }
  }
  @keyframes tablefont{
    0%{
      transform: translateY(150%);
    }
    100%{
      transform: translateY(0%);
    }
  }
.standingTable {
  width: 100%;
  height: auto;
  background-color: #f7f4f1;
  display: flex;
  justify-content: center;
  .standingTable_container {
    width: 95%;
    height: 100%;
    min-height: 1000px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 0px 10px 5px rgb(0 0 0 / 20%);
    transition: all 0.7s ease;
    .titlespan {
      font-size: 2.5rem;
      font-family: Heavy;
      color: rgb(0, 0, 0);
      line-height: 4;
      white-space: nowrap;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .sub_titlespan {
      font-size: 1.5rem;
      font-family: Heavy;
      color: rgb(0, 0, 0);
      line-height: 3;
      white-space: nowrap;
      min-width: 153px;
      max-height: 80px;
    }
    .headspan {
      color: rgb(0, 0, 0);
      font-size: 1.5rem;
      font-family: Heavy;
      white-space: nowrap;
      display: inline-block;
      transform: translateY(150%);
      animation: tablefont 1s ease-in-out 1s 1 forwards;
    }
    .tablespan {
      color: rgb(0, 0, 0);
      font-size: 1rem;
      font-family: Medium;
      white-space: nowrap;
      display: inline-block;
      transform: translateY(150%);
      animation: tablefont 1s ease-in-out 1s 1 forwards;
    }
    .standingTable_title {
      width: 100%;
      text-align: center;
      height: 25%;
      display: flex;
      justify-content: center;
    }
    .standingTable_sub_title {
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      .standingTable_sub_arrow {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #ff8000;
        box-shadow: 0 0 5px 5px rgba(255, 115, 0, 0.2);
        transition: all 0.7s ease;
      }
      .standingTable_sub_arrow:hover {
        box-shadow: 0 0 5px 5px rgba(255, 115, 0, 0.5);
      }
    }
    .standingTable_total_content {
      width: 100%;
      height: 85%;
      display: flex;
      flex-direction: column;
      div{
        overflow: hidden;
      }
    }
    .standingTable_totaldriver_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_totalrace_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_TotalTeam_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_TotalFastLap_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_singlerace_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_singledriver_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_singlefastlap_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_singleteam_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_total_content div:hover {
      background-color: rgb(255, 0, 0) !important;
      span {
        color: rgb(244, 244, 244);
      }
    }
  
    .standingTable_singlepratic1_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_singlequalify_column:nth-child(even) {
      background-color: rgb(244, 244, 244) !important;
    }
    .standingTable_totaldriver_head {
      display: grid;
      grid-template-columns: 15% 10% 15% 10% 25% 5%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_totaldriver_column {
      display: grid;
      grid-template-columns: 15% 10% 15% 10% 25% 5%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
    }
    .standingTable_totalrace_head {
      display: grid;
      grid-template-columns: 15% 15% 15% 20% 10% 15%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .standingTable_totalrace_column {
      display: grid;
      grid-template-columns: 15% 15% 15% 20% 10% 15%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
      overflow: hidden;
    }
    .standingTable_TotalTeam_head {
      display: grid;
      grid-template-columns: 25% 40% 15%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_TotalTeam_column {
      display: grid;
      grid-template-columns: 25% 40% 15%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
    }
    .standingTable_TotalFastLap_head {
      display: grid;
      grid-template-columns: 20% 20% 25% 20%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_TotalFastLap_column {
      display: grid;
      grid-template-columns: 20% 20% 25% 20%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
    }
    .standingTable_singlerace_head {
      display: grid;
      grid-template-columns: 10% 10% 15% 20% 10% 15% 10%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singlerace_column {
      display: grid;
      grid-template-columns: 10% 10% 15% 20% 10% 15% 10%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
    }
    .standingTable_singlerace_choice {
      width: 20%;
      height: 100px;
      background-color: aqua;
    }
    .standingTable_singledriver_head {
      display: grid;
      grid-template-columns: 20% 15% 25% 20% 5%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singledriver_column {
      display: grid;
      grid-template-columns: 20% 15% 25% 20% 5%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
    }
    .standingTable_singleteam_head {
      display: grid;
      grid-template-columns: 20% 15% 15%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singleteam_column {
      display: grid;
      grid-template-columns: 20% 15% 15%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
      transition: all 0.7s ease;
    }
    .standingTable_singlefastlap_head {
      display: grid;
      grid-template-columns: 8% 8% 12% 20% 10% 10% 10% 10%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singlefastlap_column {
      display: grid;
      grid-template-columns: 8% 8% 12% 20% 10% 10% 10% 10%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singlepratic1_head {
      display: grid;
      grid-template-columns: 8% 8% 12% 20% 10% 10% 10%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singlepratic1_column {
      display: grid;
      grid-template-columns: 8% 8% 12% 20% 10% 10% 10%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singlequalify_head {
      display: grid;
      grid-template-columns: 5% 5% 15% 20% 10% 10% 10% 5%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
    .standingTable_singlequalify_column {
      display: grid;
      grid-template-columns: 5% 5% 15% 20% 10% 10% 10% 5%;
      grid-template-rows: repeat(auto-fill, 50px);
      justify-content: center;
      align-items: center;
    }
  }
  .standingTable_container:hover {
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5);
  }
}
</style>