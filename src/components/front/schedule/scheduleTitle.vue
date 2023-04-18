<template>
  <div class="schedule">
    <div class="schedule_title_container">
      <div class="shedule_title_left">
        <div class="schedule_main_title">2023 赛季赛事安排</div>
        <div class="shedule_sub_title">
          2023 FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR
        </div>
      </div>
      <div class="schedule_title_right">
        <div class="schedule_nextround">
          <div class="schedule_nextround_pic_container">
            <!-- <img
              class="schedule_nextround_pic"
              src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/Double%20arrow%20down.svg"
            /> -->

            <svg
              t="1662947499471"
              class="schedule_nextround_pic"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14710"
              width="45"
              height="35"
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
              <path
                d="M797.103616 493.748224q0 7.428096-5.71392 13.142016l-266.268672 266.268672q-5.71392 5.71392-13.142016 5.71392t-13.142016-5.71392l-266.268672-266.268672q-5.71392-5.71392-5.71392-13.142016t5.71392-13.142016l28.5696-28.5696q5.71392-5.71392 13.142016-5.71392t13.142016 5.71392l224.557056 224.557056 224.557056-224.557056q5.71392-5.71392 13.142016-5.71392t13.142016 5.71392l28.5696 28.5696q5.71392 5.71392 5.71392 13.142016zm0-219.414528q0 7.428096-5.71392 13.142016l-266.268672 266.268672q-5.71392 5.71392-13.142016 5.71392t-13.142016-5.71392l-266.268672-266.268672q-5.71392-5.71392-5.71392-13.142016t5.71392-13.142016l28.5696-28.5696q5.71392-5.71392 13.142016-5.71392t13.142016 5.71392l224.557056 224.557056 224.557056-224.557056q5.71392-5.71392 13.142016-5.71392t13.142016 5.71392l28.5696 28.5696q5.71392 5.71392 5.71392 13.142016z"
                p-id="14711"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div class="schedule_nextround_content" @click="skipTo()">
            <div class="schedule_nextround_title">下一站前往</div>
            <div class="schedule_nextround_prixname">ITALY</div>
          </div>
        </div>
        <div class="schedule_download_calendar" @click="downloadCalendar()">
          <!-- <img
            class="schedule_download_calendar_pic"
            src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/download.svg"
          /> -->
          <svg
            t="1662947908513"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="15897"
          >
            <path
              d="M704 341.333333h64a64 64 0 0 1 64 64v362.666667a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V405.333333a64 64 0 0 1 64-64h64v64h-64v362.666667h512V405.333333h-64v-64z m-154.794667-212.266666l0.042667 347.456 74.005333-74.026667 45.226667 45.248-150.826667 150.848-150.848-150.826667 45.248-45.269333 73.173334 73.173333V129.066667h64z"
              p-id="15898"
            ></path>
          </svg>
          <div class="schedule_download_calendar_content">CALENDAR</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    skipTo() {
      // document.querySelectorAll('.schedule_nextround_content').scrollIntoView({behavior:'smooth'})//不在同一组件
      window.scrollTo(0, 1500);
    },
    downloadCalendar() {
      this.$axios
        .get(
          "https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/Formula_1_Official_Calendar%20.ics",
          {
            ResponseType: "arraybuffer",
          }
        )
        .then((res) => {
          console.log(res);

          const blob = new Blob([res.data]);
          console.log(blob);

          const blobUrl = window.URL.createObjectURL(blob);
          console.log(blobUrl);

          const tmpLink = document.createElement("a");
          tmpLink.style.display = "none";
          tmpLink.href = blobUrl;
          tmpLink.setAttribute("download", "calendar.ics");
          document.body.appendChild(tmpLink);
          tmpLink.click();
          document.body.removeChild(tmpLink);
          window.URL.revokeObjectURL(blobUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule {
  margin-top: 70px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .schedule_title_container {
    width: 90%;
    height: 100%;
    border-top: 10px solid rgb(0, 0, 0);
    border-right: 10px solid rgb(0, 0, 0);
    border-top-right-radius: 15px;
    display: flex;
    justify-content: space-around;
    .shedule_title_left {
      width: 60%;
      height: 100%;
      .schedule_main_title {
        font-family: Heavy;
        font-size: 4rem;
        white-space: nowrap;
      }
      .shedule_sub_title {
        font-family: medium;
        font-size: 1rem;
        white-space: nowrap;
      }
    }
    .schedule_title_right {
      width: 30%;
      height: auto;
      min-width: 406px;
      min-height: 140px;
      display: flex;
      justify-content: space-evenly;
      .schedule_nextround {
        width: 60%;
        display: flex;
        align-items: center;
        .schedule_nextround_pic_container {
          width: 25%;
          height: 40%;
          background-color: #e10600;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          position: relative;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 35px;
          }
        }
        .schedule_nextround_content {
          width: 60%;
          height: 40%;
          border: 1px solid rgb(237, 237, 237);
          border-left: 0px transparent;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 0px 15px;
          transition: all 0.5s ease;
          .schedule_nextround_title {
            font-size: 1rem;
            font-family: Medium;
            color: #e10600;
            white-space: nowrap;
          }
          .schedule_nextround_prixname {
            font-size: 1rem;
            font-family: Heavy;
            white-space: nowrap;
          }
        }
      }
      .schedule_download_calendar {
        width: 35%;
        height: 40%;
        padding: 5px 0;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(237, 237, 237);
        border-radius: 10px;
        transition: all 0.5s ease;
        .schedule_download_calendar_pic {
          width: 35px;
          height: 25px;
        }
        .schedule_download_calendar_content {
          font-size: 1rem;
          font-family: Medium;
        }
      }
    }
  }
}
.schedule_download_calendar:hover {
  cursor: pointer !important;
  border: 1px solid rgb(0, 0, 0) !important;
}
.schedule_nextround_content:hover {
  cursor: pointer !important;
  border-top: 1px solid rgb(0, 0, 0) !important;
  border-right: 1px solid rgb(0, 0, 0) !important;
  border-bottom: 1px solid rgb(0, 0, 0) !important;
}
</style>