<template>
  <v-sheet class="mx-auto mt-8 scheduleSheet" elevation="8" max-width="90%">
    <v-slide-group
      v-model="model"
      mandatory
      center-active
      class="pa-4"
      show-arrows
    >
      <v-slide-item
        v-for="(items, index) in calendarinfo"
        :key="index"
        v-slot="{ active, toggle }"
      >
        <v-card
          color="rgb(21, 21, 23)"
          class="ma-4"
          :height="active ? '300' : '200'"
          :width="active ? '400' : '300'"
          @click="getDriverSchedule(items, toggle)"
        >
          <div class="calendar_header">
            <div class="calendar_content_title">
              {{ calendarinfo[index].prix_fullname }}
            </div>
            <div class="calendar_header_top">
              <img
                class="calendar_nation_pic"
                :src="calendarinfo[index].nation_icon"
              />
              <div class="calendar_nation_name">
                {{ calendarinfo[index].nation_name }}
              </div>
            </div>
            <div class="calendar_content_date">
              {{ calendarinfo[index].race_date }}
            </div>
          </div>
          <div
            class="calendar_content"
            :style="{ opacity: active ? '1' : '0' }"
          >
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
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" tile>
        <v-data-table
          :headers="headers"
          :items="driverinfo"
          class="elevation-1"
          v-for="(item, index) of calendarinfo"
          :key="item.id"
          v-if="model == index"
          loading="false"
          loading-text="请选择一个赛事"
        >
          <template v-slot:item.avatar="{ item }">
            <v-avatar><img :src="item.avatar" /></v-avatar>
          </template>
          <template v-slot:item.practice1="{ item }">
            <v-checkbox
              :disabled="BackuserInfos.role_name !== '车队' || hasheld"
              v-model="item.practice1"
            ></v-checkbox>
          </template>
          <template v-slot:item.practice2="{ item }">
            <v-checkbox
              :disabled="BackuserInfos.role_name !== '车队' || hasheld"
              v-model="item.practice2"
            ></v-checkbox>
          </template>
          <template v-slot:item.practice3="{ item }">
            <v-checkbox
              :disabled="BackuserInfos.role_name !== '车队' || hasheld"
              v-model="item.practice3"
            ></v-checkbox>
          </template>
          <template v-slot:item.Qualify="{ item }">
            <v-checkbox
              :disabled="BackuserInfos.role_name !== '车队' || hasheld"
              v-model="item.Qualify"
            ></v-checkbox>
          </template>
          <template v-slot:item.Race="{ item }">
            <v-checkbox
              :disabled="BackuserInfos.role_name !== '车队' || hasheld"
              v-model="item.Race"
            ></v-checkbox>
          </template>
          <template v-slot:top>
            <v-btn
              v-if="BackuserInfos.role_name === '车队' && !hasheld"
              class="ml-12"
              @click="InsertDriverSchedule(item)"
              center
              color="primary"
              ref="btns"
              >保存</v-btn
            >
          </template>
        </v-data-table>
      </v-sheet>
    </v-expand-transition>
    <v-snackbar
      :timeout="2500"
      :value="isSnackbar"
      fixed
      bottom
      tile
      :color="isSnackbarSuccess ? 'success' : 'red'"
      ref="snackbar"
    >
      {{ snackbarTitle }}
    </v-snackbar>
    <v-snackbar
      :timeout="2500"
      :value="isSnackbars"
      fixed
      bottom
      tile
      color="red"
      ref="snackbars"
    >
      {{ snackbarTitles }}
    </v-snackbar>
  </v-sheet>
</template>

