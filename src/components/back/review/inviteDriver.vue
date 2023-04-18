<template>
  <div>
    <v-card class="rounded-lg" :elevation="8">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="reserveDessert"
        class="elevation-1"
        :search="search"
        loading="false"
        loading-text="Loading... Please wait"
        show-select
        v-model="selected"
        item-key="ID"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  v-show="false"
                >
                </v-btn>
                <div class="selectbox">
                  <v-checkbox
                    v-model="checkSelected"
                    label="全部"
                    value="ALL"
                    @click="filterReview({ className: 'ALL' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="待审核"
                    value="will check"
                    color="orange"
                    @click="filterReview({ className: 'will check' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="已通过"
                    value="pass"
                    color="green"
                    @click="filterReview({ className: 'pass' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="未通过"
                    value="fail"
                    color="red"
                    @click="filterReview({ className: 'fail' })"
                  ></v-checkbox>
                </div>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5"></span>
                </v-card-title>

                <v-card-text>
                  <v-container v-if="editedItem.type == 'inviteDriver'">
                    <v-card class="mx-auto ma-4" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Apply Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                申请车队
                              </p>
                              <p class="cards-content">
                                {{ editedItem.full_teamname }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">邮箱</p>
                              <p class="cards-content">
                                {{ editedItem.email }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                申请时间
                              </p>
                              <p class="cards-content">
                                {{ editedItem.create_time.split("T")[0] }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                申请类型
                              </p>
                              <p class="cards-content">
                                {{ editedItem.title }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                内容补充
                              </p>
                              <p class="cards-content">
                                {{ editedItem.content }}
                              </p>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto ma-4" min-width="90%" outlined>
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
                              <p class="font-weight-blod cards-title">地址：</p>
                              <p class="cards-content">
                                {{ editedItem.teaminfo.base }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                动力引擎:
                              </p>
                              <p class="cards-content">
                                {{ editedItem.teaminfo.power_unit }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                第一次参赛时间：
                              </p>
                              <p class="cards-content">
                                {{ editedItem.teaminfo.first_team_entry }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                冠军次数：
                              </p>
                              <p class="cards-content">
                                {{ editedItem.teaminfo.world_champion }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                车辆图片：
                              </p>
                              <v-img
                                max-width="500px"
                                :src="editedItem.teaminfo.car_pic"
                              ></v-img>
                            </div>
                            <v-divider></v-divider
                            ><v-btn
                              @click="
                                $router.push({
                                  name: 'Teamdetail',
                                  path: `/team/teamdetail`,
                                  query: {
                                    teamId: editedItem.teaminfo.id,
                                    teamName: editedItem.full_teamname,
                                  },
                                })
                              "
                              color="green"
                              text
                              >查看更多</v-btn
                            >
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto ma-4" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Race Info
                          </div>
                          <div class="basicinfo">
                            <v-data-table
                              :headers="teamraceheaders"
                              :items="editedItem.teamrace"
                              hide-default-footer
                              class="elevation-1"
                              loading="false"
                              loading-text="当前车队暂未参加任何赛事"
                            ></v-data-table>
                            <div style="display: flex; align-items: center">
                              <v-btn
                                color="green"
                                @click="
                                  $router.push({
                                    name: 'Standings',
                                    path: `/standing`,
                                    query: {
                                      type: 'team',
                                    },
                                  })
                                "
                                text
                                >查看更多</v-btn
                              ><small style="color: orange"
                                >*本页面最多展示近30场比赛*</small
                              >
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto ma-4" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Race Info
                          </div>
                          <div class="basicinfo">
                            <v-data-table
                              :headers="teampointheaders"
                              :items="editedItem.teampoint"
                              hide-default-footer
                              class="elevation-1"
                              loading="false"
                              loading-text="当前车队暂未参加任何比赛"
                            ></v-data-table>
                            <div style="display: flex; align-items: center">
                              <v-btn
                                color="green"
                                @click="
                                  $router.push({
                                    name: 'Standings',
                                    path: `/standing`,
                                    query: {
                                      type: 'team',
                                    },
                                  })
                                "
                                text
                                >查看更多</v-btn
                              ><small style="color: orange"
                                >*本页面最多展示近30场比赛*</small
                              >
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    :disabled="saveloading"
                    :loading="saveloading"
                    text
                    @click="UpdateReviewInfo({ state: 'fail' })"
                  >
                    不通过
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    :loading="saveloading"
                    :disabled="saveloading"
                    text
                    @click="UpdateReviewInfo({ state: 'pass' })"
                  >
                    通过
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.state`]="{ item }">
          <v-chip :color="getColor(item.state)" dark>
            {{ item.state }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            v-if="BackuserInfos.role_name === '车手'"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-eye
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
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
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">你确认要删除吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirm"
            >删除</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
        
        <script>
import { mapState } from "vuex";
import {
  getreviewinfo,
  DeleteReview,
  TeamExitreview,
  addTeaminfo,
  DeleteDriverAcceptEnter,
  getteamraceinfo,
  getteampointinfo,
  getTeamdetail,
  passedriverDetailTeam
} from "@/plugins/http";
export default {
  data() {
    return {
      isSnackbar: false,
      isSnackbarSuccess: null,
      saveloading: false,

      checkSelected: "ALL",

      dialog: false,
      dialogDelete: false,
      search: "",
      selected: [],
      roleInfo: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "用户ID", value: "user_id" },
        { text: "用户名", value: "username" },
        { text: "邀请车队", value: "full_teamname" },
        { text: "状态", value: "state" },
        { text: "类型", value: "type" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      teampointheaders: [
        {
          text: "赛季",
          align: "start",
          value: "season",
        },
        { text: "车队", value: "team" },
        { text: "当年赛季位次", value: "total_position" },
        { text: "当年赛季总积分", value: "total_points" },
      ],
      teamraceheaders: [
        {
          text: "赛季",
          align: "start",
          value: "season",
        },
        { text: "车队", value: "team" },
        { text: "站点", value: "grand_prix" },
        { text: "积分", value: "points" },
        { text: "比赛时间", value: "date" },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        user_id: "",
        username: "",
        state: "",
        user_email: "",
        phone: "",
        address: "",
        introduction: "",
        type: "",
        teaminfo: {},
        teamrace: [],
        teampoint: [],
      },
      defaultItem: {
        id: "",
        user_id: "",
        username: "",
        state: "",
        user_email: "",
        phone: "",
        address: "",
        introduction: "",
        type: "",
      },
      reserveDessert: [],
    };
  },

  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true ? "操作成功" : "操作失败";
    },
    ...mapState("Backuser", ["BackuserInfos"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async mounted() {
    this.initialize();
    const Review = await getreviewinfo();
    console.log(Review);
  },

  methods: {
    async initialize() {
      const Review = await getreviewinfo();
      if (Review.status === 200) {
        for (let key of Review.data.reviewinfo) {
          if (key.type === "inviteDriver") this.desserts.push(key);
        }
        this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      }
    },

    async UpdateReviewInfo(states) {
      this.saveloading = true;
      if (this.editedItem.type == "inviteDriver") {
        if (states.state == "pass") {
          const [driverres, addteam, deletedetail] = await Promise.all(
            [
              TeamExitreview({ state: states.state, id: this.editedItem.id }),
              addTeaminfo({
                email: this.editedItem.username,
                team: this.editedItem.full_teamname,
              }),
              passedriverDetailTeam({
                email: this.editedItem.username,
                team: this.editedItem.full_teamname,
              }),
              DeleteDriverAcceptEnter({
                email: this.editedItem.username,
                team: this.editedItem.full_teamname,
                type:'inviteDriver'
              }),
            ].map((v) => v.catch((e) => console.log(e)))
          );
          if (
            driverres.data.Operation == "success" &&
            addteam.data.Operation == "success"
          ) {
            this.isSnackbarSuccess = true;
            this.isSnackbar = true;
            this.desserts[this.editedIndex].state = states.state;
            this.reserveDessert[this.editedIndex].state = states.state;
            setTimeout(() => {
              this.isSnackbar = false;
              this.saveloading = false;
              this.close();
            }, 2500);
          } else {
            this.isSnackbarSuccess = false;
            this.isSnackbar = true;
            setTimeout(() => {
              this.isSnackbar = false;
              this.saveloading = false;
              this.close();
            }, 2500);
          }
        } else {
          const driverres = await TeamExitreview({
            state: states.state,
            id: this.editedItem.id,
          });
          if (driverres.data.Operation == "success") {
            this.isSnackbarSuccess = true;
            this.isSnackbar = true;
            this.desserts[this.editedIndex].state = states.state;
            this.reserveDessert[this.editedIndex].state = states.state;
            setTimeout(() => {
              this.isSnackbar = false;
              this.saveloading = false;
              this.close();
            }, 2500);
          } else {
            this.isSnackbarSuccess = false;
            this.isSnackbar = true;
            setTimeout(() => {
              this.isSnackbar = false;
              this.saveloading = false;
              this.close();
            }, 2500);
          }
        }
      }
    },

    async DeleteReview() {
      this.saveloading = true;
      const res = await DeleteReview({
        id: this.editedItem.id,
      });
      this.closeDelete();
      if (res.data.Operation == "success") {
        this.desserts.splice(this.editedIndex, 1);
        this.reserveDessert.splice(this.editedIndex, 1);
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.close();
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.close();
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
      }
    },

    filterReview(a) {
      console.log(a.className);
      this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      if (a.className == "ALL") {
        this.reserveDessert = this.desserts.filter((item) => {
          return item;
        });
      } else {
        this.reserveDessert = this.desserts.filter((item) => {
          return item.state == a.className;
        });
      }
    },

    getColor(state) {
      if (state == "fail") return "red";
      else if (state == "will check") return "orange";
      else return "green";
    },

    async editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.desserts.findIndex((item) => {
        return item.id == this.editedItem.id;
      });
      const res1 = await getTeamdetail();
      const res2 = await getteamraceinfo({
        team: this.editedItem.full_teamname,
      });
      const res3 = await getteampointinfo({
        team: this.editedItem.full_teamname,
      });
      console.log(res1);
      console.log(res2);
      console.log(res3);
      const a = res1.data.teaminfo.filter((i) => {
        return i.email === this.editedItem.email;
      });
      this.editedItem.teaminfo = a[0];
      this.editedItem.teamrace = res2.data.teamrace;
      this.editedItem.teampoint = res3.data.teampoint;

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.desserts.findIndex((item) => {
        return item.id == this.editedItem.id;
      });
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.DeleteReview();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
        
    <style scoped lang="scss">
.selectbox {
  display: flex;
  padding: 5px;
  column-gap: 10px;
}
.v-messages {
  min-height: none !important;
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