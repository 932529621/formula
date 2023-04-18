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
        :items="desserts"
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
            <v-dialog v-model="dialog" max-width="650px">
              <v-card>
                <v-card-title> </v-card-title>

                <v-card-text>
                  <v-container>
                    <span class="text-h5 mt-4">体能成绩</span>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.reaction"
                          label="反应力"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stamina"
                          label="能耐力"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem['HL capacity']"
                          label="心肺功能"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem['neck strength']"
                          label="颈部力量"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <span class="text-h5 mt-4">技巧测试</span>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.break"
                          label="刹车技巧"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.turn"
                          label="转向技巧"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.power"
                          label="油门技巧"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.gear"
                          label="换挡技巧"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.overtake"
                          label="超车技巧"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.antiskid"
                          label="防滑技巧"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.emergency"
                          label="应急能力"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stop"
                          label="停车技巧"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="['pass', 'fail']"
                          label="状态"
                          v-model="editedItem.status"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    取消
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    保存
                  </v-btn>
                  <v-btn color="light-green accent-4" @click="autoComplete()"
                    >生成</v-btn
                  >
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon v-if="false" small @click="deleteItem(item)"> mdi-delete </v-icon>
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
import { getDriverTrain, Deletetrain, UpdateDriverTrain } from "@/plugins/http";
export default {
  data: () => ({
    search: "",
    selected: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "车手",
        value: "email",
      },
      { text: "反应力", value: "reaction" },
      { text: "能耐力", value: "stamina" },
      { text: "心肺功能", value: "HL capacity" },
      { text: "颈部力量", value: "neck strength" },
      { text: "刹车技巧", value: "break" },
      { text: "转向技巧", value: "turn" },
      { text: "油门技巧", value: "power" },
      { text: "换挡技巧", value: "gear" },
      { text: "超车技巧", value: "overtake" },
      { text: "防滑技巧", value: "antiskid" },
      { text: "应急能力", value: "emergency" },
      { text: "状态", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},

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
    autoComplete(){
      this.editedItem.reaction=100;
      this.editedItem.stamina=89;
      this.editedItem['HL capacity']=98;
      this.editedItem['neck strength']=78;
      this.editedItem.break='88,79,77';
      this.editedItem.turn='88,99,97';
      this.editedItem.power='99,66,87';
      this.editedItem.gear='80,77,80';
      this.editedItem.overtake='67,65,77';
      this.editedItem.antiskid='88,79,99';
      this.editedItem.emergency='88,90,77';
      this.editedItem.stop='68,79,77';
      this.editedItem.status='pass';
    },
    async initialize() {
      const res = await getDriverTrain();
      console.log(res);
      this.desserts = res.data.trainfo;
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const res = await Deletetrain({ id: this.editedItem.id });
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
      this.desserts.splice(this.editedIndex, 1);
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
    async UpdateDriverTrain() {
      const res = await UpdateDriverTrain(this.editedItem);
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
      if (this.editedIndex > -1) {
        this.UpdateDriverTrain();
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.UpdateDriverTrain();
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    getColor(status) {
      if (status == "fail") return "red";
      else return "green";
    },
  },
};
</script>