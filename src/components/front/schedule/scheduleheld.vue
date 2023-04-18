<template>
  <!-- :style="{ height: changeOuterHeight + 'px' }" -->
  <div class="scheduleheld">
    <div class="scheduleheld_outer">
      <div
        class="scheduleheld_container"
        v-for="(item, index) in heldlist"
        :key="index"
        @click="
          $router.push({
            name: 'ScheduledetailPage',
            path: '/schedule/scheduledetail/detailpage',
            query: {
              prixId: index + 1,
            },
          });
          setItemIndex(index);
        "
      >
        <div class="scheduleheld_container_top">
          <div class="scheduleheld_container_round">
            {{ heldlist[index].round }}
          </div>
          <div class="scheduleheld_container_day">
            {{
              heldlist[index].race_date.split("-")[0].substr(0, 2) +
              "-" +
              heldlist[index].race_date.split("-")[1].substr(0, 2)
            }}
          </div>
          <div class="scheduleheld_container_month">
            {{ heldlist[index].month }}
          </div>
          <img
            class="scheduleheld_container_nationIcon"
            :src="heldlist[index].nation_icon"
          />
          <img
            class="scheduleheld_container_finishwrap"
            src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/flag-asset.png"
          />
        </div>
        <div class="scheduleheld_container_middle">
          <div class="scheduleheld_container_nationName">
            {{ heldlist[index].nation_name }}
          </div>
          <div class="scheduleheld_container_arrow"></div>
          <div class="scheduleheld_container_introduction">
            {{ heldlist[index].prix_fullname }}
          </div>
        </div>
        <div class="scheduleheld_container_bottom">
          <div class="scheduleheld_container_driverTwo">
            <div class="scheduleheld_container_top">
              <img :src="heldlist[index].second_driver_info.driver_half_pic" />
            </div>
            <div class="scheduleheld_container_bottom">
              <img
                class="schedule_container_numbericon"
                :src="heldlist[index].second_driver_info.driver_number_icon"
              />
              <div class="schedule_container_drivername">
                {{ heldlist[index].second_driver_info.last_name }}
              </div>
            </div>
          </div>
          <div class="scheduleheld_container_driverOne">
            <div class="scheduleheld_container_top">
              <img :src="heldlist[index].first_driver_info.driver_half_pic" />
            </div>
            <div class="scheduleheld_container_bottom">
              <img
                class="schedule_container_numbericon"
                :src="heldlist[index].first_driver_info.driver_number_icon"
              />
              <div class="schedule_container_drivername">
                {{ heldlist[index].first_driver_info.last_name }}
              </div>
            </div>
          </div>
          <div class="scheduleheld_container_driverThree">
            <div class="scheduleheld_container_top">
              <img :src="heldlist[index].third_driver_info.driver_half_pic" />
            </div>
            <div class="scheduleheld_container_bottom">
              <img
                class="schedule_container_numbericon"
                :src="heldlist[index].third_driver_info.driver_number_icon"
              />
              <div class="schedule_container_drivername">
                {{ heldlist[index].third_driver_info.last_name }}
              </div>
            </div>
          </div>
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
  mounted() {
    this.ScheduleInfos.forEach((e) => {
      if (e.prix_status === "held") {
        this.heldlist.push(e);
      }
    });
  },

  computed: {
    ...mapState("schedule", ["ScheduleInfos"]),
  },
  methods: {
    setItemIndex(index) {
      localStorage.setItem("itemIndex", index + 1);
    },
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
          width: 28px;
          height: 16px;
          margin-right: 5px;
        }
        .scheduleheld_container_finishwrap {
          grid-area: finishwrap;
          width: 90%;
          height: 100%;
          border-radius: 5px;
          justify-self: end;
          margin-right: 5px;
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
        display: grid;
        grid-template-columns: 1fr 1.3fr 1fr;
        grid-auto-rows: 1fr 1.2fr 1fr;
        gap: 5px;
        align-items: flex-end;
        .scheduleheld_container_driverTwo {
          height: 80%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          .scheduleheld_container_top {
            background-color: #15151e;
            height: 80%;
            position: relative;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            img {
              position: absolute;
              width: 100px;
              height: 95px;
              bottom: 0;
              right: 0;
            }
          }
          .scheduleheld_container_bottom {
            height: 20%;
            width: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom: 1px solid rgb(148, 148, 152);
            border-right: 1px solid rgb(148, 148, 152);
            .schedule_container_numbericon {
              width: 23px;
              height: 23px;
            }
            .schedule_container_drivername {
              font-size: .8rem;
              color: rgb(0, 0, 0);
              font-family: Blacks;
            }
          }
        }
        .scheduleheld_container_driverOne {
          height: 100%;
          .scheduleheld_container_top {
            height: 80%;
            background-color: #15151e;
            position: relative;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            img {
              position: absolute;
              width: 115px;
              height: 120px;
              bottom: 0;
              left: 0;
            }
          }
          .scheduleheld_container_bottom {
            height: 20%;
            width: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom: 1px solid rgb(148, 148, 152);
            border-right: 1px solid rgb(148, 148, 152);
            .schedule_container_numbericon {
              width: 23px;
              height: 23px;
            }
            .schedule_container_drivername {
              font-size: .8rem;
              color: rgb(0, 0, 0);
              font-family: Blacks;
            }
          }
        }
        .scheduleheld_container_driverThree {
          height: 80%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;

          .scheduleheld_container_top {
            background-color: #15151e;
            height: 80%;
            position: relative;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            img {
              position: absolute;
              width: 100px;
              height: 95px;
              bottom: 0;
              right: 0;
            }
          }
          .scheduleheld_container_bottom {
            height: 20%;
            width: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom: 1px solid rgb(148, 148, 152);
            border-right: 1px solid rgb(148, 148, 152);
            .schedule_container_numbericon {
              width: 23px;
              height: 23px;
            }
            .schedule_container_drivername {
              font-size: 1rem;
              color: rgb(0, 0, 0);
              font-family: Blacks;
            }
          }
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