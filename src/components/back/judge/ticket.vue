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
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  v-if="BackuserInfos.role_name === '管理员'"
                >
                  添加
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
                    label="待支付"
                    value="wait pay"
                    color="red"
                    @click="filterReview({ className: 'wait pay' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="已支付"
                    value="paid"
                    color="green"
                    @click="filterReview({ className: 'paid' })"
                  ></v-checkbox>
                </div>
              </template>
              <v-card>
                <v-card-title> </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-row><span class="text-h5">罚单信息</span></v-row>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          :items="driverEmail"
                          label="被罚车手"
                          v-model="editedItem.email"
                          required
                          :disabled="BackuserInfos.role_name !== '管理员'"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.ticket_name"
                          label="罚单名"
                          :disabled="BackuserInfos.role_name !== '管理员'"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.ticket_content"
                          :disabled="BackuserInfos.role_name !== '管理员'"
                          label="罚款内容"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.ticket_point"
                          label="罚款积分"
                          :disabled="BackuserInfos.role_name !== '管理员'"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.ticket_money"
                          label="罚款金额"
                          :disabled="BackuserInfos.role_name !== '管理员'"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.reviewer"
                          disabled
                          label="开单人"
                        ></v-text-field>
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
                    :loding="Preloading"
                    v-if="
                      editedIndex === -1 && BackuserInfos.role_name === '管理员'
                    "
                    text
                    @click="save"
                  >
                    保存
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :loding="Preloading"
                    v-if="
                      editedIndex !== -1 && BackuserInfos.role_name === '管理员'
                    "
                    text
                    @click="ticketback()"
                  >
                    撤销处罚
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    :loding="Preloading"
                    v-if="BackuserInfos.role_name === '车手'"
                    text
                    @click="GoToPay()"
                  >
                    前去支付罚款
                  </v-btn>
                  <v-btn
                    color="light-green accent-4"
                    v-if="BackuserInfos.role_name === '管理员' "
                    @click="autoComplete()"
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
          <v-icon
            v-if="BackuserInfos.role_name === '管理员'"
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
  getsysticket,
  getDriverDetail,
  insertsysticket,
  deletesysticket,
  updateDriverLicensePoint,
  GoToPay,
} from "@/plugins/http";

import { mapState } from "vuex";
export default {
  data: () => ({
    Preloading: false,
    isSnackbar: false,
    isSnackbarSuccess: false,

    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "开单人", value: "reviewer" },
      { text: "被罚车手", value: "email" },
      { text: "罚单名", value: "ticket_name" },
      { text: "罚单内容", value: "ticket_content" },
      { text: "罚单积分", value: "ticket_point" },
      { text: "罚单金额", value: "ticket_money" },
      { text: "状态", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    selected: null,

    desserts: [],
    reserveDessert: [],
    editedIndex: -1,
    editedItem: {
      email:'',
      ticket_money:'',
      ticket_name:'',
      ticket_content:'',
      ticket_point:'',
    },
    defaultItem: {},
    checkSelected: "ALL",
    driverEmail: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
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
    "editedItem.email"(val) {
      this.editedItem.reviewer = this.BackuserInfos.email;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    autoComplete(){
      this.editedItem.email="932529621@qq.com"
      this.editedItem.ticket_content="在维修区未按规定车速行驶"
      this.editedItem.ticket_money="200"
      this.editedItem.ticket_name="维修区超速"
      this.editedItem.ticket_point='1'
    },
    async initialize() {
      const result = await getDriverDetail();
      console.log(result);
      result.data.DriverDetail.forEach((i) => {
        this.driverEmail.push(i.email);
      });

      const res = await getsysticket();
      this.desserts = res.data.ticketinfo.filter((i) => {
        return i.email === this.BackuserInfos.email;
      });
      this.reserveDessert = this.desserts;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.reviewer = this.BackuserInfos.email;

      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const res = await deletesysticket({ id: this.editedItem.id });
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

    async insertsysticket() {
      const result = await updateDriverLicensePoint({
        email: this.editedItem.email,
        licenseScore: this.editedItem.ticket_point,
      });
      const res = await insertsysticket(this.editedItem);
      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
          this.close();
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.close();
          this.Preloading = false;
        }, 2500);
      }
    },

    async GoToPay() {
      this.saveloading = true;
      const obj = {
        order_id: this.editedItem.id,
        price: this.editedItem.ticket_money,
        OrderName: this.editedItem.ticket_name,
        OrderIntro: this.editedItem.ticket_content,
        returnUrl: `http://localhost:8081/#/payment?id=${this.editedItem.id}&type=sysTicket`,
      };
      window.open(obj.returnUrl);
      // const res = await GoToPay(obj);
      // if (res.data.Operation == "success") {
      //   window.open(res.data.result);
      //   this.hasCreatedOrder = true;
      // }
    },

    save() {
      if (this.editedIndex > -1) {
        this.insertsysticket();
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.insertsysticket();
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    getColor(state) {
      if (state == "wait pay") return "red";
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
          return item.status == a.className;
        });
      }
    },
    async ticketback() {
      const result = await updateDriverLicensePoint({
        email: this.editedItem.email,
        licenseScore: -this.editedItem.ticket_point,
      });
      this.deleteItemConfirm();
      this.close();
    },

    async profile1img() {
      if (!this.nation_map_file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.nation_map_file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.editedItem.nation_map = res.data.href;
    },
    async profile2img() {
      if (!this.nation_map_circuit_file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.nation_map_circuit_file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.editedItem.nation_map_circuit = res.data.href;
    },
    async profile3img() {
      if (!this.nation_banner_pic_file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.nation_banner_pic_file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.editedItem.nation_banner_pic = res.data.href;
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
