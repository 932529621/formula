<template>
  <div class="securityBox">
    <v-card class="v-cards" elevation="10">
      <div class="card-title">更改密码</div>
      <div class="card-text">
        <span class="alert-title">1.请牢记更改后的密码。 </span>
        <span class="alert-title"
          >2.请勿将密码告诉他人，以免照成损失。</span
        >
        <span class="alert-title"
          >3.最小8个字符、数字、符号长度。</span
        >
      </div>
      <div class="card-form">
        <div class="form-field">
          <v-form ref="cardform1" v-model="valid1" lazy-validation>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="请输入新密码"
              hint="至少8个字符"
              counter
              @click:append="show1 = !show1"
            >
            </v-text-field>
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.PasswordMatch]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="请确认密码"
              hint="至少8个字符"
              :value="confirmPassword"
              v-model="confirmPassword"
              class="input-group--focused"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-form>
        </div>
        <div class="form-btn">
          <v-btn color="#9155fd" style="color: white" @click="valids1()"
            >保存</v-btn
          >
        </div>
      </div>
    </v-card>
    <v-card class="v-cards" elevation="10">
      <div class="card-title">认证</div>
      <v-card-subtitle
        >请输入您的身份信息进行实名认证</v-card-subtitle
      >
      <div class="card-form" v-if="hasVertify == false">
        <div class="form-field">
          <v-form ref="cardform2" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="LicenseName"
              clearable
              :rules="[rules.required]"
              name="input-10-1"
              label="姓名"
              hint="请输入您的姓名"
            >
            </v-text-field>
            <v-text-field
              v-model="LicenseID"
              clearable
              :rules="[rules.required]"
              name="input-10-1"
              label="身份证号码"
              hint="请输入您的身份证号码"
            >
            </v-text-field>
          </v-form>
        </div>
        <div class="form-btn">
          <v-btn color="#9155fd" style="color: white" @click="valids2()"
            >保存</v-btn
          >
          <v-btn color="light-green accent-4" class="ma-2" @click="autoComplete()">生成</v-btn>
        </div>
      </div>
      <div class="card-form" v-if="hasVertify == true">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
          ></v-img>
          <h3 class="text-h5 font-weight-light mb-2">认证成功!</h3>
          <span class="text-caption grey--text">非常感谢您的认证！</span>
        </div>
      </div>
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
import { changeUserpwd, VertifyIDCard } from "@/plugins/http";
import { mapState } from "vuex";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      valid1: true,
      valid2: true,
      hasVertify: false,
      password: "",
      confirmPassword: "",
      LicenseName: "",
      LicenseID: "",
      isloading: false,
      isSnackbar: false,
      isSnackbarSuccess: null,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        PasswordMatch: (v) =>
          v == this.password ||
          `The email and password you entered don't match`,
      },
    };
  },

  methods: {
    autoComplete(){
      this.LicenseName='林伟博'
      this.LicenseID='35042519991206071X'
    },
    async VertifyIDCard() {
      const res = await VertifyIDCard({
        LicenseID: this.LicenseID,
        LicenseName: this.LicenseName,
      });
      console.log(res);
      
      if (res.data.Operation == "success") {
        this.hasVertify = true;
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
      }
    },
    async changeUserpwd() {
      const res = await changeUserpwd({
        confirm: this.confirmPassword,
        password,
      });
      if ((res.data.Operation = "success")) {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          window.location.reload();
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
      }
    },
    valids1() {
      this.$refs.cardform1.validate()
        ? this.changeUserpwd()
        : (this.valid = false);
    },
    valids2() {
      this.$refs.cardform2.validate()
        ? this.VertifyIDCard()
        : (this.valid = false);
    },
  },
  mounted() {
    console.log(this.userInfos.VertifyID);

    this.userInfos.VertifyID 
      ? (this.hasVertify = true)
      : (this.hasVertify = false);
  },
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
    },
    ...mapState("user", ["userInfos"]),
  },
};
</script>

<style lang="scss">
.securityBox {
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  .v-cards {
    display: flex;
    flex-direction: column;
    padding: 20px;
    row-gap: 20px;
    .card-title {
      font-family: Heavy;
      font-size: 1.4rem;
    }
    .card-text {
      padding: 10px;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      font-weight: 500;
      color: #ffb400;
      background-color: rgb(255, 246, 225);
      letter-spacing: 0.15px;
      line-height: 1.75rem;
      overflow-wrap: normal;
      text-transform: none;
      word-break: normal;
      word-wrap: break-word;
    }
    .card-form {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>