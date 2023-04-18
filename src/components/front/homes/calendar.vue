<template>
  <div class="race_calendar" id="race_calendar" v-if="isshow">
    <div class="calendar_container_outer">
      <div
        class="calendar_container"
        v-for="(item, index) in calendarinfo"
        :key="index"
        :class="{ calendar_active: iscalendaractive == index }"
        @click="changecalendar(index)"
      >
        <div class="calendar_header">
          <div
            class="calendar_header_top"
            :class="{ calendar_header_top_active: iscalendaractive == index }"
          >
            <img
              class="calendar_nation_pic"
              :src="calendarinfo[index].nation_icon"
              :class="{
                calendar_nation_pic_active: iscalendaractive == index,
              }"
            />
            <div class="calendar_nation_name">
              {{ calendarinfo[index].nation_name }}
            </div>
          </div>
          <div
            class="calendar_day"
            :class="{ calendar_day_active: iscalendaractive == index }"
          >
            {{ calendarinfo[index].day }}
          </div>
          <div
            class="calendar_month"
            :class="{ calendar_month_active: iscalendaractive == index }"
          >
            {{ calendarinfo[index].month }}
          </div>
        </div>
        <div
          class="calendar_content"
          :class="{ calendar_content_active: iscalendaractive == index }"
        >
          <div class="calendar_content_title">
            {{ calendarinfo[index].prix_fullname }}
          </div>
          <div class="calendar_content_date">
            {{ calendarinfo[index].race_date }}
          </div>
          <div class="calendar_content_banner">
            <img
              class="calendar_content_logo"
              src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/RolexGoldWhite.png"
            />
            <div class="calendar_content_date_time">
              <div class="calendar_content_date_prixname">
                {{ calendarinfo[index].nation_name }}
              </div>
              <div class="calendar_content_date_prixtime">02:31</div>
              <div class="calendar_content_date_localname">Your Time</div>
              <div class="calendar_content_date_localtime">
                {{ getnowtime() }}
              </div>
            </div>
          </div>
          <div class="calendar_content_racetime">
            <div class="calendar_content_racetime_pratice">
              <div class="calendar_content_racetime_pratice_title">
                PRACTICE1
              </div>
              <div class="calendar_content_racetime_pratice_week">FRI</div>
              <div class="calendar_content_racetime_pratice_time">
                {{ calendarinfo[index].practice1_date }}
              </div>
              <div class="calendar_content_racetime_pratice_title">
                PRACTICE2
              </div>
              <div class="calendar_content_racetime_pratice_week">FRI</div>
              <div class="calendar_content_racetime_pratice_time">
                {{ calendarinfo[index].practice2_date }}
              </div>
              <div class="calendar_content_racetime_pratice_title">
                PRACTICE3
              </div>
              <div class="calendar_content_racetime_pratice_week">FRI</div>
              <div class="calendar_content_racetime_pratice_time">
                {{ calendarinfo[index].practice3_date }}
              </div>
            </div>
            <div class="calendar_content_racetime_race">
              <div class="calendar_content_racetime_pratice_title">
                QUALIFYING
              </div>
              <div class="calendar_content_racetime_pratice_week">SAT</div>
              <div class="calendar_content_racetime_pratice_time">
                {{ calendarinfo[index].qualifying_date }}
              </div>
              <div class="calendar_content_racetime_pratice_title">RACE</div>
              <div class="calendar_content_racetime_pratice_week">SUN</div>
              <div class="calendar_content_racetime_pratice_time">
                {{ calendarinfo[index].race_time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcalendar } from "@/plugins/http";
export default {
  data: () => ({
    isshow: false,
    calendarinfo: {},
    iscalendaractive: 5,
    calendarMouseX: 0,
    isfirst: true,
  }),
  methods: {
    changecalendar(index) {
      this.iscalendaractive = index;
    },
    scrollInit() {
      this.$nextTick(() => {
        const calendar = document.getElementById("race_calendar");
        var flag = false;
        var downX;
        var scrollLeft;

        calendar.addEventListener("mousedown", function (event) {
          flag = true;
          downX = event.clientX;
          scrollLeft = this.scrollLeft;
        });
        calendar.addEventListener("mousemove", function (event) {
          if (flag) {
            var moveX = event.clientX;
            var scrollX = moveX - downX;
            this.scrollLeft = (scrollLeft - scrollX) * 1.1;
          }
          if (this.scrollLeft <= 0) {
            this.style.borderLeft = "3px solid red";
            this.style.boxShadow = "inset 15px 0px 30px -10px red";
          } else {
            this.style.borderLeft = "";
            this.style.boxShadow = "";
          }
        });
        calendar.addEventListener("mouseup", function () {
          flag = false;
        });
        calendar.addEventListener("mouseleave", function (event) {
          flag = false;
        });
      });
    },
    handleScroll() {
      if (window.scrollY > 1800 && this.isfirst) {
        const calendar = document.getElementById("race_calendar");
        const index = this.iscalendaractive;
        calendar.scrollLeft = `${(index - 3) * 150}`;
        this.isfirst = false;
      }
    },
    getnowtime() {
      const times = new Date();
      var h = times.getHours();
      h = h > 9 ? h : "0" + h;
      var m = times.getMinutes();
      m = m > 9 ? m : "0" + m;
      return h + ":" + m;
    },
  },
  async mounted() {
    // this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getcalendar")
    //   .then((res) => {
    const res = await getcalendar();
    if (res.status === 200) {
      this.calendarinfo = res.data.schedules;
      // this.$store.commit("standingDetail/gethomeloadingvalue", 10);进度条删了
      for (const key in res.data) {
        if (res.data[key].prix_status === "holding") {
          this.iscalendaractive = key;
        }
      }
      this.isshow = true;
      window.addEventListener("scroll", this.handleScroll, false);
      this.scrollInit();
    }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
};
</script>

<style lang="scss" scoped>
.race_calendar {
  margin-top: 5%;
  min-width: auto;
  height: 570px;
  background-color: rgb(21, 21, 23);
  overflow-x: scroll;
  overflow-y: hidden;
  user-select: none;
  transition: all 0.2s ease;
  .calendar_container_outer {
    width: 5000px;
    height: 100%;
    padding: 1%;
    display: flex;

    .calendar_container {
      width: 150px;
      height: 100%;
      border-right: 1px solid white;
      border-bottom: 1px solid white;
      border-bottom-right-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 1s ease;
      cursor: pointer;

      .calendar_header {
        max-width: 60%;
        max-height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-direction: column;
        .calendar_header_top {
          max-width: 90px;
          max-height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.7s ease;
          .calendar_nation_pic {
            max-width: 100%;
            max-height: 90%;
            border-radius: 10px;
            transition: all 0.7s ease;
          }
          .calendar_nation_name {
            margin-top: 5%;
            width: auto;
            height: 5%;
            white-space: nowrap;
            font-family: Heavy;
            color: rgb(148, 148, 152);
            transition: all 0.7s ease;
          }
        }
        .calendar_day {
          margin-top: 10%;
          width: auto;
          height: 30%;
          color: white;
          font-family: Heavy;
          font-size: 3rem;
          transition: all 0.7s ease;
        }
        .calendar_month {
          margin-top: 5%;
          width: auto;
          height: 100%;
          color: white;
          font-family: Heavy;
          font-size: 1rem;
          transition: all 0.7s ease;
        }
      }
      .calendar_content {
        width: 100%;
        height: 50%;
        opacity: 1;
        transition: all 1s ease;
        transform: translateY(450px);
        .calendar_content_title {
          font-family: Heavy;
          color: rgba(255, 255, 255, 1);
          font-size: 2rem;
          text-align: center;
          transform: translateY(-120px);
          transition: all 0.5s ease;
        }
        .calendar_content_date {
          text-align: center;
          color: rgb(148, 148, 152);
          transform: translateY(-120px);
          font-family: Heavy;
        }
        .calendar_content_banner {
          width: 100%;
          height: 40%;
          background-color: rgba(0, 99, 65, 1);
          border-radius: 10px;
          transform: translateY(-110px);
          display: flex;
          justify-content: center;
          align-items: center;
          .calendar_content_logo {
            width: 100px;
            height: 78px;
            margin-right: 10px;
          }
          .calendar_content_date_time {
            width: 20%;
            height: 90%;
            display: flex;
            flex-direction: column;
            .calendar_content_date_prixtime {
              font-size: 15px;
              font-family: Blacks;
              color: rgb(148, 148, 152);
            }
            .calendar_content_date_prixname {
              font-size: 15px;
              font-family: Blacks;
              color: rgb(148, 148, 152);
            }
            .calendar_content_date_localtime {
              font-size: 15px;
              font-family: Blacks;
              color: rgba(255, 255, 255, 1);
            }
            .calendar_content_date_localname {
              font-size: 15px;
              font-family: Blacks;
              color: rgba(255, 255, 255, 1);
            }
          }
        }

        .calendar_content_racetime {
          width: 100%;
          height: 40%;
          transform: translateY(-70px);
          display: flex;
          justify-content: center;
          .calendar_content_racetime_pratice {
            width: 50%;
            height: 100%;
            display: grid;
            grid-template-columns: 35% 12% 45%;
            margin-left: 10px;
          }
          .calendar_content_racetime_race {
            width: 50%;
            height: 65%;
            display: grid;
            grid-template-columns: 40% 15% 40%;
          }
          .calendar_content_racetime_pratice_title {
            color: rgba(255, 255, 255, 1);
            font-family: Heavy;
            text-align: center;
            align-self: center;
            font-size: 1.1rem;
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
            text-align: center;
            align-self: center;
            border-radius: 20px;
            font-size: 1rem;
          }
        }
      }
    }

    .calendar_active {
      width: 600px;
    }
    .calendar_content_active {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .calendar_header_top_active {
      transform: translateY(-30px);
    }
    .calendar_nation_pic_active {
      transform: scale(1.3);
    }
    .calendar_day_active {
      transform: translateY(100px);
      color: transparent !important;
    }
    .calendar_month_active {
      transform: translateY(100px);
      color: transparent !important;
    }
  }
}
.race_calendar::-webkit-scrollbar {
  display: none;
}
</style>