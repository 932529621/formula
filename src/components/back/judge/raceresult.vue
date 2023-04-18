<template>
  <v-app>
    <v-card>
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
        item-key="id"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog
              v-model="dialog"
              max-width="1200px"
              style="min-height: 800px !important"
            >
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
                    label="待举办"
                    value="holding"
                    color="orange"
                    @click="filterReview({ className: 'holding' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="已举办"
                    value="held"
                    color="red"
                    @click="filterReview({ className: 'held' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="未举办"
                    value="will"
                    color="green"
                    @click="filterReview({ className: 'will' })"
                  ></v-checkbox>
                </div>
              </template>
              <v-card>
                <v-card-title> </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-expansion-panels v-model="panel" multiple focusable>
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          参赛名单
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-card-title>
                            <div class="selectbox">
                              <v-checkbox
                                v-model="checkSelected1"
                                label="全部"
                                value="ALL"
                                @click="filterRace({ className: 'ALL' })"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="checkSelected1"
                                label="正赛"
                                value="Race"
                                color="orange"
                                @click="filterRace({ className: 'Race' })"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="checkSelected1"
                                label="排位赛"
                                value="Qualify"
                                color="red"
                                @click="filterRace({ className: 'Qualify' })"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="checkSelected1"
                                label="第一节练习赛"
                                value="practice1"
                                color="green"
                                @click="filterRace({ className: 'practice1' })"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="checkSelected1"
                                label="第二节练习赛"
                                value="practice2"
                                color="green"
                                @click="filterRace({ className: 'practice2' })"
                              ></v-checkbox>
                              <v-checkbox
                                v-model="checkSelected1"
                                label="第三节练习赛"
                                value="practice3"
                                color="green"
                                @click="filterRace({ className: 'practice3' })"
                              ></v-checkbox>
                            </div>
                            <v-text-field
                              v-model="search1"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>
                          </v-card-title>
                          <v-data-table
                            :headers="headers1"
                            :items="reserveDessert1"
                            class="elevation-1"
                            :search="search1"
                            loading="false"
                            loading-text="Loading... Please wait"
                            item-key="id"
                          >
                            <template v-slot:item.avatar="{ item }">
                              <v-avatar>
                                <img :src="item.avatar" />
                              </v-avatar>
                            </template>
                            <template v-slot:[`item.status`]="{ item }">
                              <v-chip :color="getColor1(item.status)" dark>
                                {{ item.status }}
                              </v-chip>
                            </template>
                            <template v-slot:item.actions="{ item }">
                              <v-icon
                                small
                                class="mr-2"
                                @click="editItem1(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <!-- <v-icon small @click="deleteItem(item)">
                                mdi-delete
                              </v-icon> -->
                            </template>
                          </v-data-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    取消
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">你确定要删除吗?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >取消</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteItemConfirm"
                    >确定</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="editTicketdialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-form ref="cardform">
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.nation_name"
                            label="站点"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.season"
                            disabled
                            label="赛季"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.type"
                            disabled
                            label="类别"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.prix_fullname"
                            label="站点全名"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.name"
                            label="车手"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.team"
                            label="车队"
                            disabled
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.position"
                            label="排名"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.laps"
                            label="圈数"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row
                        v-if="
                          editedItem1.type !== 'Race' &&
                          editedItem1.type !== 'Qualify'
                        "
                      >
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.record"
                            label="最快单圈速度"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.GAP"
                            label="与第一名差距"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row v-if="editedItem1.type === 'Qualify'">
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.Q1"
                            label="Q1"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.Q2"
                            label="Q2"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.Q3"
                            label="Q3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row v-if="editedItem1.type === 'Race'">
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.points"
                            label="积分"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1['Time_Retired']"
                            label="最佳单圈圈速"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="editTicketdialog = false"
                  >
                    取消
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save()">
                    保存
                  </v-btn>
                  <v-btn
                    color="light-green accent-4"
                    @click="autoComplete()"
                    >生成</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.prix_status`]="{ item }">
          <v-chip :color="getColor(item.prix_status)" dark>
            {{ item.prix_status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-eye </v-icon>
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
    <v-snackbar
      :timeout="2500"
      :value="isSnackbars"
      fixed
      bottom
      tile
      :color="isSnackbarSuccess ? 'success' : 'red'"
      ref="snackbar"
    >
      {{ snackbarTitles }}
    </v-snackbar>
  </v-app>
</template>
    
    <script>
import {
  getcalendar,
  DeleteticketInfo,
  getscheduleResult,
  InsertscheduleResult,
} from "@/plugins/http";
export default {
  data: () => ({
    editTicketdialog: false,
    checkSelected1: "practice1",
    dialog: false,
    dialogDelete: false,
    panel: [0, 1, 2],
    headers: [
      {
        text: "站数",
        value: "round",
      },
      { text: "站点名", value: "nation_name" },
      { text: "赛道名", value: "race_name" },
      { text: "比赛时间", value: "race_date" },
      { text: "状态", value: "prix_status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    reserveDessert: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    selected: null,
    checkSelected: "ALL",
    search: "",
    selected: "",
    sectionItems: ["Friday", "Saturday", "Sunday"],
    TypeItems: ["pratice1", "pratice2", "pratice3"],

    editedIndex1: -1,
    editedItem1: {
      Time_Retired:'',
      laps:'',
      position:''
    },
    search1: "",
    desserts1: [],
    reserveDessert1: [],
    headers1: [
      {
        text: "车手",
        value: "avatar",
      },
      { text: "车手邮箱", value: "driver_email" },
      { text: "车队", value: "team" },
      { text: "类型", value: "type" },
      { text: "状态", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    desserts3: [],
    desserts2: [],
    search2: "",
    search3: "",

    reserveDessert3: [],
    reserveDessert2: [],

    Preloading: false,
    isSnackbar: false,
    isSnackbarSuccess: false,


    isSnackbars:false,
    snackbarTitles:'本站赛事已结束',
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    snackbarTitle() {
      return this.isSnackbarSuccess === true ? "操作成功" : "操作失败";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    "editedItem1.position"(val) {
      if (val) {
        this.editedItem1.points = 21 - val * 2;
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    autoComplete(){
      this.editedItem1.position='1'
      this.editedItem1.laps='67'
      this.editedItem1.Time_Retired="1:32.227"
    },
    async initialize() {
      const res = await getcalendar();
      console.log(res);
      if (res.status === 200) {
        res.data.schedules.forEach((item, index) => {
          this.desserts.push(item);
        });
      }
      this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      // if (res.data.Operation == "success") {
      //   this.isSnackbarSuccess = true;
      //   this.isSnackbar = true;
      //   setTimeout(() => {
      //     this.isSnackbar = false;
      //     this.saveloading = false;
      //   }, 2500);
      // } else {
      //   this.isSnackbarSuccess = false;
      //   this.isSnackbar = true;
      //   setTimeout(() => {
      //     this.isSnackbar = false;
      //     this.saveloading = false;
      //   }, 2500);
      // }
    },
    getColor(state) {
      if (state == "held") return "red";
      else if (state == "holding") return "orange";
      else return "green";
    },
    getColor1(state) {
      if (state === "待录入") return "red";
      else return "green";
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
          return item.prix_status == a.className;
        });
      }
    },
    filterRace(a) {
      console.log(a.className);

      switch (a.className) {
        case "Race":
          this.reserveDessert1 = [...this.desserts3];
          break;
        case "Qualify":
          this.reserveDessert1 = [...this.desserts2];

          break;
        case "ALL":
          this.reserveDessert1 = [
            ...this.desserts1,
            ...this.desserts2,
            ...this.desserts3,
          ];
          break;
        case "practice1":
          this.reserveDessert1 = this.desserts1.filter((i) => {
            return i.type === "practice1";
          });
          break;
        case "practice2":
          this.reserveDessert1 = this.desserts1.filter((i) => {
            return i.type === "practice2";
          });
          break;
        default:
          this.reserveDessert1 = this.desserts1.filter((i) => {
            return i.type === "practice3";
          });
          break;
      }
    },
    async editItem(item) {
    
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      const res = await getscheduleResult({
        schedule_id: this.editedItem.id,
      });
      console.log(res);
      console.log(this.editedItem.prix_status);
      
      if(this.editedItem.prix_status==='held'){
        this.isSnackbarSuccess = false;
        this.isSnackbars = true;
        this.snackbarTitles='本站赛事已结束'
        setTimeout(() => {
          this.isSnackbars = false;
        }, 2500);
          return false;
      }
      res.data.schedule.forEach((item, index) => {
        if (this.editedItem.id === item.schedule_id) {
          switch (item.type) {
            case "Race":
              this.desserts3.push(item);
              break;
            case "Qualify":
              this.desserts2.push(item);
              break;
            default:
              this.desserts1.push(item);
              break;
          }
        }
      });
      this.reserveDessert1 = JSON.parse(JSON.stringify(this.desserts1));
      this.reserveDessert2 = JSON.parse(JSON.stringify(this.desserts2));
      this.reserveDessert3 = JSON.parse(JSON.stringify(this.desserts3));
      this.dialog = true;
    },

    editItem1(item) {
      this.editedItem1 = Object.assign({}, item);
      this.editTicketdialog = true;
    },

    newTicket(preObj) {
      this.editedItem1 = preObj;
      this.editTicketdialog = true;
    },

    deleteItem(item, index) {
      this.editedItem1 = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      console.log(this.editedItem1.id);

      const res = await DeleteticketInfo({
        ticket_id: this.editedItem1.ticket_id,
      });
      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
        }, 2500);
      }
      this.closeDelete();
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
    async InsertscheduleResult() {
      let obj = {};
      switch (this.editedItem1.type) {
        case "Race":
          obj = {
            season: this.editedItem.season,
            grand_prix: this.editedItem.nation_name,
            position: this.editedItem1.position,
            points: this.editedItem1.points,
            driver_name: this.editedItem1.name,
            team: this.editedItem1.team,
            Time_Retired: this.editedItem1.Time_Retired,
            laps: this.editedItem1.laps,
            title: this.editedItem.prix_fullname,
            Insert: "single_race",
          };
          break;
        case "Qualify":
          obj = {
            season: this.editedItem.season,
            grand_prix: this.editedItem.nation_name,
            position: this.editedItem1.position,
            driver_name: this.editedItem1.name,
            team: this.editedItem1.team,
            laps: this.editedItem1.laps,
            Q1: this.editedItem1.Q1,
            Q2: this.editedItem1.Q2,
            Q3: this.editedItem1.Q3,
            title: this.editedItem.prix_fullname,
            Insert: "single_qualifying",
          };
          break;
        default:
          obj = {
            season: this.editedItem.season,
            grand_prix: this.editedItem.nation_name,
            position: this.editedItem1.position,
            driver_name: this.editedItem1.name,
            laps: this.editedItem1.laps,
            team: this.editedItem1.team,
            GAP: this.editedItem1.GAP,
            record: this.editedItem1.record,
            type: this.editedItem1.type,
            title: this.editedItem.prix_fullname,
            Insert: "single_pratic",
          };
          break;
      }

      obj["driver_email"] = this.editedItem1.driver_email;
      obj["driver_points"] = this.editedItem1.driver_points;
      obj["licenseScore"] = this.editedItem1.licenseScore;
      obj["team_points"] = this.editedItem1.team_points;
      obj["schedule_id"] = this.editedItem1.id;

      const res = await InsertscheduleResult(obj);
      console.log(res);

      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.profiledialog = false;
        }, 2500);
      }
      this.editTicketdialog = false;
      this.editedItem1 = this.defaultItem;
    },

    save() {
      console.log(this.editedItem1.type);

      this.InsertscheduleResult();
      switch (this.editedItem1.type) {
        case "Race":
          this.desserts3.push(item);
          break;
        case "Qualify":
          this.desserts2.push(item);
          break;
        default:
          this.desserts1.push(item);
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.selectbox {
  display: flex;
  padding: 5px;
  column-gap: 10px;
}
.row {
  margin: 0 !important;
}
</style>