<script>
import {
  getcalendar,
  getDriverByTeam,
  getScheduleDriver,
  InsertDriverSchedule,
  getsysticket,
} from "@/plugins/http";
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  data: () => ({
    isSnackbar: false,
    isSnackbarSuccess: null,
    saveloading: false,

    isSnackbars: false,
    snackbarTitles: "",
    model: null,
    calendarinfo: [],
    driverinfo: [],
    scheduleInfo: [],
    desserts: [],
    flags: true,
    hasheld: false,
    headers: [
      {
        text: "",
        align: "start",
        sortable: false,
        value: "avatar",
      },
      { text: "车手姓名", value: "name" },
      { text: "第一次练习赛", value: "practice1" },
      { text: "第二次练习赛", value: "practice2" },
      { text: "第三次练习赛", value: "practice3" },
      { text: "排位赛", value: "Qualify" },
      { text: "正赛", value: "Race" },
    ],
  }),
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true ? "操作成功" : "操作失败";
    },
    ...mapState("Backuser", ["BackuserInfos"]),
  },
  async mounted() {
    console.log(this.BackuserInfos);

    const ScheduleDriver = await getScheduleDriver();
    this.scheduleInfo = ScheduleDriver.data.ScheduleDriver;
    const res = await getcalendar();
    if (res.status === 200) {
      this.calendarinfo = res.data.schedules;
    }
  },
  methods: {
    async getDriverSchedule(cards, toggle) {
      console.log(cards);
      if (toggle) {
        toggle();
      }
      if (cards.prix_status === "held") {
        this.isSnackbars = true;
        this.snackbarTitles = "本站点比赛已结束！";
        setTimeout(() => {
          this.isSnackbars = false;
        }, 1000);
        this.hasheld = true;
      } else {
        this.hasheld = false;
      }
      const driverinfo = await getDriverByTeam();
      const systicket = await getsysticket();
      console.log(systicket);

      this.driverinfo = driverinfo.data.driverinfo;
      this.driverinfo.forEach((i) => {
        systicket.data.ticketinfo.forEach((item) => {
          if (i.email === item.email && item.status === "wait pay") {
            i.hasTicket = true;
          }
        });
      });
      this.scheduleInfo.forEach((item, index) => {
        if (cards.id === item.schedule_id) {
          this.driverinfo.forEach((items, indexs) => {
            if (items.email === item.driver_email) {
              console.log(items.email);
              switch (item.type) {
                case "practice1":
                  items.practice1 = true;
                  break;
                case "practice2":
                  items.practice2 = true;
                  break;
                case "practice3":
                  items.practice3 = true;
                  break;
                case "Qualify":
                  items.Qualify = true;
                  break;
                case "Race":
                  items.Race = true;
                  break;
              }
            }
          });
        }
      });
    },
    async InsertDriverSchedule(items) {
      this.flags = true;
      const Insertform = [];
      const checkform = {
        practice1: 0,
        practice2: 0,
        practice3: 0,
        Qualify: 0,
        Race: 0,
      };
      this.driverinfo.forEach((item, index) => {
        if ((item.Qualify || item.Race) && item.licenseScore < 80) {
          this.isSnackbars = true;
          this.snackbarTitles = `车手${item.name}的驾照积分低于80分，无法参加此赛事`;
          this.flags = false;
          setTimeout(() => {
            this.isSnackbars = false;
          }, 2000);
          return false;
        } else if (
          (item.Qualify ||
            item.Race ||
            item.practice1 ||
            item.practice2 ||
            item.practice3) &&
          item.hasTicket
        ) {
          this.isSnackbars = true;
          this.snackbarTitles = `车手${item.name}还有未处理的罚单，无法参加此赛事`;
          this.flags = false;
          setTimeout(() => {
            this.isSnackbars = false;
          }, 2000);
          return false;
        } else {
          if (item.Qualify == true) {
            Insertform.push([
              nanoid(11),
              items.id,
              item.team,
              item.email,
              "Qualify",
            ]);
            checkform.Qualify = checkform.Qualify + 1;
          }
          if (item.Race == true) {
            Insertform.push([
              nanoid(11),
              items.id,
              item.team,
              item.email,
              "Race",
            ]);
            checkform.Race = checkform.Race + 1;
          }
          if (item.practice1 == true) {
            Insertform.push([
              nanoid(11),
              items.id,
              item.team,
              item.email,
              "practice1",
            ]);
            checkform.practice1 = checkform.practice1 + 1;
          }
          if (item.practice2 == true) {
            Insertform.push([
              nanoid(11),
              items.id,
              item.team,
              item.email,
              "practice2",
            ]);
            checkform.practice2 = checkform.practice2 + 1;
          }
          if (item.practice3 == true) {
            Insertform.push([
              nanoid(11),
              items.id,
              item.team,
              item.email,
              "practice3",
            ]);
            checkform.practice3 = checkform.practice3 + 1;
          }
        }
      });
      console.log(Insertform);
      console.log(checkform);
      for (const k in checkform) {
        console.log(k);

        if (checkform[k] > 2) {
          this.isSnackbars = true;
          setTimeout(() => {
            this.isSnackbars = false;
          }, 1000);
          this.snackbarTitles = "每节比赛只允许两人参加！";
          this.flags = false;
          break;
        }
      }
      if (this.flags) {
        const res = await InsertDriverSchedule({
          schedule_id: items.id,
          Insertform,
        });
        console.log(res);

        if (res.data.Operation == "success") {
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
          }, 2500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
            this.saveloading = false;
          }, 2500);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
.calendar_header {
  max-width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;

  .calendar_content_title {
    font-family: Heavy;
    color: rgba(255, 255, 255, 1);
    font-size: 0.5rem;
    text-align: center;
    transition: all 0.5s ease;
  }
  .calendar_header_top {
    max-width: 90px;
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
  .calendar_content_title {
    font-family: Heavy;
    color: rgba(255, 255, 255, 1);
    font-size: 0.5rem;
    text-align: center;
    transition: all 0.5s ease;
  }
  .calendar_content_date {
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-family: Heavy;
  }
}
.calendar_content {
  width: 100%;
  height: 30%;
  opacity: 0;
  transition: all 0.3s ease;

  .calendar_content_racetime {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    .calendar_content_racetime_pratice {
      width: 50%;
      height: 100%;
      display: grid;
      grid-template-columns: 35% 12% 45%;
      gap: 4px;
      margin-left: 10px;
    }
    .calendar_content_racetime_race {
      width: 50%;
      height: 65%;
      display: grid;
      grid-template-columns: 40% 15% 40%;
      gap: 4px;
      margin-right: 2px;
    }
    .calendar_content_racetime_pratice_title {
      color: rgba(255, 255, 255, 1);
      font-family: Heavy;
      text-align: center;
      align-self: center;
      font-size: 0.5rem;
    }
    .calendar_content_racetime_pratice_week {
      color: rgba(148, 148, 152, 0.8);
      font-family: Heavy;
      text-align: center;
      align-self: center;
      font-size: 0.5rem;
    }
    .calendar_content_racetime_pratice_time {
      color: rgba(255, 255, 255, 1);
      background-color: rgba(56, 56, 63, 0.9);
      text-align: center;
      align-self: center;
      border-radius: 20px;
      font-size: 0.5rem;
    }
  }
}
</style>