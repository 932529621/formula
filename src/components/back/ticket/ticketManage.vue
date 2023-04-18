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
        item-key="name"
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
                        <v-expansion-panel-header
                          color="#4CAF50"
                          disable-icon-rotate
                        >
                          草地票
                          <template v-slot:actions>
                            <v-icon color="#8BC34A"> mdi-grass</v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-card-title>
                            <v-btn
                              color="primary"
                              dark
                              class="ma-4"
                              @click="
                                newTicket({
                                  ticket_prix: editedItem.nation_name,
                                  ticket_type: 'Grassland',
                                })
                              "
                            >
                              添加
                            </v-btn>
                           

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
                            item-key="name"
                          >
                            <template v-slot:item.actions="{ item }">
                              <v-icon
                                small
                                class="mr-2"
                                @click="editItem1(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon small @click="deleteItem(item)">
                                mdi-delete
                              </v-icon>
                            </template>
                          </v-data-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header
                          color="light-blue lighten-3"
                          disable-icon-rotate
                        >
                          看台票
                          <template v-slot:actions>
                            <v-icon color="light-blue darken-1">
                              mdi-seat-passenger</v-icon
                            >
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-card-title>
                            <v-btn
                              color="primary"
                              dark
                              class="ma-4"
                              @click="
                                newTicket({
                                  ticket_prix: editedItem.nation_name,
                                  ticket_type: 'Grandstand',
                                })
                              "
                            >
                              添加
                            </v-btn>
                            <v-text-field
                              v-model="search2"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>
                          </v-card-title>
                          <v-data-table
                            :headers="headers1"
                            :items="reserveDessert2"
                            class="elevation-1"
                            :search="search2"
                            loading="false"
                            loading-text="Loading... Please wait"
                            item-key="name"
                          >
                            <template v-slot:item.actions="{ item }">
                              <v-icon
                                small
                                class="mr-2"
                                @click="editItem1(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon small @click="deleteItem(item)">
                                mdi-delete
                              </v-icon>
                            </template>
                          </v-data-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header
                          color="yellow"
                          disable-icon-rotate
                        >
                          VIP
                          <template v-slot:actions>
                            <v-icon color="yellow darken-3">
                              mdi-chess-queen</v-icon
                            >
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-card-title>
                            <v-btn
                              color="primary"
                              dark
                              class="ma-4"
                              @click="
                                newTicket({
                                  ticket_prix: editedItem.nation_name,
                                  ticket_type: 'VIP',
                                })
                              "
                            >
                              添加
                            </v-btn>
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
                            :items="reserveDessert3"
                            class="elevation-1"
                            :search="search3"
                            loading="false"
                            loading-text="Loading... Please wait"
                            item-key="name"
                          >
                            <template v-slot:item.actions="{ item }">
                              <v-icon
                                small
                                class="mr-2"
                                @click="editItem1(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon small @click="deleteItem(item)">
                                mdi-delete
                              </v-icon>
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
                            v-model="editedItem1.ticket_prix"
                            label="站点"
                            disabled
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-combobox
                            v-model="editedItem1.ticket_section"
                            :items="sectionItems"
                            label="时间"
                          ></v-combobox>
                        </v-col>
                        <v-col>
                          <v-combobox
                            v-model="editedItem1.ticket_type"
                            :items="TypeItems"
                            label="类别"
                          ></v-combobox>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.ticket_name"
                            label="票名"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.ticket_surplus"
                            label="余量"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem1.ticket_price"
                            label="价格"
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
  </v-app>
</template>
    
    <script>
import {
  getcalendar,
  getsingleticketinfo,
  DeleteticketInfo,
  InsertOrUpdateTicketInfo,
} from "@/plugins/http";
export default {
  data: () => ({
    editTicketdialog: false,
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
    TypeItems: ["VIP", "Grandstand", "Grassland"],

    editedIndex1: -1,
    editedItem1: {},
    search1: "",
    desserts1: [],
    reserveDessert1: [],
    headers1: [
      {
        text: "类别",
        value: "ticket_type",
      },
      { text: "站点名", value: "ticket_prix" },
      { text: "票名", value: "ticket_name" },
      { text: "时间", value: "ticket_section" },
      { text: "价格", value: "ticket_price" },
      { text: "余量", value: "ticket_surplus" },
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
  },

  created() {
    this.initialize();
  },

  methods: {

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
    async editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      const res = await getsingleticketinfo({
        prixName: this.editedItem.nation_name,
      });
      console.log(res);
      for (const key in res.data) {
        switch (res.data[key].ticket_type) {
          case "VIP":
            this.desserts3.push(res.data[key]);
            break;
          case "Grassland":
            this.desserts1.push(res.data[key]);
            break;
          default:
            this.desserts2.push(res.data[key]);
            break;
        }
      }
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
    async InsertOrUpdateTicketInfo() {
      const res = await InsertOrUpdateTicketInfo(this.editedItem1);
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
    },

    save() {
      if (this.editedItem1.id) {
        console.log(this.editedItem1.type);

        this.InsertOrUpdateTicketInfo();
        switch (this.editedItem1.type) {
          case "VIP":
            Object.assign(this.desserts3[this.editedIndex], this.editedItem1);
            break;
          case "Grandstand":
            Object.assign(this.desserts2[this.editedIndex], this.editedItem1);
            break;
          default:
            Object.assign(this.desserts1[this.editedIndex], this.editedItem1);
            break;
        }
      } else {
        this.InsertOrUpdateTicketInfo();
        switch (this.editedItem1.type) {
          case "VIP":
            this.desserts3.push(this.editedItem1);
            break;
          case "Grandstand":
            this.desserts2.push(this.editedItem1);
            break;
          default:
            this.desserts1.push(this.editedItem1);
            break;
        }
      }
      this.editTicketdialog = false;
      this.editedItem1 = this.defaultItem;
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