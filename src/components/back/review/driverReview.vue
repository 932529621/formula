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
                  <!-- <span class="text-h5">Driver Details</span> -->
                </v-card-title>

                <v-card-text>
                  <v-container v-if="editedItem.type == 'enroll'">
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Basic Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">姓名</p>
                              <p class="cards-content">
                                {{ editedItem.VertifyName }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">性别</p>
                              <p class="cards-content">
                                {{ editedItem.gender }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">生日</p>
                              <p class="cards-content">
                                {{ editedItem.birthday }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                身份证号
                              </p>
                              <p class="cards-content">
                                {{ editedItem.VertifyID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                          </div>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="80">
                          <v-img :src="editedItem.avatar"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto ma-4" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Contact Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                联系电话
                              </p>
                              <p class="cards-content">
                                {{ editedItem.phone }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">地址</p>
                              <p class="cards-content">
                                {{ editedItem.address }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">Email</p>
                              <p class="cards-content">
                                {{ editedItem.user_email }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                个人简介
                              </p>
                              <p class="cards-content">
                                {{ editedItem.introduction }}
                              </p>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            License Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">驾照名</p>
                              <p class="cards-content">
                                {{ editedItem.LicenseName }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                驾照号码
                              </p>
                              <p class="cards-content">
                                {{ editedItem.LicenseID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="editedItem.licenseimageUrl"
                                class="cards-content"
                              ></v-img>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Physical Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                体检单号
                              </p>
                              <p class="cards-content">
                                {{ editedItem.LicenseID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="editedItem.physicalimageUrl"
                                class="cards-content"
                              ></v-img>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-container>
                
                  <!-- <v-container v-if="editedItem.type == 'enterTeam'">
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Basic Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">姓名</p>
                              <p class="cards-content">
                                {{ editedItem.VertifyName }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">性别</p>
                              <p class="cards-content">
                                {{ editedItem.gender }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">生日</p>
                              <p class="cards-content">
                                {{ editedItem.birthday }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                身份证号
                              </p>
                              <p class="cards-content">
                                {{ editedItem.VertifyID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                          </div>
                        </v-list-item-content>
                        <v-list-item-avatar tile size="80">
                          <v-img :src="editedItem.avatar"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto ma-4" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Contact Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                联系电话
                              </p>
                              <p class="cards-content">
                                {{ editedItem.phone }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">地址</p>
                              <p class="cards-content">
                                {{ editedItem.address }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">Email</p>
                              <p class="cards-content">
                                {{ editedItem.user_email }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                个人简介
                              </p>
                              <p class="cards-content">
                                {{ editedItem.introduction }}
                              </p>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            License Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">驾照名</p>
                              <p class="cards-content">
                                {{ editedItem.LicenseName }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                驾照号码
                              </p>
                              <p class="cards-content">
                                {{ editedItem.LicenseID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="editedItem.licenseimageUrl"
                                class="cards-content"
                              ></v-img>
                            </div>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card class="mx-auto" min-width="90%" outlined>
                      <v-list-item>
                        <v-list-item-content>
                          <div
                            class="text-overline mb-4"
                            style="font-size: 1.4rem !important"
                          >
                            Physical Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                体检单号
                              </p>
                              <p class="cards-content">
                                {{ editedItem.LicenseID }}
                              </p>
                            </div>
                            <v-divider></v-divider>
                            <div class="column-info">
                              <v-img
                                :src="editedItem.physicalimageUrl"
                                class="cards-content"
                              ></v-img>
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
                            Apply Info
                          </div>
                          <div class="basicinfo">
                            <div class="column-info">
                              <p class="font-weight-blod cards-title">
                                入队申请
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
                  </v-container> -->
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    :disabled="saveloading || editedItem.state !=='will check'"
                    :loading="saveloading"
                    text
                    @click="UpdateReviewInfo({ state: 'fail' })"
                  >
                    不通过
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    :disabled="saveloading || editedItem.state !=='will check'"
                    :loading="saveloading"
                    text
                    @click="UpdateReviewInfo({ state: 'pass' })"
                  >
                    通过
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >你确定要删除吗?</v-card-title
                >
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
        <template v-slot:[`item.state`]="{ item }">
          <v-chip :color="getColor(item.state)" dark>
            {{ item.state }}
          </v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-eye </v-icon>
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
  </div>
</template>
    
    <script>
import {
  getreviewinfo,
  UpdateReviewInfo,
  InsertOrUpdateBackuser,
  addServeEmailinfo,
  addOrderinfo,
  addOrUpdateDriverdetail,
  DeleteReview,
} from "@/plugins/http";
import { mapState } from "vuex";
import { nanoid } from "nanoid";
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
        { text: "状态", value: "state" },
        { text: "类型", value: "type" },
        { text: "Actions", value: "actions", sortable: false },
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
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
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
      const Review = await getreviewinfo();
      
      if (Review.status === 200) {
        for (let key of Review.data.reviewinfo) {
          this.desserts.push(key);
        }
        this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      }
    },
    //enroll
    //pass - 更改 user(license) 增加user(id) chatinfo(email) sys_order(price intro) driver_detail
    //fail - 更改 user(license = null) 增加 chatinfo(email)
    //exitTeam
    //pass - 更改  chatinfo(email)  driver_detail driver_apply
    //fail - 更改 user(license = null) 增加 chatinfo(email)
    async UpdateReviewInfo(states) {
      this.saveloading = true;
      if (this.editedItem.type == "enroll") {
        const obj = {
          state: states.state,
          user_id: this.editedItem.user_id,
          LicenseID: this.editedItem.LicenseID,
          LicenseName: this.editedItem.LicenseName,
          VertifyName: this.editedItem.VertifyName,
          VertifyID: this.editedItem.VertifyID,
        };
        if (states.state == "pass") {
          const pwd = nanoid(11);
          const insetObj = {
            email: this.editedItem.user_email,
            password: pwd,
            avatar: this.editedItem.avatar,
            role_name: "wait Driver",
          };
          const addObj = {
            title: "Welcome to Formula One !",
            receiver_id: this.editedItem.user_email,
            type: "mail",
            content: ` Hi!恭喜你通过审核，成为一名正式的赛车手，请在1-3个工作日内登录车手账号完成培训费用支付，
            并完成训练。你的车手账号：${this.editedItem.user_email} 密码:${pwd}`,
          };
          const addOrderObj = {
            user_email: this.editedItem.user_email,
            type: "车手注册",
            order_name: "车手注册费用订单",
            order_intro: "Welcome to Formula One !",
            price: 12888,
          };
          const adddriverdetail = {
            email: this.editedItem.user_email,
            name: this.editedItem.VertifyName,
            driver_biography: this.editedItem.introduction,
            birth: this.editedItem.birthday,
          };

          const [updateRes, InsertRes, addRes, addOrderres] = await Promise.all(
            [
              UpdateReviewInfo(obj),
              InsertOrUpdateBackuser(insetObj),
              addServeEmailinfo(addObj),
              addOrderinfo(addOrderObj),
              addOrUpdateDriverdetail(adddriverdetail),
            ].map((v) => v.catch((e) => console.log(e)))
          );
          if (
            updateRes.data.Operation == "success" &&
            InsertRes.data.Operation == "success" &&
            addRes.data.Operation == "success" &&
            addOrderres.data.Operation == "success"
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
          const addObj = {
            title: "You fail in the review !",
            receiver_id: this.editedItem.user_email,
            type: "mail",
            content: ` Sorry! 很遗憾，你没有通过车手审核，请你不要气馁，检查好个人信息与资格证件是否正确后，在个人中心->Apply —> Driver Review中重新提交新的信息。`,
          };
          const [updateRes, addRes,DeleteRe] = await Promise.all(
            [UpdateReviewInfo(obj), addServeEmailinfo(addObj),DeleteReview({id:this.editedItem.id})].map((v) =>
              v.catch((e) => console.log(e))
            )
          );
          console.log(updateRes);
          console.log(obj);
          console.log(DeleteRe);
          
          if (
            updateRes.data.Operation == "success" &&
            addRes.data.Operation == "success"
          ) {
            this.isSnackbarSuccess = true;
            this.isSnackbar = true;
            console.log(this.desserts[this.editedIndex]);
            this.desserts[this.editedIndex].state = states.state;
            this.reserveDessert[this.editedIndex].state = states.state;
            setTimeout(() => {
              this.saveloading = false;
              this.isSnackbar = false;
              this.close();
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2500);
            }, 2500);
          } else {
            this.isSnackbarSuccess = false;
            this.isSnackbar = true;
            setTimeout(() => {
              this.saveloading = false;
              this.isSnackbar = false;
              this.close();
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2500);
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

    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.desserts.findIndex((item) => {
        return item.LicenseID == this.editedItem.LicenseID;
      });
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.desserts.findIndex((item) => {
        return item.LicenseID == this.editedItem.LicenseID;
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