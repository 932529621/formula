<template>
  <!-- year+require=items(total) year+require+items=single choic(axios->vuex)->standingTable引用 -->
  <div class="choice">
    <div class="choice_container">
      <div class="choice_year">
        <li
          v-for="(item, index) in yearList"
          :key="index"
          @click="
            changeyear(index);
            getStandingItems();
            getStandingTotal();
          "
        >
          <span :class="{ choiceActive: isyearActive === index }">{{
            yearList[index]
          }}</span>
        </li>
      </div>
      <div class="choice_require">
        <li
          ref="requires"
          v-for="(item, index) in requireList"
          :key="index"
          @click="
            changerequire(index);
            getStandingItems();
            getStandingTotal();
          "
        >
          <span :class="{ choiceActive: isrequireActive === index }">{{
            requireList[index]
          }}</span>
        </li>
      </div>
      <div class="choice_items">
        <li
          v-for="(item, index) in itemsList"
          :key="index"
          @click="
            changeitems(index);
            getStandingSingle();
          "
        >
          <span :class="{ choiceActive: isitemsActive === index }">{{
            itemsList[index]
          }}</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    requireList: ["RACE", "DRIVERS", "TEAMS", "FASTLAP"],
    yearList: [
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
    ],
    itemsList: [],
    isyearActive: 0,
    isrequireActive: 0,
    isitemsActive: 0,
    resultList: [],
    singleList: [],
  }),
  // computed:{
  //   ...mapState('standingDetail',['count'])
  // },

  methods: {
    changeyear(index) {
      this.isyearActive = index;
      this.isrequireActive = 0;
      this.isitemsActive = 0;
    },
    changerequire(index) {
      this.isrequireActive = index;
      this.isitemsActive = 0;
    },
    changeitems(index) {
      this.isitemsActive = index;
    },
    //getItems
    getStandingItems() {
      this.$axios
        .get(
          `http://127.0.0.1:8080/api/standingdetail/getstandingItems/?year=${
            this.yearList[this.isyearActive]
          }&require=${this.requireList[this.isrequireActive]}`
        )
        // .get(`http://127.0.0.1:8080/api/standingdetail/getstandingItems/?year=2022&require=FASTLAP`)
        .then((res) => {
          if (res.status === 200) {
            this.itemsList = [];
            this.itemsList.push("ALL");
            for (let key in res.data) {
              this.itemsList.push(res.data[key]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStandingTotal() {
      this.$axios
        .get(
          `http://127.0.0.1:8080/api/standingdetail/getStandingTotal/?year=${
            this.yearList[this.isyearActive]
          }&require=${this.requireList[this.isrequireActive]}`
        )

        // .get(`http://127.0.0.1:8080/api/standingdetail/getstandingItems/?year=2022&require=FASTLAP`)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            this.resultList = [];
            console.log(res);
            
            for (let key in res.data) {
              this.resultList.push(res.data[key]); //转成数组
              // .push(res.data[key]);
              // _this.$store.commit(getStandingData,this.resultList)
            }

            this.$store.commit(
              "standingDetail/getStandingData",
              this.resultList
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStandingSingle() {
      this.$axios
        .get(
          `http://127.0.0.1:8080/api/standingdetail/getStandingSingle/?year=${
            this.yearList[this.isyearActive]
          }&require=${this.requireList[this.isrequireActive]}&items=${
            this.itemsList[this.isitemsActive]
          }`
        )
        // .get(`http://127.0.0.1:8080/api/standingdetail/getstandingItems/?year=2022&require=FASTLAP`)
        .then((res) => {
          if (res.status === 200) {
            this.singleList = [];
            for (let key in res.data) {
              this.singleList.push(res.data[key]);
            }
            this.$store.commit(
              "standingDetail/getStandingData",
              this.singleList
            );
            const year = this.yearList[this.isyearActive];
            const items = this.itemsList[this.isitemsActive];
            this.$store.commit("standingDetail/getStandingSingleRaceData", {
              year,
              items,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.itemsList);
    },
  },
  async mounted() {
    if(this.$route.query.type==='team'){
      this.$refs.requires[2].click()
    }else if(this.$route.query.type==='driver'){
      this.$refs.requires[1].click()
    }
    //await 等itemsList值被push进去后再执行下列代码 2022.9.22
    await this.$axios
      .get(
        `http://127.0.0.1:8080/api/standingdetail/getstandingItems/?year=${
          this.yearList[this.isyearActive]
        }&require=${this.requireList[this.isrequireActive]}`
      )
      // .get(`http://127.0.0.1:8080/api/standingdetail/getstandingItems/?year=2022&require=FASTLAP`)
      .then((res) => {
        if (res.status === 200) {
          this.itemsList = [];
          this.itemsList.push("ALL");
          for (let key in res.data) {
            this.itemsList.push(res.data[key]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.$route.params.prixName) {
      //scheduleheld的index值+1通过route传到scheduleheldbottom，
      //再route传到choice，最后传给standing显示对应站点信息 2022.9.23
      this.isitemsActive = this.$route.params.prixId;
      this.getStandingSingle();
    } else {
      this.getStandingTotal();
    }
  },
};
</script>

<style lang="scss">
.choice {
  margin-top: 80px;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  background-color: #f7f4f1;
  z-index: 10;
  .choice_container {
    width: 95%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 5px 15px 2px rgb(0 0 0 / 20%);
    transition: all 0.7s ease;
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    div {
      width: 100%;
      height: 100%;
      min-height: 144px;
      overflow: scroll;
      overflow-x: hidden;
      scroll-snap-type: y mandatory;
      li {
        width: auto;
        min-height: 36px;
        line-height: 2;
        white-space: nowrap;
        scroll-snap-align: start;
        span {
          margin-left: 30px;
          font-size: 1.4rem;
          font-family: Heavy;
        }
        .choiceActive {
          border-bottom: 1px solid #e10600;
        }
      }
    }
    div::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    div::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #535353;
    }
    div::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }

    // .choice_year {
    //   background-color: rgb(240, 0, 168);
    // }
    // .choice_require {
    //   background-color: rgb(7, 3, 126);
    // }
    // .choice_items {
    //   background-color: rgb(241, 160, 20);
    // }
  }
  .choice_container:hover {
    box-shadow: 0px 5px 15px 3px rgba(255, 0, 0, 0.1);
  }
}
</style>