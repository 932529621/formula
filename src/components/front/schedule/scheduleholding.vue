<template>
  <div class="scheduleheld">
    <div class="scheduleheld_outer">
      <div class="scheduleheld_container">
        <div class="scheduleheld_container_top">
          <div class="scheduleheld_container_round">{{ heldlist.round }}</div>
          <div class="scheduleheld_container_day">
            {{
              heldlist.race_date.split("-")[0].substr(0, 2) +
              "-" +
              heldlist.race_date.split("-")[1].substr(0, 2)
            }}
          </div>
          <div class="scheduleheld_container_month">{{ heldlist.month }}</div>
          <img
            class="scheduleheld_container_nationIcon"
            :src="heldlist.nation_icon"
          />
        </div>
        <div class="scheduleheld_container_middle">
          <div class="scheduleheld_container_nationName">{{heldlist.nation_name}}</div>
          <div class="scheduleheld_container_arrow"></div>
          <div class="scheduleheld_container_introduction">
            {{heldlist.prix_fullname}}
          </div>
        </div>
        <div class="scheduleheld_container_bottom">
          <img
            class="schedular_container_map"
            :src="heldlist.nation_map"
          />
        </div>
        <div class="scheduleheld_container_prixpic"></div>
      </div>
      <div class="schedulewill_container">
        <img
          :src="heldlist.nation_banner_pic"
          class="schedulewill_container_pic"
        />
        <div class="schedulewill_container_calendar">
          <div class="schedulewill_container_calendar_position">
            <div class="calendar_content_racetime">
              <div class="calendar_content_racetime_pratice">
                <div class="calendar_content_racetime_pratice_title">
                  PRACTICE1
                </div>
                <div class="calendar_content_racetime_pratice_week">FRI</div>
                <div class="calendar_content_racetime_pratice_time">
                  {{heldlist.practice1_date}}
                </div>
                <div class="calendar_content_racetime_pratice_title">
                  PRACTICE2
                </div>
                <div class="calendar_content_racetime_pratice_week">FRI</div>
                <div class="calendar_content_racetime_pratice_time">
                  {{heldlist.practice2_date}}
                </div>
                <div class="calendar_content_racetime_pratice_title">
                  PRACTICE3
                </div>
                <div class="calendar_content_racetime_pratice_week">FRI</div>
                <div class="calendar_content_racetime_pratice_time">
                  {{heldlist.practice3_date}}
                </div>
              </div>
              <div class="calendar_content_racetime_race">
                <div class="calendar_content_racetime_pratice_title">
                  QUALIFYING
                </div>
                <div class="calendar_content_racetime_pratice_week">SAT</div>
                <div class="calendar_content_racetime_pratice_time">
                  {{heldlist.qualifying_date}}
                </div>
                <div class="calendar_content_racetime_pratice_title">RACE</div>
                <div class="calendar_content_racetime_pratice_week">SUN</div>
                <div class="calendar_content_racetime_pratice_time">
                  {{heldlist.race_time}}
                </div>
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
    heldlist: {},
  }),
  mounted() {
    this.ScheduleInfos.forEach((e) => {
      if (e.prix_status === "holding") {
        this.heldlist = e;
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
  min-height: 350px;
  max-height: 350px;
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
  background-color: rgb(21, 21, 30);
  .scheduleheld_outer {
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(auto-fill, 323px);
    border-top: 10px solid #e10600;
    border-right: 10px solid #e10600;
    border-top-right-radius: 15px;

    .scheduleheld_container {
      width: 100%;
      height: 100%;
      max-height: 330px;
      max-width: 323px;
      min-height: 330px;
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
          "rounds rounds rounds "
          "day day nationIcond  "
          "month finishwrap finishwrap ";
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
          color: rgb(255, 255, 255);
          font-size: 1.5em;
          font-family: Heavy;
          white-space: nowrap;
        }
        .scheduleheld_container_month {
          grid-area: month;
          background-color: rgb(255, 0, 0);
          color: rgb(255, 255, 255);
          font-size: 1rem;
          font-family: Heavy;
          border-radius: 5px;
          padding: 0 10px;
          text-align: center;
          justify-self: flex-start;
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
          color: rgb(255, 255, 255);
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
          color: rgb(255, 255, 255);
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
        background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/schedular_map_background_white.png");
        background-repeat: repeat;
        background-size: 8px;
        justify-content: center;
        .schedular_container_map {
          min-width: 195px;
          min-height: 145px;
        }
      }
    }
    .schedulewill_container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      .schedulewill_container_pic {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }
      .schedulewill_container_calendar_position {
        width: 330px;
        height: 230px;
        position: absolute;
        top: 50%;
        right: 5%;
        transform: translateY(-50%);
        background-color: #000000;
        border-radius: 10px;
        .calendar_content_racetime {
          width: 100%;
          height: 40%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-top: 50%;
          transform: translateY(-100%);
          .calendar_content_racetime_pratice {
            width: 100%;
            display: grid;
            grid-template-columns: 40% 15% 40%;
            row-gap: 10px;
            margin-bottom: 20px;
          }
          .calendar_content_racetime_race {
            width: 100%;
            display: grid;
            row-gap: 10px;
            grid-template-columns: 40% 15% 40%;
          }
          .calendar_content_racetime_pratice_title {
            color: rgba(255, 255, 255, 1);
            font-family: Heavy;
            text-align: center;
            align-self: center;
            font-size: 1rem;
          }
          .calendar_content_racetime_pratice_week {
            color: rgba(148, 148, 152, 0.8);
            font-family: Heavy;
            text-align: center;
            align-self: center;
            font-size: 1rem;
          }
          .calendar_content_racetime_pratice_time {
            color: rgba(255, 255, 255, 1);
            background-color: rgba(56, 56, 63, 0.9);
            font-family: Heavy;
            text-align: center;
            align-self: center;
            border-radius: 20px;
            font-size: 1rem;
          }
        }
      }
    }
  }
}
// .scheduleheld_container:hover {
//   border-top: 5px solid #e10600 !important;
//   border-right: 5px solid #e10600 !important;
// }
</style>






