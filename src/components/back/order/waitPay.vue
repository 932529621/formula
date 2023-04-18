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
            <v-dialog v-model="dialog" max-width="700px">
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
                    @click="filterOrder({ className: 'ALL' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="待支付"
                    value="WaitPay"
                    color="red"
                    @click="filterOrder({ className: 'waitPay' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="已支付"
                    value="Paid"
                    color="green"
                    @click="filterOrder({ className: 'paid' })"
                  ></v-checkbox>
                </div>
              </template>
              <v-card>
                <div class="pa-4 text-center" v-show="hasCreatedOrder">
                  <v-img
                    class="mb-4"
                    contain
                    height="128"
                    src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
                  ></v-img>
                  <h3 class="text-h5 font-weight-light mb-2">订单创建成功！</h3>
                  <span class="text-caption grey--text"
                    >请在24小时内完成付款!</span
                  >
                </div>
                <div class="Notice-card" v-show="!hasCreatedOrder">
                  <v-card-title class="text-h7 font-weight-Medium">
                    我已经了解中国汽车摩托车运动联合会就参赛选手管理的相关规定，承诺提供的参赛履历真实，并遵守本规定:
                  </v-card-title>
                  <v-card-text>
                    一、遵守国际摩托车联合会和中汽摩联的规则:在参加所有汽车比赛时，严格遵守国际摩托车联合会与中汽摩汽联巅布的相关章程、运动总则和就赛规则。
                  </v-card-text>
                  <v-card-text>
                    二、尊重并遵守中汽摩联的宗旨和利益∶在参加所有汽车比赛时，不采取任何言论、行为或文字损害或违背中国摩托车运动与中汽摩联和其所属的成员羊位、管浊机构的名脊或宗旨。维护中国学托车运动与巾汽摩联的利益，维护中汽学联管辖范内的摩托车运动的价值。
                  </v-card-text>
                  <v-card-text
                    >三、尊重中巾汽摩以裁决的权威性:在所有摩托车比赛中将遵守中汽摩联做出的判罚和裁决，不采用任何方式损害巾国摩托车运动与中汽摩联的利益。</v-card-text
                  >
                  <v-card-text>
                    四、尊重车手:在比赛中尊重比赛对手，尊重现场观众，尊重所有比赛T.作人员。不采用任何方式，从任何层面，包括身体、专业技能或精社层面,损害所有中汽摩联注册车手的利益。
                  </v-card-text>
                  <v-card-text>
                    五、维护摩托车运动的公平性:在参川所有降托车比赛时，不采川任何方式损害障托车运动的公平性。不做出违反体育说德精神的行为，或试图使川任何违背体育伦理的行为，影响就赛正常结果。在比赛期间，不服川任何违禁药品。
                  </v-card-text>
                  <v-card-text>
                    六、积极配!合中汽摩联相关业务的义务:在参加所有摩托车比赛时，必须积僭配合汽障联组织管理的所有关于摩托车运动训练的调爸和相关活动
                  </v-card-text>
                  <v-card-text>
                    七、本人知晓参与摩托车运动的危险性。在参加所有摩托车比赛时，将依照巾汽摩联规定办理足额的人身意外保险和医疗保险。如果在比赛中哑伤，我承诺接受国际序托车联合会、巾汽廪联和赛事组织方任命的医疗代表所柔取的切医疗救护措施，并承担比赛事故产生的医疗费用。
                  </v-card-text>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red darken-1"
                    :disabled="saveloading"
                    text
                    @click="close"
                  >
                    不同意
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    :loading="saveloading"

                    text
                    @click="GoToPay()"
                  >
                    同意并去支付
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    v-show="hasCreatedOrder"
                    text
                    @click="close"
                  >
                    我已支付
                  </v-btn>
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
                  <v-btn color="red darken-1" text @click="DeleteOrderinfo"
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
          <v-icon
            small
            class="mr-2"
            :disabled="item.order_status !== 'waitPay'"
            v-if="BackuserInfos.role_name !== '管理员'"
            @click="editItem(item)"
          >
            mdi-account-cash-outline
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
  </div>
</template>
      
      <script>
import { getOrderinfo, DeleteOrderinfo, GoToPay } from "@/plugins/http";
import { mapState } from "vuex";
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      isSnackbar: false,
      isSnackbarSuccess: null,
      saveloading: false,
      hasCreatedOrder: false,

      checkSelected: "ALL",

      dialog: false,
      dialogDelete: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "邮箱", value: "user_email" },
        { text: "订单名", value: "order_name" },
        { text: "价格", value: "price" },
        { text: "订单状态", value: "order_status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        user_email: "",
        order_name: "",
        price: "",
        order_status: "",
      },
      defaultItem: {
        id: "",
        user_email: "",
        order_name: "",
        price: "",
        order_status: "",
      },
      reserveDessert: [],
      role_name:'',
    };
  },

  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
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

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const Order = await getOrderinfo();
      if (Order.status === 200) {
        for (let key of Order.data.orderinfos) {
          this.desserts.push(key);
        }
        this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      }
    },
    async DeleteOrderinfo() {
      this.saveloading = true;
      const res = await DeleteOrderinfo({
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

    filterOrder(a) {
      console.log(a.className);
      this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      if (a.className == "ALL") {
        this.reserveDessert = this.desserts.filter((item) => {
          return item;
        });
      } else {
        this.reserveDessert = this.desserts.filter((item) => {
          return item.order_status == a.className;
        });
      }
    },
    async GoToPay() {
      this.saveloading = true;
      const obj = {
        order_id: this.editedItem.id,
        price: this.editedItem.price,
        OrderName: this.editedItem.order_name,
        OrderIntro: this.editedItem.order_intro,
        returnUrl: `http://localhost:8081/#/payment?orderId=${this.editedItem.id}&role_name=${this.role_name}&type=order&orderType=${this.editedItem.type}`,
      };
      window.open(obj.returnUrl)

      // const res = await GoToPay(obj);
      // if (res.data.Operation == "success") {
      //   window.open(res.data.result);
      //   this.hasCreatedOrder = true;
      // } 
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      // window.localStorage.setItem("orderId", this.editedItem.id);
      this.editedItem.type == "车手注册"
        ? this.role_name= "车手"
        : this.role_name="车队"
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.reserveDessert.splice(this.editedIndex, 1);
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
      setTimeout(() => {
        window.location.reload();
      }, 2500);
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