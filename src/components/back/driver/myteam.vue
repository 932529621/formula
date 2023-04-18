<template>
  <v-app>
    <v-card-text>
      <v-container>
        <v-card class="mx-auto" min-width="90%" outlined>
          <v-list-item>
            <v-list-item-content>
              <div
                class="text-overline mb-4"
                style="font-size: 1.4rem !important"
              >
                Team Info
              </div>
              <div class="basicinfo">
                <div class="column-info">
                  <p class="font-weight-blod cards-title">车队名</p>
                  <p class="cards-content">{{ editedItem.full_teamname }}</p>
                </div>
                <v-divider></v-divider>
                <div class="column-info">
                  <p class="font-weight-blod cards-title">车队简介</p>
                  <p class="cards-content">{{ editedItem.full_teamname }}</p>
                </div>
                <v-divider></v-divider>
                <div class="column-info">
                  <p class="font-weight-blod cards-title">车队地址</p>
                  <p class="cards-content">{{ editedItem.base }}</p>
                </div>
              </div>
              <div
                class="btnteam"
                style="display: flex; justify-content: center"
              >
                <v-btn
                  color="light-blue lighten-1"
                  @click="$router.push('/team')"
                  text
                  >查看更多</v-btn
                >
                <v-btn v-if="BackuserInfos.role_name==='车手'" color="pink accent-3" @click="exitTeamApply()" text
                  >申请退出</v-btn
                >
              </div>
            </v-list-item-content>
            <v-list-item-avatar tile width="200px" height="120px">
              <v-img :src="editedItem.team_icon"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-container>
    </v-card-text>

    <v-expansion-panels v-model="panels2" class="pa-6" accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>
          车队车手
          <v-icon color="red" class="ml-4">mdi-racing-helmet</v-icon>
          <template v-slot:actions>
            <v-icon color="primary"> $expand </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="desserts"
            hide-default-footer
          >
            <template v-slot:item.avatar="{ item }">
              <v-avatar>
                <img :src="item.avatar" />
              </v-avatar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                text
                color="primary"
                @click="
                  $router.push({
                    name: 'Driver',
                    path: `/driver`,
                  })
                "
                >查看详细</v-btn
              >
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels v-model="panels1" class="pa-6" accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>
          比赛记录
          <v-icon color="purple" class="ml-4">mdi-diving-helmet</v-icon>
          <v-btn
            color="primary"
            @click="
              $router.push({
                name: 'Standings',
                path: `/standing`,
                query: {
                  type: 'team',
                },
              })
            "
            dark
            class="mb-2"
            max-width="80"
          >
            查看更多
          </v-btn>
          <template v-slot:actions>
            <v-icon color="primary"> $expand </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table :headers="headers2" :items="desserts2"> </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog v-model="Exitdialog" max-width="500px">
      <v-card>
        <v-toolbar flat color="blue-grey" dark>
          <v-toolbar-title>退队申请</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field filled label="Title" v-model="title"></v-text-field>
          <v-textarea filled label="Text" v-model="content"></v-textarea>
          <v-divider class="my-2"></v-divider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="exitSubmit()"> 发送 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" depressed @click="Exitdialog = false">
            取消
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-app>
</template>
  
  <script>
import {
  getTeamdetail,
  DriverExitapply,
  getDriverByTeam,
  getRaceRecordByTeam,
} from "@/plugins/http";
import { mapState } from "vuex";
export default {
  data() {
    return {
      panels1: 0,
      panels2: 0,
      isSnackbar: false,
      isSnackbarSuccess: null,
      snackbarTitle: "",
      saveloading: false,

      Exitdialog: false,
      search: "",
      title: "",
      content: "",
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "avatar",
        },
        { text: "姓名", value: "name" },
        { text: "email", value: "email" },
        { text: "", value: "actions", sortable: false },
      ],
      headers2: [
        {
          text: "赛季",
          align: "start",
          sortable: false,
          value: "season",
        },
        { text: "站点", value: "grand_prix" },
        { text: "参赛车手", value: "driver_name" },
        { text: "位次", value: "position" },
        { text: "分数", value: "points" },
        { text: "圈数", value: "laps" },
      ],
      desserts: [],
      desserts2: [],
      editedItem: {},
    };
  },
  computed: {
    ...mapState("Backuser", ["BackuserInfos"]),
  },
  methods: {
    exitTeamApply() {
      this.Exitdialog = true;
    },
    async exitSubmit() {
      const res = await DriverExitapply({
        title: this.title,
        content: this.content,
        type: "exitTeam",
      });
      console.log(res);

      if (res.data.Operation === "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.snackbarTitle = "操作成功";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.Exitdialog = false;
      } else {
        res.data.Operation === "repeat"
          ? (this.snackbarTitle = "请勿重复申请！")
          : (this.snackbarTitle = "操作失败");
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.Exitdialog = false;
      }
    },
    //这页面ediItem用作team info
    async initialize() {
      //随便传个吧，受不了了（user_email 有值就行)
      const res = await getTeamdetail({ user_email: "1@qq.com" });
      if (res.data.Operation == "success") {
        this.editedItem = res.data.teaminfo;
      }
      console.log(res);
      
      const Driverinfo = await getDriverByTeam();
      console.log(Driverinfo);

      if (Driverinfo.data.Operation === "success") {
        Driverinfo.data.driverinfo.forEach((element) => {
          this.desserts.push(element);
        });
      }
      const teamrecordinfo = await getRaceRecordByTeam();
      console.log(teamrecordinfo);

      if (teamrecordinfo.data.Operation === "success") {
        teamrecordinfo.data.teamreocrdinfo.forEach((element) => {
          this.desserts2.push(element);
        });
      }
    },
  },
  async mounted() {
    this.initialize();
  },
};
</script>
  
  <style lang="scss" scoped>
.v-icon {
  justify-content: flex-start;
}
.RaceInfo {
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  padding: 30px;
  .column-info {
    display: flex;
    column-gap: 20px;
  }
  .cards-title {
    font-size: 12px !important;
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 16px;
    white-space: nowrap;
    color: rgb(95, 99, 104);
    min-width: 250px !important;
  }
  .cards-content {
    font-size: 18px;
    font-weight: 300;
    word-break: break-word;
    word-wrap: break-word;
    color: rgb(32, 33, 36);
    flex-grow: 1;
  }
}
.basicinfo {
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  padding: 30px;
  .column-info {
    display: flex;
    column-gap: 20px;
  }
  .cards-title {
    font-size: 12px !important;
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 16px;
    white-space: nowrap;
    color: rgb(95, 99, 104);
    flex-grow: 0.5;
  }
  .cards-content {
    font-size: 18px;
    font-weight: 300;
    word-break: break-word;
    word-wrap: break-word;
    color: rgb(32, 33, 36);
    flex-grow: 1;
  }
}
</style>